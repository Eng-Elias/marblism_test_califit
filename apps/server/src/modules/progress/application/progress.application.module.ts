import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProgressDomainModule } from '../domain'
import { ProgressController } from './progress.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ProgressByUserController } from './progressByUser.controller'

import { ExerciseDomainModule } from '../../../modules/exercise/domain'

import { ProgressByExerciseController } from './progressByExercise.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ProgressDomainModule,

    UserDomainModule,

    ExerciseDomainModule,
  ],
  controllers: [
    ProgressController,

    ProgressByUserController,

    ProgressByExerciseController,
  ],
  providers: [],
})
export class ProgressApplicationModule {}
