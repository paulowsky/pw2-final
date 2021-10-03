import { Button, Box, Flex, Spacer } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

function Home(props: any) {
  const history = useHistory()

  return (
    <div className="home">
      <Flex
        as="header"
        h="4.2rem"
        w="100%"
        bgColor="white"
        px="8"
        shadow="0 0 20px rgba(0, 0, 0, 0.05)"
        alignItems="center"
      >
        <Spacer />

        <Box>
          <Button onClick={() => history.push('/login')}>Dashboard</Button>
        </Box>
      </Flex>
    </div>
  )
}

export default Home
