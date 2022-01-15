import { Text, View } from "react-native";
import { Message } from "../types";

const MessageComponent = ({message, mine}: {message: Message, mine: boolean}) => {
  return (
    <View style={{
      backgroundColor: mine ? '#2774b3' : 'grey',
      borderRadius: 10,
      alignSelf: mine ? 'flex-end' : 'flex-start',
      margin: 3,
      padding: 5,
    }}>
      <Text style={{color: 'white'}}>{message.content}</Text>
    </View>
  )
}

export default MessageComponent