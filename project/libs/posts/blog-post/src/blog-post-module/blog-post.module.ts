import { Module } from '@nestjs/common';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';

@Module({
  providers: [BlogPostFactory, BlogPostRepository],
  exports: [BlogPostRepository],
})
export class BlogPostModule {}
