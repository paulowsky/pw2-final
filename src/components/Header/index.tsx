import { Flex, Avatar, AvatarBadge, Box, Text } from '@chakra-ui/react'

import useGlobal from 'src/hooks/useGlobal'

export function Header() {
  const { user } = useGlobal()

  return (
    <Flex
      as="header"
      h="4.2rem"
      w="100%"
      zIndex="1"
      bgColor="white"
      px="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      alignItems="center"
      position="fixed"
    >
      <Flex alignItems="center" w="60" mr="8">
        <Avatar size="md" name="User" src="https://github.com/github.png">
          <AvatarBadge
            borderColor="papayawhip"
            bg="purple.500"
            boxSize="1.25rem"
          />
        </Avatar>
        <Box ml="4">
          <Text fontWeight="medium">User</Text>
          <Text color="gray.500" fontSize="small">
            {user.email}
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
