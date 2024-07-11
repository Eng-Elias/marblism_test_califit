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
import { Goal, GoalDomainFacade } from '@server/modules/goal/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GoalApplicationEvent } from './goal.application.event'
import { GoalCreateDto, GoalUpdateDto } from './goal.dto'

@Controller('/v1/goals')
export class GoalController {
  constructor(
    private eventService: EventService,
    private goalDomainFacade: GoalDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.goalDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GoalCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.goalDomainFacade.create(body)

    await this.eventService.emit<GoalApplicationEvent.GoalCreated.Payload>(
      GoalApplicationEvent.GoalCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:goalId')
  async findOne(@Param('goalId') goalId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.goalDomainFacade.findOneByIdOrFail(
      goalId,
      queryOptions,
    )

    return item
  }

  @Patch('/:goalId')
  async update(@Param('goalId') goalId: string, @Body() body: GoalUpdateDto) {
    const item = await this.goalDomainFacade.findOneByIdOrFail(goalId)

    const itemUpdated = await this.goalDomainFacade.update(
      item,
      body as Partial<Goal>,
    )
    return itemUpdated
  }

  @Delete('/:goalId')
  async delete(@Param('goalId') goalId: string) {
    const item = await this.goalDomainFacade.findOneByIdOrFail(goalId)

    await this.goalDomainFacade.delete(item)

    return item
  }
}
