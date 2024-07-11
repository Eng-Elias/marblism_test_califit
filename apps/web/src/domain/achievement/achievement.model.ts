import { User } from '../user'

export class Achievement {
  id: string

  description: string

  dateAchieved: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
