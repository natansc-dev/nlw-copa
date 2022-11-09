import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

import { useState, useCallback } from 'react'
import { PollCardProps, PollCard } from "../components/PollCard";
import { EmptyPollList } from "../components/EmptyPollList";

export function Polls() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [polls, setPolls] = useState<PollCardProps[]>([])
  const toast = useToast()

  async function getPolls() {
    try {
      setIsLoading(true)

      const response = await api.get('/polls')

      setPolls(response.data.polls)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar seus bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getPolls()
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Bolões" />

      <VStack mt={6} mb={4} mx={4} borderBottomWidth={1} borderBottomColor="gray.600" pb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('findpoll')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('detailspoll', { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  )
}