export namespace TipApplicationEvent {
  export namespace TipCreated {
    export const key = 'tip.application.tip.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
