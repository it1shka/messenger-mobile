import { useContext, useState } from "react"
import { FlatList } from "react-native"
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import Context from "../context"
import { useEffect } from "react"
import Channel from "./Channel"

const Chats = () => {

  const user = useContext(Context)!
  const [channels, setChannels] = useState<string[]>([])

  useEffect(() => {
    const db = getFirestore()
    const channelsRef = doc(db, 'engaged', user.uid)
    const unsubscribe = onSnapshot(channelsRef, (doc) => {
      const data = (doc.data()?.channels ?? []) as string[]
      setChannels(data)
    })
    return () => unsubscribe()
  }, [])

  return (
    <FlatList 
      data={channels}
      keyExtractor={(item) => item}
      renderItem={({item}) => {
        return <Channel id={item} />
      }} 
    />
  )
}

export default Chats