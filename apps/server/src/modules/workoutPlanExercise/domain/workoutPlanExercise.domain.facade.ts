import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { WorkoutPlanExercise } from './workoutPlanExercise.model'

import { WorkoutPlan } from '../../workoutPlan/domain'

import { Exercise } from '../../exercise/domain'

@Injectable()
export class WorkoutPlanExerciseDomainFacade {
  constructor(
    @InjectRepository(WorkoutPlanExercise)
    private repository: Repository<WorkoutPlanExercise>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    return this.repository.save(values)
  }

  async update(
    item: WorkoutPlanExercise,
    values: Partial<WorkoutPlanExercise>,
  ): Promise<WorkoutPlanExercise> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: WorkoutPlanExercise): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<WorkoutPlanExercise> = {},
  ): Promise<WorkoutPlanExercise[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<WorkoutPlanExercise> = {},
  ): Promise<WorkoutPlanExercise> {
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

  async findManyByWorkoutPlan(
    item: WorkoutPlan,
    queryOptions: RequestHelper.QueryOptions<WorkoutPlanExercise> = {},
  ): Promise<WorkoutPlanExercise[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('workoutPlan')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        workoutPlanId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByExercise(
    item: Exercise,
    queryOptions: RequestHelper.QueryOptions<WorkoutPlanExercise> = {},
  ): Promise<WorkoutPlanExercise[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('exercise')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        exerciseId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
