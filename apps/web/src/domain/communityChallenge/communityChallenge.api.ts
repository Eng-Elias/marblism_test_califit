import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CommunityChallenge } from './communityChallenge.model'

export class CommunityChallengeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CommunityChallenge>,
  ): Promise<CommunityChallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/communityChallenges${buildOptions}`)
  }

  static findOne(
    communityChallengeId: string,
    queryOptions?: ApiHelper.QueryOptions<CommunityChallenge>,
  ): Promise<CommunityChallenge> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/communityChallenges/${communityChallengeId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<CommunityChallenge>,
  ): Promise<CommunityChallenge> {
    return HttpService.api.post(`/v1/communityChallenges`, values)
  }

  static updateOne(
    communityChallengeId: string,
    values: Partial<CommunityChallenge>,
  ): Promise<CommunityChallenge> {
    return HttpService.api.patch(
      `/v1/communityChallenges/${communityChallengeId}`,
      values,
    )
  }

  static deleteOne(communityChallengeId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/communityChallenges/${communityChallengeId}`,
    )
  }
}
