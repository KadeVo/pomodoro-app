import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my Pomodora App</Text>
      <Text style={styles.description}>
        This is a work in progress to teach myself React Native.
      </Text>

      <Link href="/two">
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to the Timer</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
