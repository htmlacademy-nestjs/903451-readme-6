import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogPost } from '@project/shared/core';
import { BlogPostService } from './blog-post.service';
import { PostDto } from '../dto/post.dto';

@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post('post')
  async createPost(@Body() dto: PostDto): Promise<BlogPost> {
    const newPost = await this.blogPostService.createPost(dto);

    return newPost.toPOJO();
  }

  @Get('posts')
  async getAllPosts(): Promise<BlogPost[] | null> {
    const posts = await this.blogPostService.getAllPosts();

    return posts?.map((post) => post.toPOJO()) ?? null;
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<BlogPost> {
    const post = await this.blogPostService.getPostById(id);

    return post?.toPOJO();
  }

  @Patch('post/:id')
  async updatePostById(
    @Param('id') id: string,
    @Body() dto: PostDto
  ): Promise<BlogPost | null> {
    const updatedPost = await this.blogPostService.updatePostById(id, dto);

    return updatedPost.toPOJO();
  }
}
