import type { FastifyInstance } from "fastify";
import type { ImageService } from "./image-service.js";

export async function registerImageRoutes(
  app: FastifyInstance,
  service: ImageService,
): Promise<void> {
  app.get("/api/images", async () => {
    const image = await service.getLatest();
    return { image };
  });

  app.post("/api/images/generate", async (_request, reply) => {
    const image = await service.generate();
    return reply.code(201).send({ image });
  });

  app.get("/api/images/:imageId/file", async (request, reply) => {
    const { imageId } = request.params as { imageId: string };
    const object = await service.getFile(imageId);
    return reply
      .header("Content-Type", object.mimeType)
      .header("Cache-Control", "private, max-age=3600")
      .send(object.bytes);
  });
}
