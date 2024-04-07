import { DiscriminatedUnion } from '@project/shared/helpers';
import { BlogPostStatus, BlogPostType } from '@project/shared/core';

export type Posts = DiscriminatedUnion<
  'type',
  | {
      type: BlogPostType.Video;
      status: BlogPostStatus;
      tags: string[];
      title: string;
      videoUrl: string;
    }
  | {
      type: BlogPostType.Photo;
      status: BlogPostStatus;
      tags: string[];
      photo: File;
    }
  | {
      type: BlogPostType.Text;
      status: BlogPostStatus;
      tags: string[];
      title: string;
      announce: string;
      text: string;
    }
  | {
      type: BlogPostType.Link;
      status: BlogPostStatus;
      tags: string[];
      linkUrl: string;
      description: string;
    }
  | {
      type: BlogPostType.Quote;
      status: BlogPostStatus;
      tags: string[];
      quote: string;
      author: string;
    }
>;
