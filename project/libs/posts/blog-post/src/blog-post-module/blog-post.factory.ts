import { Injectable } from '@nestjs/common';
import { EntityFactory, BlogPost } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  create(entityPlainData: BlogPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }
}
