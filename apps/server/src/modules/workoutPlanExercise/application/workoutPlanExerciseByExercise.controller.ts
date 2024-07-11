import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { WorkoutPlanExerciseDomainFacade } from '@server/modules/workoutPlanExercise/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { WorkoutPlanExerciseApplicationEvent } from './workoutPlanExercise.application.event'
import { WorkoutPlanExerciseCreateDto } from './workoutPlanExercise.dto'

import { ExerciseDomainFacade } from '../../exercise/domain'

@Controller('/v1/exercises')
export class WorkoutPlanExerciseByExerciseController {
  constructor(
    private exerciseDomainFacade: ExerciseDomainFacade,

    private workoutPlanExerciseDomainFacade: WorkoutPlanExerciseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/exercise/:exerciseId/workoutPlanExercises')
  async findManyExerciseId(
    @Param('exerciseId') exerciseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.exerciseDomainFacade.findOneByIdOrFail(exerciseId)

    const items = await this.workoutPlanExerciseDomainFacade.findManyByExercise(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/exercise/:exerciseId/workoutPlanExercises')
  async createByExerciseId(
    @Param('exerciseId') exerciseId: string,
    @Body() body: WorkoutPlanExerciseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, exerciseId }

    const item =
      await this.workoutPlanExerciseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<WorkoutPlanExerciseApplicationEvent.WorkoutPlanExerciseCreated.Payload>(
      WorkoutPlanExerciseApplicationEvent.WorkoutPlanExerciseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
