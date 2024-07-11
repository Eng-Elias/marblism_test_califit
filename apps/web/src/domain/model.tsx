import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { WorkoutPlan as WorkoutPlanModel } from './workoutPlan/workoutPlan.model'

import { Exercise as ExerciseModel } from './exercise/exercise.model'

import { WorkoutPlanExercise as WorkoutPlanExerciseModel } from './workoutPlanExercise/workoutPlanExercise.model'

import { Progress as ProgressModel } from './progress/progress.model'

import { Goal as GoalModel } from './goal/goal.model'

import { Achievement as AchievementModel } from './achievement/achievement.model'

import { CommunityChallenge as CommunityChallengeModel } from './communityChallenge/communityChallenge.model'

import { UserChallenge as UserChallengeModel } from './userChallenge/userChallenge.model'

import { Tip as TipModel } from './tip/tip.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class WorkoutPlan extends WorkoutPlanModel {}

  export class Exercise extends ExerciseModel {}

  export class WorkoutPlanExercise extends WorkoutPlanExerciseModel {}

  export class Progress extends ProgressModel {}

  export class Goal extends GoalModel {}

  export class Achievement extends AchievementModel {}

  export class CommunityChallenge extends CommunityChallengeModel {}

  export class UserChallenge extends UserChallengeModel {}

  export class Tip extends TipModel {}
}
