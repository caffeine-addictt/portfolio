CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY,

  title TEXT NOT NULL,
  sub_title TEXT NOT NULL,
  body TEXT NOT NULL,
  lcp_img_url TEXT,

  tags TEXT NOT NULL DEFAULT '[]',

  published_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'hidden')),

  view_count INTEGER NOT NULL DEFAULT 0
);
