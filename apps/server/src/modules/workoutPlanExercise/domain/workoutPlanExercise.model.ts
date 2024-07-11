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

import { WorkoutPlan } from '../../../modules/workoutPlan/domain'

import { Exercise } from '../../../modules/exercise/domain'

@Entity()
export class WorkoutPlanExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  order: number

  @Column({ nullable: true })
  workoutPlanId?: string

  @ManyToOne(() => WorkoutPlan, parent => parent.workoutPlanExercises)
  @JoinColumn({ name: 'workoutPlanId' })
  workoutPlan?: WorkoutPlan

  @Column({ nullable: true })
  exerciseId?: string

  @ManyToOne(() => Exercise, parent => parent.workoutPlanExercises)
  @JoinColumn({ name: 'exerciseId' })
  exercise?: Exercise

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
