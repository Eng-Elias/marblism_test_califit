'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card } from 'antd'
import { VideoCameraOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ExerciseTutorialsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [exercises, setExercises] = useState<Model.Exercise[]>([])

  useEffect(() => {
    if (!userId) {
      router.push('/home')
      return
    }

    const fetchExercises = async () => {
      try {
        const exercisesFound = await Api.Exercise.findMany({
          includes: ['workoutPlanExercises', 'workoutPlanExercises.exercise'],
        })
        setExercises(exercisesFound)
      } catch (error) {
        enqueueSnackbar('Failed to load exercises', { variant: 'error' })
      }
    }

    fetchExercises()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title level={2}>Exercise Tutorials</Title>
          <Paragraph>
            Learn how to perform exercises properly with our detailed tutorials.
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {exercises?.map(exercise => (
          <Col xs={24} sm={12} md={8} lg={6} key={exercise.id}>
            <Card
              hoverable
              cover={
                <video
                  controls
                  src={exercise.videoUrl}
                  style={{ width: '100%' }}
                />
              }
              actions={[<VideoCameraOutlined key="video" />]}
            >
              <Card.Meta
                title={exercise.name}
                description={<Text>{exercise.description}</Text>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
