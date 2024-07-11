import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  let itemsLeftbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/workout-plan/create',
      label: 'Workout Plan Creation',
      onClick: () => goTo('/workout-plan/create'),
    },

    {
      key: '/guided-routines',
      label: 'Guided Exercise Routines',
      onClick: () => goTo('/guided-routines'),
    },

    {
      key: '/progress',
      label: 'Progress Tracking',
      onClick: () => goTo('/progress'),
    },

    {
      key: '/exercise-tutorials',
      label: 'Exercise Tutorials',
      onClick: () => goTo('/exercise-tutorials'),
    },

    {
      key: '/community-challenges',
      label: 'Community Challenges',
      onClick: () => goTo('/community-challenges'),
    },

    {
      key: '/tips',
      label: 'Tips',
      onClick: () => goTo('/tips'),
    },

    {
      key: '/goals',
      label: 'Goals',
      onClick: () => goTo('/goals'),
    },

    {
      key: '/achievements',
      label: 'Achievements',
      onClick: () => goTo('/achievements'),
    },
  ]

  let itemsUser = []

  let itemsTopbar = []

  let itemsSubNavigation = [
    {
      key: '/home',
      label: 'Home',
    },

    {
      key: '/workout-plan/create',
      label: 'Workout Plan Creation',
    },

    {
      key: '/guided-routines',
      label: 'Guided Exercise Routines',
    },

    {
      key: '/progress',
      label: 'Progress Tracking',
    },

    {
      key: '/exercise-tutorials',
      label: 'Exercise Tutorials',
    },

    {
      key: '/community-challenges',
      label: 'Community Challenges',
    },

    {
      key: '/tips',
      label: 'Tips',
    },

    {
      key: '/goals',
      label: 'Goals',
    },

    {
      key: '/achievements',
      label: 'Achievements',
    },
  ]

  let itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar =
    (itemsLeftbar.length > 0 || itemsUser.length > 0) &&
    !isMobile &&
    authentication.isLoggedIn

  if (!authentication.isLoggedIn) {
    itemsLeftbar = []
    itemsUser = []
    itemsTopbar = []
    itemsSubNavigation = []
    itemsMobile = []
  }

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              isLoggedIn={authentication.isLoggedIn}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
