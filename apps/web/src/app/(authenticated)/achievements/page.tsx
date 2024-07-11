'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Button, Row, Col, Card } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AchievementsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [achievements, setAchievements] = useState<Model.Achievement[]>([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['achievements'] })
        .then(user => {
          if (user.achievements) {
            setAchievements(user.achievements)
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to load achievements', { variant: 'error' })
        })
    } else {
      router.push('/home')
    }
  }, [userId, router])

  const handleShare = (achievement: Model.Achievement) => {
    // Implement share functionality here
    enqueueSnackbar(`Shared achievement: ${achievement.description}`, {
      variant: 'success',
    })
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2}>My Achievements</Title>
          <Text>
            Share your exercise achievements with friends to celebrate your
            progress and stay motivated.
          </Text>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={achievements}
            renderItem={achievement => (
              <List.Item key={achievement.id}>
                <Card>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={4}>{achievement.description}</Title>
                      <Text type="secondary">
                        {dayjs(achievement.dateAchieved).format('MMMM D, YYYY')}
                      </Text>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        icon={<ShareAltOutlined />}
                        onClick={() => handleShare(achievement)}
                      >
                        Share
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}
