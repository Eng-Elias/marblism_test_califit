export namespace GoalApplicationEvent {
  export namespace GoalCreated {
    export const key = 'goal.application.goal.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
