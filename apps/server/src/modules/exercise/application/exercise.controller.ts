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
import { Exercise, ExerciseDomainFacade } from '@server/modules/exercise/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ExerciseApplicationEvent } from './exercise.application.event'
import { ExerciseCreateDto, ExerciseUpdateDto } from './exercise.dto'

@Controller('/v1/exercises')
export class ExerciseController {
  constructor(
    private eventService: EventService,
    private exerciseDomainFacade: ExerciseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.exerciseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ExerciseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.exerciseDomainFacade.create(body)

    await this.eventService.emit<ExerciseApplicationEvent.ExerciseCreated.Payload>(
      ExerciseApplicationEvent.ExerciseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:exerciseId')
  async findOne(
    @Param('exerciseId') exerciseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.exerciseDomainFacade.findOneByIdOrFail(
      exerciseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:exerciseId')
  async update(
    @Param('exerciseId') exerciseId: string,
    @Body() body: ExerciseUpdateDto,
  ) {
    const item = await this.exerciseDomainFacade.findOneByIdOrFail(exerciseId)

    const itemUpdated = await this.exerciseDomainFacade.update(
      item,
      body as Partial<Exercise>,
    )
    return itemUpdated
  }

  @Delete('/:exerciseId')
  async delete(@Param('exerciseId') exerciseId: string) {
    const item = await this.exerciseDomainFacade.findOneByIdOrFail(exerciseId)

    await this.exerciseDomainFacade.delete(item)

    return item
  }
}
