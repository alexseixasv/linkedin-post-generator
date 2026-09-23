import { ERROR_CODES } from "@studio/shared";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import Fastify from "fastify";
import type { Env } from "./env.js";
import { AppError } from "./app-error.js";
import type { Database } from "./db/client.js";
import { OpenAIImageGenerationProvider } from "./modules/ai/openai-image-generation-provider.js";
import { OpenAITextGenerationProvider } from "./modules/ai/openai-text-generation-provider.js";
import { registerImageRoutes } from "./modules/images/image-routes.js";
import { ImageRepository } from "./modules/images/image-repository.js";
import { ImageService } from "./modules/images/image-service.js";
import { NewsApiNewsProvider } from "./modules/news/newsapi-adapter.js";
import { registerOpportunityRoutes } from "./modules/opportunities/opportunity-routes.js";
import { OpportunityRepository } from "./modules/opportunities/opportunity-repository.js";
import { OpportunityService } from "./modules/opportunities/opportunity-service.js";
import { registerPostRoutes } from "./modules/posts/post-routes.js";
import { PostRepository } from "./modules/posts/post-repository.js";
import { PostService } from "./modules/posts/post-service.js";
import { registerResearchRoutes } from "./modules/news/research-routes.js";
import { ResearchRepository } from "./modules/news/research-repository.js";
import { ResearchService } from "./modules/news/research-service.js";
import { registerPersonaRoutes } from "./modules/persona/persona-routes.js";
import { PersonaRepository } from "./modules/persona/persona-repository.js";
import { PersonaService } from "./modules/persona/persona-service.js";
import { LocalStorageProvider } from "./modules/uploads/local-storage.js";
import { ProfileRepository } from "./modules/profile/profile-repository.js";
import { registerProfileRoutes } from "./modules/profile/profile-routes.js";
import { ProfileService } from "./modules/profile/profile-service.js";

export async function buildApp(env: Env, db: Database) {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });
  await app.register(multipart, {
    limits: {
      fileSize: env.MAX_PHOTO_BYTES,
      files: 1,
    },
  });

  const storage = new LocalStorageProvider(env.STORAGE_DIR);
  const profiles = new ProfileService(
    new ProfileRepository(db),
    storage,
    env.MAX_PHOTO_BYTES,
  );
  const text = new OpenAITextGenerationProvider(env.OPENAI_API_KEY, env.OPENAI_TEXT_MODEL);
  const personas = new PersonaService(
    profiles,
    new PersonaRepository(db),
    text,
  );
  const research = new ResearchService(
    profiles,
    personas,
    new ResearchRepository(db),
    new NewsApiNewsProvider(env.NEWS_API_KEY),
    env.NEWS_LOOKBACK_DAYS,
  );
  const opportunities = new OpportunityService(
    profiles,
    personas,
    new ResearchRepository(db),
    new OpportunityRepository(db),
    text,
  );
  const posts = new PostService(
    profiles,
    personas,
    opportunities,
    new PostRepository(db),
    text,
  );
  const images = new ImageService(
    profiles,
    posts,
    new ImageRepository(db),
    storage,
    text,
    new OpenAIImageGenerationProvider(env.OPENAI_API_KEY, env.OPENAI_IMAGE_MODEL),
  );

  app.get("/health", async () => ({ ok: true }));

  await registerProfileRoutes(app, profiles);
  await registerPersonaRoutes(app, personas);
  await registerResearchRoutes(app, research);
  await registerOpportunityRoutes(app, opportunities);
  await registerPostRoutes(app, posts);
  await registerImageRoutes(app, images);

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.code(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    const code = (error as { code?: string }).code;
    if (code === "FST_REQ_FILE_TOO_LARGE") {
      return reply.code(413).send({
        error: {
          code: ERROR_CODES.PAYLOAD_TOO_LARGE,
          message: "Each photo must be 8 MB or smaller.",
        },
      });
    }

    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode && statusCode >= 400 && statusCode < 500) {
      return reply.code(statusCode).send({
        error: {
          code: ERROR_CODES.VALIDATION,
          message: "The request is invalid.",
        },
      });
    }

    app.log.error(error);
    return reply.code(500).send({
      error: {
        code: "INTERNAL",
        message: "Something went wrong.",
      },
    });
  });

  return app;
}
