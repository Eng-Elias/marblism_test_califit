'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, List, Avatar } from 'antd'
import {
  TrophyOutlined,
  FlagOutlined,
  LineChartOutlined,
  BellOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState<Model.User | null>(null)
  const [tips, setTips] = useState<Model.Tip[]>([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['notifications', 'progresss', 'goals', 'achievements'],
      })
        .then(setUser)
        .catch(err =>
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' }),
        )

      Api.Tip.findMany()
        .then(setTips)
        .catch(err =>
          enqueueSnackbar('Failed to fetch tips', { variant: 'error' }),
        )
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>My Dashboard</Title>
      <Paragraph>
        Track your progress, view tips, set goals, and celebrate achievements.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={12} lg={8}>
          <Card
            title="My Progress"
            extra={<LineChartOutlined />}
            onClick={() => router.push('/progress')}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.progresss}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={dayjs(item.date).format('MMMM D, YYYY')}
                    description={`Performance: ${item.performanceMetric}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card
            title="Exercise Tips"
            extra={<BellOutlined />}
            onClick={() => router.push('/tips')}
          >
            <List
              itemLayout="horizontal"
              dataSource={tips}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={dayjs(item.notificationDate).format('MMMM D, YYYY')}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card
            title="My Goals"
            extra={<FlagOutlined />}
            onClick={() => router.push('/goals')}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.goals}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={dayjs(item.targetDate).format('MMMM D, YYYY')}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card
            title="My Achievements"
            extra={<TrophyOutlined />}
            onClick={() => router.push('/achievements')}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.achievements}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={dayjs(item.dateAchieved).format('MMMM D, YYYY')}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
