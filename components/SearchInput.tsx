import { useState } from "react"
import { Button, View, Keyboard } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { FormStyles } from "./styles"

const SearchInput = ({onQuery}: {onQuery?: (query: string) => void}) => {

  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    Keyboard.dismiss()
    onQuery && onQuery(query)
  }

  return (
    <View style={FormStyles.container}>
      <TextInput
        autoCapitalize="none"
        onChangeText={value => setQuery(value)}
        value={query}
        placeholder="Email пользователя..." 
        style={FormStyles.field} 
        keyboardType="email-address"

        onSubmitEditing={handleSubmit}
      />
      <Button title="Поиск" onPress={handleSubmit}/>  
    </View>
  )
}

export default SearchInput