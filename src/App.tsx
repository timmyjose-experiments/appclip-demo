import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Calculator from './screens/Calculator'
import * as ReactNativeAppClip from 'react-native-app-clip'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export type RootStackParamList = {
  Home: undefined
  Calculator: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  useEffect(() => {
    const alertMsg = ReactNativeAppClip.isClip() ? 'Running app clip' : 'Running full app'
    Alert.alert(alertMsg)
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Calculator' component={Calculator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App