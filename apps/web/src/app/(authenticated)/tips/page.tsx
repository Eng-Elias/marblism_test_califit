'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin } from 'antd'
import { BellOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TipsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [tips, setTips] = useState<Model.Tip[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!userId) {
      router.push('/home')
      return
    }

    const fetchTips = async () => {
      try {
        const tipsFound = await Api.Tip.findMany()
        setTips(tipsFound)
      } catch (error) {
        enqueueSnackbar('Failed to load tips', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>Exercise Tips</Title>
          <Paragraph>
            Stay informed and motivated with our latest exercise tips and
            notifications.
          </Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {tips.map(tip => (
            <Col key={tip.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={
                  <>
                    <BellOutlined />{' '}
                    {dayjs(tip.notificationDate).format('MMMM D, YYYY')}
                  </>
                }
                bordered={false}
              >
                <Text>{tip.content}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
