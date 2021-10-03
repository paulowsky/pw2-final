import React from 'react'
import { VStack, Link, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import {
  ArrowBackIcon,
  AtSignIcon,
  AttachmentIcon,
  SettingsIcon
} from '@chakra-ui/icons'

import useGlobal from 'src/hooks/useGlobal'

export function SideMenu() {
  const { logout } = useGlobal()

  const height = useBreakpointValue({
    base: '90%',
    xl: '90%',
    lg: '88%',
    md: '83%',
    sm: '85%'
  })

  return (
    <Flex
      as="aside"
      w="72"
      h={height}
      bgColor="white"
      mt="3.6rem"
      py="8"
      mx="6"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={4}
      position="fixed"
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>
          General
        </Text>
        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          href="/dashboard"
        >
          <SettingsIcon size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Dashboard
          </Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} href="/livros">
          <AttachmentIcon size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Livros
          </Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} href="/editoras">
          <AtSignIcon size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Editoras
          </Text>
        </Link>
      </VStack>

      <Link
        display="flex"
        alignItems="center"
        py="1"
        pl={8}
        color="gray.500"
        borderLeft="3px solid transparent"
        mt="auto"
        onClick={logout}
      >
        <ArrowBackIcon size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">
          Logout
        </Text>
      </Link>
    </Flex>
  )
}
