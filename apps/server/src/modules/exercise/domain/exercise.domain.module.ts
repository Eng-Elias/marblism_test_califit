import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ExerciseDomainFacade } from './exercise.domain.facade'
import { Exercise } from './exercise.model'

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), DatabaseHelperModule],
  providers: [ExerciseDomainFacade, ExerciseDomainFacade],
  exports: [ExerciseDomainFacade],
})
export class ExerciseDomainModule {}
