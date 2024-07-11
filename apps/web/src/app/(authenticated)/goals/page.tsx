'use client'

import { useEffect, useState } from 'react'
import { Typography, Form, Input, DatePicker, Button, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GoalsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [goals, setGoals] = useState<Model.Goal[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (userId) {
      fetchGoals()
    }
  }, [userId])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const user = await Api.User.findOne(userId, { includes: ['goals'] })
      setGoals(user.goals || [])
    } catch (error) {
      enqueueSnackbar('Failed to fetch goals', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const newGoal = await Api.Goal.createOneByUserId(userId, {
        description: values.description,
        targetDate: dayjs(values.targetDate).format('YYYY-MM-DD'),
      })
      setGoals([...goals, newGoal])
      enqueueSnackbar('Goal created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to create goal', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>Set Your Fitness Goals</Title>
          <Text>
            Define your fitness goals and milestones to stay motivated and on
            track.
          </Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="description"
              label="Goal Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter a description for your goal',
                },
              ]}
            >
              <Input placeholder="Enter your goal description" />
            </Form.Item>
            <Form.Item
              name="targetDate"
              label="Target Date"
              rules={[
                { required: true, message: 'Please select a target date' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<PlusOutlined />}
              >
                Add Goal
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          {goals.map(goal => (
            <div
              key={goal.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
              }}
            >
              <Text strong>{goal.description}</Text>
              <br />
              <Text type="secondary">
                Target Date: {dayjs(goal.targetDate).format('MMMM D, YYYY')}
              </Text>
            </div>
          ))}
        </Col>
      </Row>
    </PageLayout>
  )
}
