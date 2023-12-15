import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Timer = () => {
  const [studyTime, setStudyTime] = useState(1500)
  const [pausedTime, setPausedTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

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
      }, 1000)
    }

    return () => {
      clearInterval(studyInterval)
      clearInterval(pauseInterval)
    }
  }, [isActive, isPaused, studyTime])

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true)
    } else {
      setIsActive(false)
      setIsPaused(true)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setStudyTime(1500)
    setPausedTime(0)
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
        <Text style={styles.label}>Study Time:</Text>
        <Text style={styles.timer}>{formatTime(studyTime)}</Text>
      </View>
      {isPaused && (
        <View style={styles.timerContainer}>
          <Text style={styles.label}>Paused Time:</Text>
          <Text style={styles.timer}>{formatTime(pausedTime)}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
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
})

export default Timer
