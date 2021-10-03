import { useEffect, useState } from 'react'

import { Input } from '@chakra-ui/input'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Select } from '@chakra-ui/select'
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

function Livros() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [livros, setLivros] = useState([])
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
    getLivros()
    getEditoras()
  }, [submitedCount])

  async function getLivros() {
    const response = await api.get('/livro')
    if (response.data) {
      setLivros(response.data)
    }
  }

  async function getEditoras() {
    const response = await api.get('/editora')
    if (response.data) {
      setEditoras(response.data)
    }
  }

  async function handleAddLivro(data: any) {
    try {
      data = edittingCode ? { ...data, id: edittingCode } : data

      if (data.id) {
        await api.put('/livro', data)

        setSubmitedCount(submitedCount + 1)
        toast({
          title: 'Sucesso',
          description: 'Livro editado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        setEdittingCode(null)
      } else {
        await api.post('/livro', data)

        setSubmitedCount(submitedCount + 1)
        toast({
          title: 'Sucesso',
          description: 'Livro criado com sucesso!',
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
    if (editoras.length !== 0) {
      onOpen()
    } else {
      toast({
        title: 'Nenhuma editora',
        description:
          'Você precisa de uma editora para poder cadastrar um livro!',
        status: 'warning',
        duration: 5000,
        isClosable: true
      })
    }
  }

  function handleEdit(data: any) {
    setValue('title', data.title)
    setValue('description', data.description)
    setValue('price', data.price)
    setValue('editora', data.editora)
    setEdittingCode(data.id)
    onOpen()
  }

  async function handleDelete(data: any) {
    if (window.confirm('Excluir esse livro?')) {
      try {
        await api.delete(`/livro/${data.id}`)
        setSubmitedCount(submitedCount - 1)
        toast({
          title: 'Sucesso',
          description: 'Livro Excluído!',
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
      <Flex w="full" className="Livros">
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onCloseModal}
        >
          <form onSubmit={handleSubmit(handleAddLivro)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {edittingCode ? 'Editar Livro' : 'Adicionar Livro'}
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                {edittingCode && (
                  <Text size="lg" fontWeight="bold">
                    ID: {edittingCode}
                  </Text>
                )}

                <FormControl mt="8" isInvalid={errors.title}>
                  <FormLabel htmlFor="title">Título</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('title', {
                      required: 'Campo obrigatório!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="8" isInvalid={errors.description}>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <Input
                    id="description"
                    type="text"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('description', {
                      required: 'Campo obrigatório!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="8" isInvalid={errors.price}>
                  <FormLabel htmlFor="price">Preço</FormLabel>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('price', {
                      required: 'Campo obrigatório!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.price && errors.price.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="8" isInvalid={errors.editora}>
                  <FormLabel htmlFor="editora">Editora</FormLabel>
                  <Select
                    id="editora"
                    cursor="pointer"
                    size="lg"
                    placeholder="Selecione a editora"
                    {...register('editora', {
                      required: 'Campo obrigatório!'
                    })}
                  >
                    {editoras?.map((editora: any) => (
                      <option key={editora.id} value={editora.id}>
                        {editora.name}
                      </option>
                    ))}
                  </Select>

                  <FormErrorMessage>
                    {errors.editora && errors.editora.message}
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
          {livros &&
            livros.map((livro: any) => (
              <Box
                key={livro.id}
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
                      onClick={() => handleEdit(livro)}
                      size="sm"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      aria-label="Delete"
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(livro)}
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
                    {livro.id} - {livro.title}
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
          Adicionar Livro
        </Button>
      </Flex>
    </DashboardLayout>
  )
}

export default Livros
