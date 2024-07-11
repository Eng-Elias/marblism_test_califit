export namespace AchievementApplicationEvent {
  export namespace AchievementCreated {
    export const key = 'achievement.application.achievement.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
