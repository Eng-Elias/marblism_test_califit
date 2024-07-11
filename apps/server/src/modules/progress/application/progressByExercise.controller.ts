import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProgressDomainFacade } from '@server/modules/progress/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProgressApplicationEvent } from './progress.application.event'
import { ProgressCreateDto } from './progress.dto'

import { ExerciseDomainFacade } from '../../exercise/domain'

@Controller('/v1/exercises')
export class ProgressByExerciseController {
  constructor(
    private exerciseDomainFacade: ExerciseDomainFacade,

    private progressDomainFacade: ProgressDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/exercise/:exerciseId/progresss')
  async findManyExerciseId(
    @Param('exerciseId') exerciseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.exerciseDomainFacade.findOneByIdOrFail(exerciseId)

    const items = await this.progressDomainFacade.findManyByExercise(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/exercise/:exerciseId/progresss')
  async createByExerciseId(
    @Param('exerciseId') exerciseId: string,
    @Body() body: ProgressCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, exerciseId }

    const item = await this.progressDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProgressApplicationEvent.ProgressCreated.Payload>(
      ProgressApplicationEvent.ProgressCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
