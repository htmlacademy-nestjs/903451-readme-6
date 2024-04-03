import { Entity, StorableEntity, EntityFactory } from '@project/shared/core';

import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>
> implements Repository<T>
{
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  public async findById(id: T['id']): Promise<T | null> {
    const foundEntity = this.entities.get(id);
    if (!foundEntity) {
      return null;
    }

    return this.entityFactory.create(foundEntity);
  }

  public async save(entity: T): Promise<void> {
    this.entities.set(entity.id, entity.toPOJO());
  }

  public async update(entity: T): Promise<void> {
    if (!this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    this.entities.set(entity.id, entity.toPOJO());
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (!this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }
}
