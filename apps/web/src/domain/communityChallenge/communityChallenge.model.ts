import { UserChallenge } from '../userChallenge'

export class CommunityChallenge {
  id: string

  name: string

  description?: string

  startDate: string

  endDate: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userChallenges?: UserChallenge[]
}
