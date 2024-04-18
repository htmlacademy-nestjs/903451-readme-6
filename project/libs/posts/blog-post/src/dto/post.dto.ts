import { BlogPostStatus, BlogPostType } from '@project/shared/core';

export class PostDto {
  public type: BlogPostType;
  public status: BlogPostStatus;
  public tags?: string[];
  public photo?: File;
  public linkUrl?: string;
  public description?: string;
  public title?: string;
  public videoUrl?: string;
  public announce?: string;
  public text?: string;
  public quote?: string;
  public author?: string;
}
