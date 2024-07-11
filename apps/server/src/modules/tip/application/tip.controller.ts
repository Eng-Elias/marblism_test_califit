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
import { Tip, TipDomainFacade } from '@server/modules/tip/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TipApplicationEvent } from './tip.application.event'
import { TipCreateDto, TipUpdateDto } from './tip.dto'

@Controller('/v1/tips')
export class TipController {
  constructor(
    private eventService: EventService,
    private tipDomainFacade: TipDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.tipDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TipCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tipDomainFacade.create(body)

    await this.eventService.emit<TipApplicationEvent.TipCreated.Payload>(
      TipApplicationEvent.TipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tipId')
  async findOne(@Param('tipId') tipId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tipDomainFacade.findOneByIdOrFail(
      tipId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tipId')
  async update(@Param('tipId') tipId: string, @Body() body: TipUpdateDto) {
    const item = await this.tipDomainFacade.findOneByIdOrFail(tipId)

    const itemUpdated = await this.tipDomainFacade.update(
      item,
      body as Partial<Tip>,
    )
    return itemUpdated
  }

  @Delete('/:tipId')
  async delete(@Param('tipId') tipId: string) {
    const item = await this.tipDomainFacade.findOneByIdOrFail(tipId)

    await this.tipDomainFacade.delete(item)

    return item
  }
}
