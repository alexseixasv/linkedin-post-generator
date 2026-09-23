CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES generated_posts(id) ON DELETE CASCADE,
  prompt_version text NOT NULL,
  model text NOT NULL,
  brief jsonb NOT NULL,
  generation_prompt text NOT NULL,
  used_references boolean NOT NULL DEFAULT false,
  storage_key text NOT NULL,
  mime_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS generated_images_post_created_idx
  ON generated_images (post_id, created_at DESC);

CREATE INDEX IF NOT EXISTS generated_images_profile_created_idx
  ON generated_images (profile_id, created_at DESC);
