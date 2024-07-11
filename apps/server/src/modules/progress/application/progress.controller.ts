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
import { Progress, ProgressDomainFacade } from '@server/modules/progress/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ProgressApplicationEvent } from './progress.application.event'
import { ProgressCreateDto, ProgressUpdateDto } from './progress.dto'

@Controller('/v1/progresss')
export class ProgressController {
  constructor(
    private eventService: EventService,
    private progressDomainFacade: ProgressDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.progressDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ProgressCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.progressDomainFacade.create(body)

    await this.eventService.emit<ProgressApplicationEvent.ProgressCreated.Payload>(
      ProgressApplicationEvent.ProgressCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:progressId')
  async findOne(
    @Param('progressId') progressId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.progressDomainFacade.findOneByIdOrFail(
      progressId,
      queryOptions,
    )

    return item
  }

  @Patch('/:progressId')
  async update(
    @Param('progressId') progressId: string,
    @Body() body: ProgressUpdateDto,
  ) {
    const item = await this.progressDomainFacade.findOneByIdOrFail(progressId)

    const itemUpdated = await this.progressDomainFacade.update(
      item,
      body as Partial<Progress>,
    )
    return itemUpdated
  }

  @Delete('/:progressId')
  async delete(@Param('progressId') progressId: string) {
    const item = await this.progressDomainFacade.findOneByIdOrFail(progressId)

    await this.progressDomainFacade.delete(item)

    return item
  }
}
