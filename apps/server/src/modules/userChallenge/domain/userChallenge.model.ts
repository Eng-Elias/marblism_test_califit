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

import { CommunityChallenge } from '../../../modules/communityChallenge/domain'

@Entity()
export class UserChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.userChallenges)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  communityChallengeId?: string

  @ManyToOne(() => CommunityChallenge, parent => parent.userChallenges)
  @JoinColumn({ name: 'communityChallengeId' })
  communityChallenge?: CommunityChallenge

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
