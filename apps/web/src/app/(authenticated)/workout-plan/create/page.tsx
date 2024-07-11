'use client'

import { useState } from 'react'
import { Typography, Form, Input, Button, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function WorkoutPlanCreationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { name: string; description?: string }) => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }

    setLoading(true)
    try {
      await Api.WorkoutPlan.createOneByUserId(userId, values)
      enqueueSnackbar('Workout plan created successfully', {
        variant: 'success',
      })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to create workout plan', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Title level={2}>Create Your Personalized Workout Plan</Title>
          <Paragraph>
            Tailor your exercises to your fitness goals by creating a
            personalized workout plan.
          </Paragraph>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Workout Plan Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the name of your workout plan',
                },
              ]}
            >
              <Input placeholder="Enter workout plan name" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={4}
                placeholder="Enter a description for your workout plan"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<PlusOutlined />}
              >
                Create Workout Plan
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
