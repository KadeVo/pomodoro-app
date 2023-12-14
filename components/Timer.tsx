import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Timer = () => {
  const [seconds, setSeconds] = useState(1500)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setSeconds(1500)
  }

  return (
    <View style={styles.container}>
      <Text>Pomo Timer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Timer
