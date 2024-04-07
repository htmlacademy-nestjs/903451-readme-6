import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from '@project/shared/core';
import { BlogPostType } from '@project/shared/core';
import { BlogPostRepository } from './blog-post.repository';
import { PostDto } from '../dto/post.dto';
import { BlogPostEntity } from './blog-post.entity';

const POST_NOT_FOUND_EXEPTION = 'Requested post is not found';

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async getAllPosts(): Promise<BlogPostEntity[] | null> {
    return this.blogPostRepository.getAllValues();
  }

  public async createPost(dto: PostDto): Promise<BlogPostEntity> {
    const post: BlogPost = {
      id: randomUUID(),
      type: dto.type,
      tags: dto?.tags,
      title: dto?.title,
      videoUrl: dto?.videoUrl,
      linkUrl: dto?.linkUrl,
      quote: dto?.quote,
      description: dto?.description,
      announce: dto?.announce,
      author: dto?.author,
      text: dto?.text,
      photo: dto?.photo,
      status: dto?.status,
    };

    const newPost = new BlogPostEntity(post);

    this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async getPostById(id: string): Promise<BlogPostEntity> {
    const existPost = this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND_EXEPTION);
    }

    return existPost;
  }

  public async updatePostById(
    id: string,
    dto: PostDto
  ): Promise<BlogPostEntity> {
    const existPost = this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND_EXEPTION);
    }

    const { type } = dto;

    // TODO:#posts: finish with updating
    const postUpdates: BlogPost = (() => {
      switch (type) {
        case BlogPostType.Text:
          return {};
        case BlogPostType.Video:
          return {};
        case BlogPostType.Link:
          return {};
        case BlogPostType.Photo:
          return {};
        case BlogPostType.Quote:
          return {};
      }
    })();

    const updatedPost = new BlogPostEntity({ ...existPost, ...postUpdates });

    this.blogPostRepository.save(updatedPost);

    return updatedPost;
  }
}
