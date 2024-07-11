import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationWorkoutPlanSubscriber } from './subscribers/notification.workoutPlan.subscriber'

import { NotificationExerciseSubscriber } from './subscribers/notification.exercise.subscriber'

import { NotificationWorkoutPlanExerciseSubscriber } from './subscribers/notification.workoutPlanExercise.subscriber'

import { NotificationProgressSubscriber } from './subscribers/notification.progress.subscriber'

import { NotificationGoalSubscriber } from './subscribers/notification.goal.subscriber'

import { NotificationAchievementSubscriber } from './subscribers/notification.achievement.subscriber'

import { NotificationCommunityChallengeSubscriber } from './subscribers/notification.communityChallenge.subscriber'

import { NotificationUserChallengeSubscriber } from './subscribers/notification.userChallenge.subscriber'

import { NotificationTipSubscriber } from './subscribers/notification.tip.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationWorkoutPlanSubscriber,

    NotificationExerciseSubscriber,

    NotificationWorkoutPlanExerciseSubscriber,

    NotificationProgressSubscriber,

    NotificationGoalSubscriber,

    NotificationAchievementSubscriber,

    NotificationCommunityChallengeSubscriber,

    NotificationUserChallengeSubscriber,

    NotificationTipSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
