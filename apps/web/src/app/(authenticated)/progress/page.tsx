'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProgressTrackingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [progressData, setProgressData] = useState<Model.Progress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['progresss', 'progresss.exercise'],
      })
        .then(user => {
          setProgressData(user.progresss || [])
        })
        .catch(error => {
          enqueueSnackbar('Failed to load progress data', { variant: 'error' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title level={2}>
            <LineChartOutlined /> Progress Tracking
          </Title>
          <Paragraph>
            Track your exercise progress over time and stay motivated!
          </Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify="center" gutter={[16, 16]}>
          {progressData.map(progress => (
            <Col xs={24} sm={12} md={8} lg={6} key={progress.id}>
              <Card title={dayjs(progress.date).format('MMMM D, YYYY')}>
                <Text>Exercise: {progress.exercise?.name || 'N/A'}</Text>
                <br />
                <Text>Performance: {progress.performanceMetric}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
