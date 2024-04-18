import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from '@project/shared/core';
import { BlogPostType } from '@project/shared/core';
import { BlogPostRepository } from './blog-post.repository';
import { PostDto } from '../dto/post.dto';
import { BlogPostEntity } from './blog-post.entity';

const POST_NOT_FOUND_EXEPTION = 'Requested post is not found';
const NO_POSTS_EXCEPTION = 'No posts found';

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async getAllPosts(): Promise<BlogPost[]> {
    const blogPosts = await this.blogPostRepository.getAllValues();
    if (!blogPosts) {
      throw new NotFoundException(NO_POSTS_EXCEPTION);
    }

    return blogPosts.map((blogPost) => blogPost.toPOJO());
  }

  public async createPost(dto: PostDto): Promise<BlogPost> {
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

    return newPost.toPOJO();
  }

  public async getPostById(id: string): Promise<BlogPost> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND_EXEPTION);
    }

    return existPost.toPOJO();
  }

  public async updatePostById(
    id: string,
    dto: PostDto
  ): Promise<BlogPostEntity> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND_EXEPTION);
    }

    const {
      type,
      announce,
      text,
      photo,
      status,
      description,
      linkUrl,
      videoUrl,
      author,
      tags,
      title,
      quote,
    } = dto;

    const particularPostUpdates: Partial<BlogPost> = (() => {
      switch (type) {
        case BlogPostType.Text:
          return { title, announce, text };
        case BlogPostType.Video:
          return { title, videoUrl };
        case BlogPostType.Link:
          return { linkUrl, description };
        case BlogPostType.Photo:
          return { photo };
        case BlogPostType.Quote:
          return { quote, author };
      }
    })();

    const updatedPost: BlogPost = {
      ...existPost.toPOJO(),
      type,
      status,
      tags,
      ...particularPostUpdates,
    };

    const updatedBlogPost = new BlogPostEntity(updatedPost);

    this.blogPostRepository.save(updatedBlogPost);

    return updatedBlogPost;
  }

  public async deletePostById(id: string): Promise<void> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND_EXEPTION);
    }

    this.blogPostRepository.deleteById(id);
  }

  public async searchPostsByQuery(query: string): Promise<BlogPost[]> {
    const posts = await this.blogPostRepository.getAllValues();
    const filteredPosts = posts.filter(
      (post) => !!post.title && post.title.includes(query)
    );

    return filteredPosts.map((post) => post.toPOJO());
  }
}
