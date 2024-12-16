import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles'
import { Pressable, Text, TextInput, View, Keyboard } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import * as ReactNativeAppClip from 'react-native-app-clip'
import * as SecureStore from 'expo-secure-store'

const Calculator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [res, setRes] = useState<number | null>(null)

  const [numOperations, setNumOperations] = useState<number>(0)

  const [lastSavedComputation, setLastSavedComputation] = useState<string | null>(null)

  const saveLastComputation = async (val: number) => {
    console.warn(`Saving last computation: ${val}`)
    await SecureStore.setItemAsync('lastComputation', val.toString())
  }

  useEffect(() => {
    (async () => {
      setLastSavedComputation(await SecureStore.getItemAsync('lastComputation'))
    })()
  }, [])

const handleAdd = useCallback(async () => {
    const sum = x + y
    Keyboard.dismiss()
    setRes(sum)
    setNumOperations((prev: number) => prev + 1)
    await saveLastComputation(sum)
  }, [x, y])

  const handleSub = useCallback(async () => {
    Keyboard.dismiss()
    const diff = x - y
    setRes(diff)
    setNumOperations((prev: number) => prev + 1)
    await saveLastComputation(diff)
  }, [x, y])

  const handleMul = useCallback(async () => {
    Keyboard.dismiss()
    const prod = x * y
    setRes(prod)
    setNumOperations((prev: number) => prev + 1)
  }, [x, y])

  const handleDiv = useCallback(async () => {
    Keyboard.dismiss()
    const quot = y == 0 ? 0 : x / y
    setRes(quot)
    setNumOperations((prev: number) => prev + 1)
  }, [x, y])

  useEffect(() => {
    if (numOperations >= 5 && ReactNativeAppClip.isClip()) {
      console.warn(`About to launch app overlay`)
      ReactNativeAppClip.displayOverlay()
    }
  }, [numOperations])


  return (
    <SafeAreaView style={styles.container}>
      { !!lastSavedComputation && (<Text>Last Saved Computation: {lastSavedComputation}</Text>)}
      <TextInput
        keyboardType='numeric'
        style={styles.textInput}
        value={x.toString()}
        onChangeText={text => setX(parseFloat(text))} />
      <TextInput
        keyboardType='numeric'
        style={styles.textInput}
        value={y.toString()}
        onChangeText={text => setY(parseFloat(text))} />
      { res && (<Text>{res}</Text>)}
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          style={styles.smallButton}
          onPress={handleAdd}>
          <Text>Add</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={handleSub}>
          <Text>Sub</Text>
        </Pressable>
        { !ReactNativeAppClip.isClip() && (
        <Pressable
          style={styles.smallButton}
          onPress={handleMul}>
          <Text>Mul</Text>
        </Pressable>
        )}
        { !ReactNativeAppClip.isClip() && (
        <Pressable
          style={styles.smallButton}
          onPress={handleDiv}>
          <Text>Div</Text>
        </Pressable>
        )}
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Calculator
