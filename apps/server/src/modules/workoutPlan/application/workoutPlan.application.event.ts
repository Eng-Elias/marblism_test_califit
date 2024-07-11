export namespace WorkoutPlanApplicationEvent {
  export namespace WorkoutPlanCreated {
    export const key = 'workoutPlan.application.workoutPlan.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
