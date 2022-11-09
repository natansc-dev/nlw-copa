import { Heading, VStack, useToast, useNativeBase } from "native-base";

import { useNavigation } from '@react-navigation/native'


import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useState } from 'react'
import { api } from "../services/api";


export function FindPoll() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleJoinPoll() {
    try {
      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setIsLoading(true)

      await api.post('/polls/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('polls')
    } catch (error) {
      console.log(error)

      setIsLoading(false)

      if (error.response?.data?.message === 'Poll not found.') {
        toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response?.data?.message === 'You are already a join this poll.') {
        toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={4} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual é código do seu bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  )
}