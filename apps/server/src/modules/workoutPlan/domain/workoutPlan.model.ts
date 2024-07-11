import { ColumnNumeric } from '@server/core/database'
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

import { User } from '../../../modules/user/domain'

import { WorkoutPlanExercise } from '../../../modules/workoutPlanExercise/domain'

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.workoutPlans)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => WorkoutPlanExercise, child => child.workoutPlan)
  workoutPlanExercises?: WorkoutPlanExercise[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
