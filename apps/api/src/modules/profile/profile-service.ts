import {
  ALLOWED_PHOTO_MIME_TYPES,
  MAX_PROFILE_PHOTOS,
  assessProfileEvidence,
  profileInputSchema,
  type ProfileInput,
  type ProfilePublic,
} from "@studio/shared";
import { ERROR_CODES } from "@studio/shared";
import { AppError, notFound, validationError } from "../../app-error.js";
import type { StorageProvider } from "../uploads/storage-provider.js";
import type { ProfileRepository } from "./profile-repository.js";

const MAGIC = {
  png: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
  jpeg: Buffer.from([0xff, 0xd8, 0xff]),
  riff: Buffer.from("RIFF"),
  webp: Buffer.from("WEBP"),
};

export class ProfileService {
  constructor(
    private readonly repo: ProfileRepository,
    private readonly storage: StorageProvider,
    private readonly maxPhotoBytes: number,
  ) {}

  async getProfile(): Promise<ProfilePublic | null> {
    const record = await this.repo.getWorkspaceProfile();
    if (!record) {
      return null;
    }
    return this.toPublic(record);
  }

  async saveProfile(payload: unknown): Promise<ProfilePublic> {
    const parsed = profileInputSchema.safeParse(payload);
    if (!parsed.success) {
      throw validationError("The profile payload is invalid.");
    }

    const record = await this.repo.upsertProfile(parsed.data);
    if (!record) {
      throw new AppError(ERROR_CODES.STORAGE_FAILURE, "The profile could not be saved.", 500);
    }
    return this.toPublic(record);
  }

  async uploadPhoto(input: { bytes: Buffer; filename: string; claimedType: string }) {
    if (input.bytes.byteLength === 0) {
      throw validationError("The photo is empty.");
    }
    if (input.bytes.byteLength > this.maxPhotoBytes) {
      throw new AppError(
        ERROR_CODES.PAYLOAD_TOO_LARGE,
        "Each photo must be 8 MB or smaller.",
        413,
      );
    }

    const mimeType = detectImageMime(input.bytes);
    if (!mimeType || !ALLOWED_PHOTO_MIME_TYPES.includes(mimeType)) {
      throw new AppError(
        ERROR_CODES.UNSUPPORTED_MEDIA,
        "Photos must be PNG, JPEG, or WEBP.",
        415,
      );
    }

    const count = await this.repo.photoCount();
    if (count >= MAX_PROFILE_PHOTOS) {
      throw new AppError(
        ERROR_CODES.PHOTO_LIMIT,
        "You can upload up to three reference photos.",
        400,
      );
    }

    const stored = await this.storage.put({
      bytes: input.bytes,
      mimeType,
      extension: extensionFromName(input.filename),
    });

    await this.repo.addPhoto({
      storageKey: stored.key,
      mimeType,
      sizeBytes: input.bytes.byteLength,
    });

    const profile = await this.getProfile();
    if (!profile) {
      throw new AppError(ERROR_CODES.STORAGE_FAILURE, "The photo metadata could not be saved.", 500);
    }
    return profile;
  }

  async listReferenceImages(): Promise<Array<{ bytes: Buffer; mimeType: string }>> {
    const profile = await this.getProfile();
    if (!profile) {
      return [];
    }
    const files: Array<{ bytes: Buffer; mimeType: string }> = [];
    for (const photo of profile.photos) {
      try {
        const object = await this.getPhotoFile(photo.id);
        files.push({ bytes: object.bytes, mimeType: object.mimeType });
      } catch {
        // A missing file should not block image generation from the remaining references.
      }
    }
    return files;
  }

  async getPhotoFile(photoId: string) {
    const photo = await this.repo.getPhoto(photoId);
    if (!photo) {
      throw notFound("Photo not found.");
    }
    const object = await this.storage.get(photo.storageKey);
    if (!object) {
      throw notFound("Photo file not found.");
    }
    return object;
  }

  async removePhoto(photoId: string): Promise<ProfilePublic> {
    const photo = await this.repo.deletePhoto(photoId);
    if (!photo) {
      throw notFound("Photo not found.");
    }
    await this.storage.delete(photo.storageKey);
    const profile = await this.getProfile();
    if (!profile) {
      throw notFound("Profile not found.");
    }
    return profile;
  }

  private toPublic(
    record: NonNullable<Awaited<ReturnType<ProfileRepository["getWorkspaceProfile"]>>>,
  ): ProfilePublic {
    const input: ProfileInput = {
      fullName: record.profile.fullName,
      headline: record.profile.headline,
      currentJobTitle: record.profile.currentJobTitle,
      currentCompany: record.profile.currentCompany,
      about: record.profile.about,
      topSkills: record.profile.topSkills,
      technologies: record.profile.technologies,
      industries: record.profile.industries,
      yearsOfExperience: record.profile.yearsOfExperience,
      architectureExperience: record.profile.architectureExperience,
      leadershipExperience: record.profile.leadershipExperience,
      businessImpact: record.profile.businessImpact,
      subjectsOfInterest: record.profile.subjectsOfInterest,
      subjectsToAvoid: record.profile.subjectsToAvoid,
      targetAudience: record.profile.targetAudience,
      preferredLanguage: record.profile.preferredLanguage,
      positioning: record.profile.positioning as ProfileInput["positioning"],
      desiredPerception: record.profile.desiredPerception,
      writingTones: record.profile.writingTones as ProfileInput["writingTones"],
      postLength: record.profile.postLength as ProfileInput["postLength"],
      experiences: record.experiences
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((experience) => ({
          id: experience.id,
          role: experience.role,
          company: experience.company,
          startPeriod: experience.startPeriod,
          endPeriod: experience.endPeriod,
          description: experience.description,
          responsibilities: experience.responsibilities,
          achievements: experience.achievements,
          technologies: experience.technologies,
          measurableOutcomes: experience.measurableOutcomes,
        })),
      writingSamples: record.samples
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((sample) => ({
          id: sample.id,
          body: sample.body,
        })),
    };

    return {
      ...input,
      id: record.profile.id,
      createdAt: record.profile.createdAt.toISOString(),
      updatedAt: record.profile.updatedAt.toISOString(),
      evidenceWarning: assessProfileEvidence(input),
      experiences: record.experiences
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((experience) => ({
          id: experience.id,
          role: experience.role,
          company: experience.company,
          startPeriod: experience.startPeriod,
          endPeriod: experience.endPeriod,
          description: experience.description,
          responsibilities: experience.responsibilities,
          achievements: experience.achievements,
          technologies: experience.technologies,
          measurableOutcomes: experience.measurableOutcomes,
        })),
      writingSamples: record.samples
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((sample) => ({
          id: sample.id,
          body: sample.body,
        })),
      photos: record.photos.map((photo) => ({
        id: photo.id,
        mimeType: photo.mimeType,
        sizeBytes: photo.sizeBytes,
        url: `/api/profile/photos/${photo.id}`,
        createdAt: photo.createdAt.toISOString(),
      })),
    };
  }
}

export function detectImageMime(
  bytes: Buffer,
): (typeof ALLOWED_PHOTO_MIME_TYPES)[number] | null {
  if (bytes.length >= 4 && bytes.subarray(0, 4).equals(MAGIC.png)) {
    return "image/png";
  }
  if (bytes.length >= 3 && bytes.subarray(0, 3).equals(MAGIC.jpeg)) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).equals(MAGIC.riff) &&
    bytes.subarray(8, 12).equals(MAGIC.webp)
  ) {
    return "image/webp";
  }
  return null;
}

function extensionFromName(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? String(parts.at(-1)) : "";
}
