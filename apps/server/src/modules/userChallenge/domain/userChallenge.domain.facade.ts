import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { UserChallenge } from './userChallenge.model'

import { User } from '../../user/domain'

import { CommunityChallenge } from '../../communityChallenge/domain'

@Injectable()
export class UserChallengeDomainFacade {
  constructor(
    @InjectRepository(UserChallenge)
    private repository: Repository<UserChallenge>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<UserChallenge>): Promise<UserChallenge> {
    return this.repository.save(values)
  }

  async update(
    item: UserChallenge,
    values: Partial<UserChallenge>,
  ): Promise<UserChallenge> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: UserChallenge): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<UserChallenge> = {},
  ): Promise<UserChallenge[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<UserChallenge> = {},
  ): Promise<UserChallenge> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<UserChallenge> = {},
  ): Promise<UserChallenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByCommunityChallenge(
    item: CommunityChallenge,
    queryOptions: RequestHelper.QueryOptions<UserChallenge> = {},
  ): Promise<UserChallenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('communityChallenge')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        communityChallengeId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
