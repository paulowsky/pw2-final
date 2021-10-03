import {
  Fade,
  Box,
  Flex,
  ScaleFade,
  useBreakpointValue
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { LoadingTheme } from 'src/components/LoadingTheme'
import { MobileMenu } from 'src/components/MobileMenu'
import { SideMenu } from 'src/components/SideMenu'
import { Header } from 'src/components/Header'

function DashboardLayout({ children }: any) {
  const [componentLoading, setComponentLoading] = useState(true)
  const mobile = useBreakpointValue({ base: true, sm: false })

  useEffect(() => {
    setTimeout(() => setComponentLoading(false), 500)
  }, [componentLoading])

  return (
    <div className="dashboard-layout">
      <Fade unmountOnExit={true} in={componentLoading}>
        <LoadingTheme />
      </Fade>

      <ScaleFade initialScale={0.9} in={!componentLoading}>
        <Flex direction="column" h="100vh">
          <Header />

          <Flex my="6" flex="1">
            {mobile ? <MobileMenu /> : <SideMenu />}

            <Box pt={mobile ? '' : '4rem'} pl={mobile ? '' : '21rem'}>
              {children}
            </Box>
          </Flex>
        </Flex>
      </ScaleFade>
    </div>
  )
}

export default DashboardLayout
