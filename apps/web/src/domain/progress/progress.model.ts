import { User } from '../user'

import { Exercise } from '../exercise'

export class Progress {
  id: string

  date: string

  performanceMetric: string

  userId?: string

  user?: User

  exerciseId?: string

  exercise?: Exercise

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
