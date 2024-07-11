import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { WorkoutPlanApplicationModule } from './workoutPlan/application'

import { ExerciseApplicationModule } from './exercise/application'

import { WorkoutPlanExerciseApplicationModule } from './workoutPlanExercise/application'

import { ProgressApplicationModule } from './progress/application'

import { GoalApplicationModule } from './goal/application'

import { AchievementApplicationModule } from './achievement/application'

import { CommunityChallengeApplicationModule } from './communityChallenge/application'

import { UserChallengeApplicationModule } from './userChallenge/application'

import { TipApplicationModule } from './tip/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    WorkoutPlanApplicationModule,

    ExerciseApplicationModule,

    WorkoutPlanExerciseApplicationModule,

    ProgressApplicationModule,

    GoalApplicationModule,

    AchievementApplicationModule,

    CommunityChallengeApplicationModule,

    UserChallengeApplicationModule,

    TipApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
