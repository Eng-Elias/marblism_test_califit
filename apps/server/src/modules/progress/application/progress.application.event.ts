export namespace ProgressApplicationEvent {
  export namespace ProgressCreated {
    export const key = 'progress.application.progress.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
