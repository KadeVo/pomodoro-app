import { StyleSheet, TouchableOpacity } from 'react-native'
import Timer from '../../components/Timer'
import { Text, View } from '../../components/Themed'
import { Link } from 'expo-router'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Timer />

      <TouchableOpacity style={styles.button}>
        <Link href="/">
          <Text style={styles.buttonText}>Go to home page</Text>
        </Link>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
