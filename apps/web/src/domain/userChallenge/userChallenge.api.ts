import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UserChallenge } from './userChallenge.model'

export class UserChallengeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UserChallenge>,
  ): Promise<UserChallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userChallenges${buildOptions}`)
  }

  static findOne(
    userChallengeId: string,
    queryOptions?: ApiHelper.QueryOptions<UserChallenge>,
  ): Promise<UserChallenge> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/userChallenges/${userChallengeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<UserChallenge>): Promise<UserChallenge> {
    return HttpService.api.post(`/v1/userChallenges`, values)
  }

  static updateOne(
    userChallengeId: string,
    values: Partial<UserChallenge>,
  ): Promise<UserChallenge> {
    return HttpService.api.patch(
      `/v1/userChallenges/${userChallengeId}`,
      values,
    )
  }

  static deleteOne(userChallengeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userChallenges/${userChallengeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<UserChallenge>,
  ): Promise<UserChallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/userChallenges${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<UserChallenge>,
  ): Promise<UserChallenge> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/userChallenges`,
      values,
    )
  }

  static findManyByCommunityChallengeId(
    communityChallengeId: string,
    queryOptions?: ApiHelper.QueryOptions<UserChallenge>,
  ): Promise<UserChallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/communityChallenges/communityChallenge/${communityChallengeId}/userChallenges${buildOptions}`,
    )
  }

  static createOneByCommunityChallengeId(
    communityChallengeId: string,
    values: Partial<UserChallenge>,
  ): Promise<UserChallenge> {
    return HttpService.api.post(
      `/v1/communityChallenges/communityChallenge/${communityChallengeId}/userChallenges`,
      values,
    )
  }
}
