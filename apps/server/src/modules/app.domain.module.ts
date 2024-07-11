import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { WorkoutPlanDomainModule } from './workoutPlan/domain'

import { ExerciseDomainModule } from './exercise/domain'

import { WorkoutPlanExerciseDomainModule } from './workoutPlanExercise/domain'

import { ProgressDomainModule } from './progress/domain'

import { GoalDomainModule } from './goal/domain'

import { AchievementDomainModule } from './achievement/domain'

import { CommunityChallengeDomainModule } from './communityChallenge/domain'

import { UserChallengeDomainModule } from './userChallenge/domain'

import { TipDomainModule } from './tip/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    WorkoutPlanDomainModule,

    ExerciseDomainModule,

    WorkoutPlanExerciseDomainModule,

    ProgressDomainModule,

    GoalDomainModule,

    AchievementDomainModule,

    CommunityChallengeDomainModule,

    UserChallengeDomainModule,

    TipDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
