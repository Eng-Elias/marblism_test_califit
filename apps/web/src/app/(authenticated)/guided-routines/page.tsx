'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GuidedExerciseRoutinesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [workoutPlans, setWorkoutPlans] = useState<Model.WorkoutPlan[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to view this page.', {
        variant: 'error',
      })
      router.push('/home')
      return
    }

    const fetchWorkoutPlans = async () => {
      try {
        const user = await Api.User.findOne(userId, {
          includes: [
            'workoutPlans',
            'workoutPlans.workoutPlanExercises',
            'workoutPlans.workoutPlanExercises.exercise',
          ],
        })
        setWorkoutPlans(user.workoutPlans || [])
      } catch (error) {
        enqueueSnackbar('Failed to load workout plans.', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkoutPlans()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title>Guided Exercise Routines</Title>
          <Paragraph>
            Follow these guided exercise routines to perform exercises correctly
            and efficiently.
          </Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {workoutPlans?.map(plan => (
            <Col xs={24} sm={12} md={8} lg={6} key={plan.id}>
              <Card
                title={plan.name}
                bordered={false}
                cover={
                  <img
                    alt={plan.name}
                    src={
                      plan.workoutPlanExercises?.[0]?.exercise?.videoUrl ||
                      'default-image-url'
                    }
                  />
                }
                actions={[
                  <PlayCircleOutlined
                    key="play"
                    onClick={() => router.push(`/workout-plan/${plan.id}`)}
                  />,
                ]}
              >
                <Text>{plan.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
