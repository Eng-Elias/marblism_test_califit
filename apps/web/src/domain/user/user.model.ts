import { Notification } from '../notification'

import { WorkoutPlan } from '../workoutPlan'

import { Progress } from '../progress'

import { Goal } from '../goal'

import { Achievement } from '../achievement'

import { UserChallenge } from '../userChallenge'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  workoutPlans?: WorkoutPlan[]

  progresss?: Progress[]

  goals?: Goal[]

  achievements?: Achievement[]

  userChallenges?: UserChallenge[]
}
