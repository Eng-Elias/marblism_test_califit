export namespace CommunityChallengeApplicationEvent {
  export namespace CommunityChallengeCreated {
    export const key =
      'communityChallenge.application.communityChallenge.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
