import { ImagePart, MarkdownPart } from "./part";

type Note = string;

export interface PostMetadata {
  hideFromFrontPage?: boolean;
  tags?: string[];
  title?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  slug?: string;
  readTime?: string;
  mainImg?: string;
  notes?: Note[];
}

export interface Post {
  metadata: PostMetadata;
  parts: (MarkdownPart|ImagePart)[];
}
