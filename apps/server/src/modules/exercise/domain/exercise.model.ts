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

import { WorkoutPlanExercise } from '../../../modules/workoutPlanExercise/domain'

import { Progress } from '../../../modules/progress/domain'

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  videoUrl?: string

  @OneToMany(() => WorkoutPlanExercise, child => child.exercise)
  workoutPlanExercises?: WorkoutPlanExercise[]

  @OneToMany(() => Progress, child => child.exercise)
  progresss?: Progress[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
