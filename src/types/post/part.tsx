export interface MarkdownPart {
  type: 'MARKDOWN';
  body: string;
}

export interface ImageDimensions {
  height: number;
  width: number;
}

export interface ImagePart {
  type: 'IMAGE';
  url: string;
  dimensions: ImageDimensions;
  quality?: number;
}
