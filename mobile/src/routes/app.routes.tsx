import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

import { Platform } from 'react-native'
import { DetailsPoll } from '../screens/DetailsPoll'

import { FindPoll } from '../screens/FindPoll'
import { NewPoll } from '../screens/NewPoll'
import { Polls } from '../screens/Polls'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  const siteIcon = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen
        name='newpoll'
        component={NewPoll}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={siteIcon} />,
          tabBarLabel: 'Novo bolão'
        }}
      />
      <Screen
        name='polls'
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={siteIcon} />,
          tabBarLabel: 'Meus bolões'
        }}
      />

      <Screen
        name='findpoll'
        component={FindPoll}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name='detailspoll'
        component={DetailsPoll}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}