import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ExerciseDomainModule } from '../domain'
import { ExerciseController } from './exercise.controller'

@Module({
  imports: [AuthenticationDomainModule, ExerciseDomainModule],
  controllers: [ExerciseController],
  providers: [],
})
export class ExerciseApplicationModule {}
