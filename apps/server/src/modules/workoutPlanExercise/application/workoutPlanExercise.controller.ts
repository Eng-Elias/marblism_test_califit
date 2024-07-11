import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  WorkoutPlanExercise,
  WorkoutPlanExerciseDomainFacade,
} from '@server/modules/workoutPlanExercise/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { WorkoutPlanExerciseApplicationEvent } from './workoutPlanExercise.application.event'
import {
  WorkoutPlanExerciseCreateDto,
  WorkoutPlanExerciseUpdateDto,
} from './workoutPlanExercise.dto'

@Controller('/v1/workoutPlanExercises')
export class WorkoutPlanExerciseController {
  constructor(
    private eventService: EventService,
    private workoutPlanExerciseDomainFacade: WorkoutPlanExerciseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.workoutPlanExerciseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: WorkoutPlanExerciseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.workoutPlanExerciseDomainFacade.create(body)

    await this.eventService.emit<WorkoutPlanExerciseApplicationEvent.WorkoutPlanExerciseCreated.Payload>(
      WorkoutPlanExerciseApplicationEvent.WorkoutPlanExerciseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:workoutPlanExerciseId')
  async findOne(
    @Param('workoutPlanExerciseId') workoutPlanExerciseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.workoutPlanExerciseDomainFacade.findOneByIdOrFail(
      workoutPlanExerciseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:workoutPlanExerciseId')
  async update(
    @Param('workoutPlanExerciseId') workoutPlanExerciseId: string,
    @Body() body: WorkoutPlanExerciseUpdateDto,
  ) {
    const item = await this.workoutPlanExerciseDomainFacade.findOneByIdOrFail(
      workoutPlanExerciseId,
    )

    const itemUpdated = await this.workoutPlanExerciseDomainFacade.update(
      item,
      body as Partial<WorkoutPlanExercise>,
    )
    return itemUpdated
  }

  @Delete('/:workoutPlanExerciseId')
  async delete(@Param('workoutPlanExerciseId') workoutPlanExerciseId: string) {
    const item = await this.workoutPlanExerciseDomainFacade.findOneByIdOrFail(
      workoutPlanExerciseId,
    )

    await this.workoutPlanExerciseDomainFacade.delete(item)

    return item
  }
}
