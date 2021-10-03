import { useEffect, useState } from 'react'

import { Input } from '@chakra-ui/input'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { useBreakpointValue } from '@chakra-ui/media-query'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalFooter
} from '@chakra-ui/modal'
import {
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/form-control'
import { SimpleGrid } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import { useForm } from 'react-hook-form'

import api from 'src/services/api'
import DashboardLayout from 'src/layouts/DashboardLayout'

function Editoras() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [editoras, setEditoras] = useState([])

  const [edittingCode, setEdittingCode] = useState(null)
  const [submitedCount, setSubmitedCount] = useState(0)

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  const mobile = useBreakpointValue({ base: true, sm: false })

  useEffect(() => {
    getEditoras()
  }, [submitedCount])

  async function getEditoras() {
    const response = await api.get('/editora')
    if (response.data) {
      setEditoras(response.data)
    }
  }

  async function handleAddEditora(data: any) {
    try {
      data = edittingCode ? { ...data, id: edittingCode } : data

      if (data.id) {
        await api.put('/editora', data)

        setSubmitedCount(submitedCount + 1)
        toast({
          title: 'Sucesso',
          description: 'Editora editado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        setEdittingCode(null)
      } else {
        await api.post('/editora', data)

        setSubmitedCount(submitedCount + 1)
        toast({
          title: 'Sucesso',
          description: 'Editora criado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
      }

      onClose()
    } catch (err: any) {
      toast({
        title: err.status,
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  function handleOpenAdd() {
    onOpen()
  }

  function handleEdit(data: any) {
    setValue('name', data.name)
    setValue('website', data.website)
    setEdittingCode(data.id)
    onOpen()
  }

  async function handleDelete(data: any) {
    if (window.confirm('Excluir esse editora?')) {
      try {
        await api.delete(`/editora/${data.id}`)
        setSubmitedCount(submitedCount + 1)
        toast({
          title: 'Sucesso',
          description: 'Editora Excluído!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
      } catch (err: any) {
        toast({
          title: err.status,
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      }
    }
  }

  function onCloseModal() {
    setEdittingCode(null)
    reset()
    onClose()
  }

  return (
    <DashboardLayout>
      <Flex w="full" className="Editoras">
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onCloseModal}
        >
          <form onSubmit={handleSubmit(handleAddEditora)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {edittingCode ? 'Editar Editora' : 'Adicionar Editora'}
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                {edittingCode && (
                  <Text size="lg" fontWeight="bold">
                    ID: {edittingCode}
                  </Text>
                )}

                <FormControl mt="8" isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('name', {
                      required: 'Campo obrigatório!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="8" isInvalid={errors.website}>
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <Input
                    id="website"
                    type="text"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('website', {
                      required: 'Campo obrigatório!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.website && errors.website.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Salvar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>

        <SimpleGrid
          mt={mobile ? '2rem' : ''}
          mb="5rem"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing="1"
        >
          {editoras &&
            editoras.map((editora: any) => (
              <Box
                key={editora.id}
                mt="1rem"
                mx="1rem"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Box p="5">
                  <HStack padding="1">
                    <IconButton
                      aria-label="Edit"
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => handleEdit(editora)}
                      size="sm"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      aria-label="Delete"
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(editora)}
                      icon={<DeleteIcon />}
                    />
                  </HStack>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {editora.id} - {editora.name}
                  </Box>
                </Box>
              </Box>
            ))}
        </SimpleGrid>

        <Button
          mt="2rem"
          colorScheme="purple"
          onClick={() => handleOpenAdd()}
          position="fixed"
          mb="5rem"
          mr="2rem"
          bottom={0}
          right={0}
        >
          Adicionar Editora
        </Button>
      </Flex>
    </DashboardLayout>
  )
}

export default Editoras
