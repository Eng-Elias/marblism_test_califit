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

import { Exercise } from '../../../modules/exercise/domain'

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  date: string

  @Column({})
  performanceMetric: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.progresss)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  exerciseId?: string

  @ManyToOne(() => Exercise, parent => parent.progresss)
  @JoinColumn({ name: 'exerciseId' })
  exercise?: Exercise

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
