import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AchievementDomainFacade } from '@server/modules/achievement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AchievementApplicationEvent } from './achievement.application.event'
import { AchievementCreateDto } from './achievement.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AchievementByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private achievementDomainFacade: AchievementDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/achievements')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.achievementDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/achievements')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AchievementCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.achievementDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AchievementApplicationEvent.AchievementCreated.Payload>(
      AchievementApplicationEvent.AchievementCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
