export namespace WorkoutPlanExerciseApplicationEvent {
  export namespace WorkoutPlanExerciseCreated {
    export const key =
      'workoutPlanExercise.application.workoutPlanExercise.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
