import { Spinner } from '@chakra-ui/react'

export function LoadingTheme() {
  return (
    <Spinner
      thickness="5px"
      speed="0.50s"
      emptyColor="purple.100"
      color="purple.500"
      size="xl"
      position="absolute"
      my="20%"
      mx="45%"
    />
  )
}
