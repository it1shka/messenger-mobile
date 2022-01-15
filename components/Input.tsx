import { useState } from "react"
import { Button, StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"

const Input = ({onMessage}: {onMessage?: (message: string) => void}) => {

  const [message, setMessage] = useState('')
  const handleSubmit = () => {
    onMessage && onMessage(message)
    setMessage('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => setMessage(value)}
        value={message}
        placeholder="Ваше сообщение..." 
        style={styles.field} 
      />
      <Button title="Отправить" onPress={handleSubmit}/>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  }
})

export default Input