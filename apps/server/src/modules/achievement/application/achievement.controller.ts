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
  Achievement,
  AchievementDomainFacade,
} from '@server/modules/achievement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AchievementApplicationEvent } from './achievement.application.event'
import { AchievementCreateDto, AchievementUpdateDto } from './achievement.dto'

@Controller('/v1/achievements')
export class AchievementController {
  constructor(
    private eventService: EventService,
    private achievementDomainFacade: AchievementDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.achievementDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AchievementCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.achievementDomainFacade.create(body)

    await this.eventService.emit<AchievementApplicationEvent.AchievementCreated.Payload>(
      AchievementApplicationEvent.AchievementCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:achievementId')
  async findOne(
    @Param('achievementId') achievementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.achievementDomainFacade.findOneByIdOrFail(
      achievementId,
      queryOptions,
    )

    return item
  }

  @Patch('/:achievementId')
  async update(
    @Param('achievementId') achievementId: string,
    @Body() body: AchievementUpdateDto,
  ) {
    const item =
      await this.achievementDomainFacade.findOneByIdOrFail(achievementId)

    const itemUpdated = await this.achievementDomainFacade.update(
      item,
      body as Partial<Achievement>,
    )
    return itemUpdated
  }

  @Delete('/:achievementId')
  async delete(@Param('achievementId') achievementId: string) {
    const item =
      await this.achievementDomainFacade.findOneByIdOrFail(achievementId)

    await this.achievementDomainFacade.delete(item)

    return item
  }
}
