export namespace UserChallengeApplicationEvent {
  export namespace UserChallengeCreated {
    export const key = 'userChallenge.application.userChallenge.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
