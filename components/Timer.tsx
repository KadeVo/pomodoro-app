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

  const playSound = async () => {
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

  useEffect(() => {
    let studyInterval: NodeJS.Timeout
    let pauseInterval: NodeJS.Timeout

    if (isActive && studyTime > 0) {
      studyInterval = setInterval(() => {
        setStudyTime((prevStudyTime) => prevStudyTime - 1)
      }, 1000)
    } else if (studyTime === 0) {
      setIsActive(false)
    }

    if (isPaused) {
      pauseInterval = setInterval(() => {
        setPausedTime((prevPausedTime) => prevPausedTime + 1)
        stopSound()
      }, 1000)
    }
    if (studyTime <= 0 && isActive) {
      setIsActive(false)
      playSound()
    }

    return () => {
      clearInterval(studyInterval)
      clearInterval(pauseInterval)
    }
  }, [isActive, isPaused, studyTime])

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
        stopSound()
      }
    } else {
      setIsActive(false)
      setIsPaused(true)
      setIsResumed(true)
      stopSound()
    }
  }

  const resetTimer = async () => {
    setIsActive(false)
    setIsPaused(false)
    setStudyTime(1500)
    setPausedTime(0)
    setIsResumed(false)
    stopSound()
    setCustomStudyDuration(1500)
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
          <View style={styles.customizationContainer}>
            <Text style={styles.customizationLabel}>
              Custom Study Duration:
            </Text>
            <Text style={styles.customizationDescription}>
              Please Enter in Seconds
            </Text>
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
              style={styles.applyButton}
              onPress={applyCustomStudyDuration}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
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
        <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
          <Text style={styles.timerButtonText}>
            {isActive || isCustomizing ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerButton} onPress={resetTimer}>
          <Text style={styles.timerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.customizationButton}
        onPress={toggleCustomization}
      >
        <Text style={styles.customizationButtonText}>
          {isCustomizing ? 'Cancel' : 'Adjust Timer'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'linear-gradient(to bottom, #f04747, #e91e63)',
  },
  heading: {
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  customizationContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customizationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customizationDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#888',
  },
  timer: {
    fontSize: 64,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  timerButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  customizationButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
  },
  customizationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
})

export default Timer
