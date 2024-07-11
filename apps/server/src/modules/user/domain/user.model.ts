import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { WorkoutPlan } from '../../../modules/workoutPlan/domain'

import { Progress } from '../../../modules/progress/domain'

import { Goal } from '../../../modules/goal/domain'

import { Achievement } from '../../../modules/achievement/domain'

import { UserChallenge } from '../../../modules/userChallenge/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => WorkoutPlan, child => child.user)
  workoutPlans?: WorkoutPlan[]

  @OneToMany(() => Progress, child => child.user)
  progresss?: Progress[]

  @OneToMany(() => Goal, child => child.user)
  goals?: Goal[]

  @OneToMany(() => Achievement, child => child.user)
  achievements?: Achievement[]

  @OneToMany(() => UserChallenge, child => child.user)
  userChallenges?: UserChallenge[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
