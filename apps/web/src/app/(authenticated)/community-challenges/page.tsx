'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Card, Row, Col, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CommunityChallengesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [challenges, setChallenges] = useState<Model.CommunityChallenge[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const communityChallengesFound = await Api.CommunityChallenge.findMany({
          includes: ['userChallenges', 'userChallenges.communityChallenge'],
        })
        setChallenges(communityChallengesFound)
      } catch (error) {
        enqueueSnackbar('Failed to load community challenges', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    if (authentication.isLoggedIn) {
      fetchChallenges()
    } else {
      router.push('/home')
    }
  }, [authentication.isLoggedIn, router])

  const joinChallenge = async (challengeId: string) => {
    try {
      await Api.UserChallenge.createOneByUserId(userId, {
        communityChallengeId: challengeId,
      })
      enqueueSnackbar('Successfully joined the challenge!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to join the challenge', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2} style={{ textAlign: 'center' }}>
        Community Challenges
      </Title>
      <Paragraph style={{ textAlign: 'center' }}>
        Join community challenges to compete with others and stay motivated.
      </Paragraph>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {challenges?.map(challenge => (
            <Col key={challenge.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={challenge.name}
                actions={[
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => joinChallenge(challenge.id)}
                  >
                    Join
                  </Button>,
                ]}
              >
                <Text>{challenge.description}</Text>
                <br />
                <Text type="secondary">
                  Start Date:{' '}
                  {dayjs(challenge.startDate).format('MMMM D, YYYY')}
                </Text>
                <br />
                <Text type="secondary">
                  End Date: {dayjs(challenge.endDate).format('MMMM D, YYYY')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
