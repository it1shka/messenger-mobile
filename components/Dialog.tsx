import { StackScreenProps } from "@react-navigation/stack"
import { arrayUnion, doc, getFirestore, onSnapshot, setDoc, Timestamp } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from "react-native"
import Context from "../context"
import { Message } from "../types"
import Input from "./Input"
import { StackParamList } from "./MainLayout"
import Messages from "./Messages"

const defaultpp = require('../assets/defaultpp.png')

type DialogProps = StackScreenProps<StackParamList, 'Dialog'>

const Dialog = ({route, /* navigation */}: DialogProps) => {

  const friend = route.params.friend
  const user = useContext(Context)!
  const channelId = [friend.uid, user.uid].sort().join('')
  
  const db = getFirestore()
  const messagesRef = doc(db, 'channels', channelId)
  const friendChannels = doc(db, 'engaged', friend.uid)

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (doc) => {
      const fetched = (doc.data()?.messages ?? []) as Message[]
      setMessages(fetched)
    })
    return () => unsubscribe()
  }, [])

  const sendMessage = (message: string) => {
    setDoc(messagesRef, {
      messages: arrayUnion({
        content: message,
        author: user.uid,
        createdAt: Timestamp.now()
      })
    }, { merge: true })

    setDoc(friendChannels, {
      channels: arrayUnion(user.uid)
    }, { merge: true })
  }

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image 
            style={styles.profilePicture} 
            source={friend?.photoURL ? {uri: friend.photoURL} : defaultpp }
          />
          <Text style={styles.username}>{friend.displayName ?? 'Неизвестный'}</Text>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <Header/>
      <Messages messages={messages} />
      <Input onMessage={sendMessage}/>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 110,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 100
  },
  username: {
    fontSize: 24,
    color: 'grey',
    marginLeft: 15
  }
})

export default Dialog