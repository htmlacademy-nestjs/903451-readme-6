import { Module } from '@nestjs/common';
import { BlogUserFactory, BlogUserRepository } from '@project/blog-user';

@Module({
  providers: [BlogUserFactory, BlogUserRepository],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
