import { ImagePart, MarkdownPart } from "./part";

export interface PostMetadata {
  hideFromFrontPage?: boolean;
  tags?: string[];
  title?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  slug?: string;
  readTime?: string;
}

export interface Post {
  metadata: PostMetadata;
  parts: (MarkdownPart|ImagePart)[];
}
