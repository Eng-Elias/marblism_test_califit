import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { WorkoutPlan } from './workoutPlan.model'

import { User } from '../../user/domain'

@Injectable()
export class WorkoutPlanDomainFacade {
  constructor(
    @InjectRepository(WorkoutPlan)
    private repository: Repository<WorkoutPlan>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<WorkoutPlan>): Promise<WorkoutPlan> {
    return this.repository.save(values)
  }

  async update(
    item: WorkoutPlan,
    values: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: WorkoutPlan): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<WorkoutPlan> = {},
  ): Promise<WorkoutPlan[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<WorkoutPlan> = {},
  ): Promise<WorkoutPlan> {
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
    queryOptions: RequestHelper.QueryOptions<WorkoutPlan> = {},
  ): Promise<WorkoutPlan[]> {
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
}
