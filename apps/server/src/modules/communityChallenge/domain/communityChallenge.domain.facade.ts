import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CommunityChallenge } from './communityChallenge.model'

@Injectable()
export class CommunityChallengeDomainFacade {
  constructor(
    @InjectRepository(CommunityChallenge)
    private repository: Repository<CommunityChallenge>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<CommunityChallenge>,
  ): Promise<CommunityChallenge> {
    return this.repository.save(values)
  }

  async update(
    item: CommunityChallenge,
    values: Partial<CommunityChallenge>,
  ): Promise<CommunityChallenge> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CommunityChallenge): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CommunityChallenge> = {},
  ): Promise<CommunityChallenge[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CommunityChallenge> = {},
  ): Promise<CommunityChallenge> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }
}
