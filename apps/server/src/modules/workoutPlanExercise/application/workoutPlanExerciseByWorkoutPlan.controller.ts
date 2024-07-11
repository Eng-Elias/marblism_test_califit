import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { WorkoutPlanExerciseDomainFacade } from '@server/modules/workoutPlanExercise/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { WorkoutPlanExerciseApplicationEvent } from './workoutPlanExercise.application.event'
import { WorkoutPlanExerciseCreateDto } from './workoutPlanExercise.dto'

import { WorkoutPlanDomainFacade } from '../../workoutPlan/domain'

@Controller('/v1/workoutPlans')
export class WorkoutPlanExerciseByWorkoutPlanController {
  constructor(
    private workoutPlanDomainFacade: WorkoutPlanDomainFacade,

    private workoutPlanExerciseDomainFacade: WorkoutPlanExerciseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/workoutPlan/:workoutPlanId/workoutPlanExercises')
  async findManyWorkoutPlanId(
    @Param('workoutPlanId') workoutPlanId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.workoutPlanDomainFacade.findOneByIdOrFail(workoutPlanId)

    const items =
      await this.workoutPlanExerciseDomainFacade.findManyByWorkoutPlan(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/workoutPlan/:workoutPlanId/workoutPlanExercises')
  async createByWorkoutPlanId(
    @Param('workoutPlanId') workoutPlanId: string,
    @Body() body: WorkoutPlanExerciseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, workoutPlanId }

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
