export namespace ExerciseApplicationEvent {
  export namespace ExerciseCreated {
    export const key = 'exercise.application.exercise.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
