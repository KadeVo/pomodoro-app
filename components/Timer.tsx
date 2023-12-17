import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { Audio } from 'expo-av'

const Timer = () => {
  const [studyTime, setStudyTime] = useState(1500)
  const [pausedTime, setPausedTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [customStudyDuration, setCustomStudyDuration] = useState(1500)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [isResumed, setIsResumed] = useState(false)
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined)

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync()
        await sound.unloadAsync()
      }
    } catch (error) {
      console.error('Error stopping sound: ', error)
    }
  }

  useEffect(() => {
    let studyInterval: NodeJS.Timeout
    let pauseInterval: NodeJS.Timeout

    const playStudySound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/audio/mixkit-classic-winner-alarm-1997.wav')
        )
        setSound(sound)
        await sound.playAsync()
      } catch (error) {
        console.error('Error playing sound: ', error)
      }
    }

    if (isActive && studyTime > 0) {
      studyInterval = setInterval(() => {
        setStudyTime((prevStudyTime) => prevStudyTime - 1)
        stopSound()
      }, 1000)
    } else if (studyTime === 0) {
      setIsActive(false)
      playStudySound()
    }

    if (isPaused) {
      pauseInterval = setInterval(() => {
        setPausedTime((prevPausedTime) => prevPausedTime + 1)
      }, 1000)
      stopSound()
    }

    return () => {
      clearInterval(studyInterval)
      clearInterval(pauseInterval)

      if (sound) {
        sound.stopAsync()
      }
    }
  }, [isActive, isPaused, studyTime, sound])

  const toggleCustomization = () => {
    setIsCustomizing(!isCustomizing)
  }

  const applyCustomStudyDuration = () => {
    setStudyTime(customStudyDuration)
    setIsCustomizing(false)
  }

  const toggleTimer = async () => {
    if (isCustomizing) {
      setIsCustomizing(false)
    } else if (!isActive) {
      if (isResumed) {
        setIsActive(true)
        setIsPaused(false)
      } else {
        setStudyTime(customStudyDuration)
        setIsActive(true)
        setIsPaused(false)
      }
    } else {
      setIsActive(false)
      setIsPaused(true)
      setIsResumed(true)
    }
  }

  const resetTimer = async () => {
    setIsActive(false)
    setIsPaused(false)
    setStudyTime(1500)
    setPausedTime(0)
    setIsResumed(false)
    stopSound()
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {isCustomizing ? (
          <View>
            <Text style={styles.label}>Custom Study Duration:</Text>
            <Text>Please Enter in Seconds</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter duration in seconds"
              value={String(customStudyDuration)}
              onChangeText={(text: string) =>
                setCustomStudyDuration(parseInt(text) || 0)
              }
            />
            <TouchableOpacity
              style={styles.button}
              onPress={applyCustomStudyDuration}
            >
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.label}>Study Time:</Text>
            <Text style={styles.timer}>{formatTime(studyTime)}</Text>
          </>
        )}
      </View>

      {!isCustomizing && (
        <View style={styles.timerContainer}>
          <Text style={styles.label}>Paused Time:</Text>
          <Text style={styles.timer}>{formatTime(pausedTime)}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text>{isActive || isCustomizing ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleCustomization}>
        <Text>{isCustomizing ? 'Cancel' : 'Adjust Timer'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
})

export default Timer
