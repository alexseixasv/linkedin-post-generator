import type postgres from "postgres";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const migrationsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "migrations");

export async function migrate(sql: postgres.Sql): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const files = [
    "0001_profile.sql",
    "0002_persona.sql",
    "0003_research.sql",
    "0004_opportunities.sql",
    "0005_posts.sql",
    "0006_images.sql",
  ];

  for (const file of files) {
    const applied = await sql<{ id: string }[]>`
      SELECT id FROM schema_migrations WHERE id = ${file}
    `;
    if (applied.length > 0) {
      continue;
    }

    const contents = await readFile(path.join(migrationsDir, file), "utf8");
    const statements = contents
      .split(";")
      .map((statement) =>
        statement
          .split("\n")
          .filter((line) => !line.trim().startsWith("--"))
          .join("\n")
          .trim(),
      )
      .filter(Boolean);

    for (const statement of statements) {
      await sql.unsafe(statement);
    }
    await sql`INSERT INTO schema_migrations (id) VALUES (${file})`;
  }
}
