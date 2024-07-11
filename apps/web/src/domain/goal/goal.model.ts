import { User } from '../user'

export class Goal {
  id: string

  description: string

  targetDate: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
