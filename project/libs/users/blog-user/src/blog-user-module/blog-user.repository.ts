import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  constructor(entityFactory: BlogUserFactory) {
    super(entityFactory);
  }

  public findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return user
      ? Promise.resolve(this.entityFactory.create(user))
      : Promise.resolve(null);
  }

  public async findByPassword(
    password: string
  ): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const users = entities.map((entity) => new BlogUserEntity(entity));

    for (const user of users) {
      const isPassWordMatched = await user.comparePassword(password);

      if (isPassWordMatched) {
        return Promise.resolve(user);
      }
    }

    return Promise.resolve(null);
  }
}
