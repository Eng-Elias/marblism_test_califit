import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { WorkoutPlanApi } from './workoutPlan/workoutPlan.api'

import { ExerciseApi } from './exercise/exercise.api'

import { WorkoutPlanExerciseApi } from './workoutPlanExercise/workoutPlanExercise.api'

import { ProgressApi } from './progress/progress.api'

import { GoalApi } from './goal/goal.api'

import { AchievementApi } from './achievement/achievement.api'

import { CommunityChallengeApi } from './communityChallenge/communityChallenge.api'

import { UserChallengeApi } from './userChallenge/userChallenge.api'

import { TipApi } from './tip/tip.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class WorkoutPlan extends WorkoutPlanApi {}

  export class Exercise extends ExerciseApi {}

  export class WorkoutPlanExercise extends WorkoutPlanExerciseApi {}

  export class Progress extends ProgressApi {}

  export class Goal extends GoalApi {}

  export class Achievement extends AchievementApi {}

  export class CommunityChallenge extends CommunityChallengeApi {}

  export class UserChallenge extends UserChallengeApi {}

  export class Tip extends TipApi {}
}
