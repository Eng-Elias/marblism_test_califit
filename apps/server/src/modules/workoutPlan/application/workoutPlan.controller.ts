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
  WorkoutPlan,
  WorkoutPlanDomainFacade,
} from '@server/modules/workoutPlan/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { WorkoutPlanApplicationEvent } from './workoutPlan.application.event'
import { WorkoutPlanCreateDto, WorkoutPlanUpdateDto } from './workoutPlan.dto'

@Controller('/v1/workoutPlans')
export class WorkoutPlanController {
  constructor(
    private eventService: EventService,
    private workoutPlanDomainFacade: WorkoutPlanDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.workoutPlanDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: WorkoutPlanCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.workoutPlanDomainFacade.create(body)

    await this.eventService.emit<WorkoutPlanApplicationEvent.WorkoutPlanCreated.Payload>(
      WorkoutPlanApplicationEvent.WorkoutPlanCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:workoutPlanId')
  async findOne(
    @Param('workoutPlanId') workoutPlanId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.workoutPlanDomainFacade.findOneByIdOrFail(
      workoutPlanId,
      queryOptions,
    )

    return item
  }

  @Patch('/:workoutPlanId')
  async update(
    @Param('workoutPlanId') workoutPlanId: string,
    @Body() body: WorkoutPlanUpdateDto,
  ) {
    const item =
      await this.workoutPlanDomainFacade.findOneByIdOrFail(workoutPlanId)

    const itemUpdated = await this.workoutPlanDomainFacade.update(
      item,
      body as Partial<WorkoutPlan>,
    )
    return itemUpdated
  }

  @Delete('/:workoutPlanId')
  async delete(@Param('workoutPlanId') workoutPlanId: string) {
    const item =
      await this.workoutPlanDomainFacade.findOneByIdOrFail(workoutPlanId)

    await this.workoutPlanDomainFacade.delete(item)

    return item
  }
}
