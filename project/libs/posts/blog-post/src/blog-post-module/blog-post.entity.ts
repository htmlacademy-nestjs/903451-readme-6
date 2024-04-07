import {
  Entity,
  BlogPost,
  BlogPostStatus,
  BlogPostType,
  StorableEntity,
} from '@project/shared/core';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
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

  constructor(post: BlogPost) {
    super();

    this.id = post.id;
    this.type = post.type;
    this.status = post.status;
    this.tags = post.tags;
    this.photo = post.photo;
    this.linkUrl = post.linkUrl;
    this.description = post.description;
    this.title = post.title;
    this.videoUrl = post.videoUrl;
    this.announce = post.announce;
    this.text = post.text;
    this.quote = post.quote;
    this.author = post.author;
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      tags: this.tags,
      photo: this.photo,
      linkUrl: this.linkUrl,
      description: this.description,
      title: this.title,
      videoUrl: this.videoUrl,
      announce: this.announce,
      text: this.text,
      quote: this.quote,
      author: this.author,
    };
  }
}
