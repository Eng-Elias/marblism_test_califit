import { User } from '../user'

import { CommunityChallenge } from '../communityChallenge'

export class UserChallenge {
  id: string

  userId?: string

  user?: User

  communityChallengeId?: string

  communityChallenge?: CommunityChallenge

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
