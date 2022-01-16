import { useState } from "react"
import { Button, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { FormStyles } from "./styles"

const Input = ({onMessage}: {onMessage?: (message: string) => void}) => {

  const [message, setMessage] = useState('')
  const handleSubmit = () => {
    onMessage && message && onMessage(message)
    setMessage('')
  }

  return (
    <View style={FormStyles.container}>
      <TextInput
        onChangeText={value => setMessage(value)}
        value={message}
        placeholder="Ваше сообщение..." 
        style={[FormStyles.field, {maxHeight: 35}]}
        multiline={true}
      />
      <Button title="Отправить" onPress={handleSubmit}/>  
    </View>
  )
}

export default Input