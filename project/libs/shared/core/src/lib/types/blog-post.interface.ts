import { BlogPostType } from './blog-post-type.enum';
import { BlogPostStatus } from './blog-post-status.enum';

export interface BlogPost {
  id: string;
  type: BlogPostType;
  status: BlogPostStatus;
  tags?: string[];

  // PostType = photo
  photo?: File;

  // PostType = link
  linkUrl?: string;
  description?: string;

  // PostType = video || PostType = text
  title?: string;

  // PostType = video
  videoUrl?: string;

  // PostType = text
  announce?: string;
  text?: string;

  // PostType = quote
  quote?: string;
  author?: string;
}
