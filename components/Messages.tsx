import { useEffect } from "react"
import { useRef } from "react"
import { useContext } from "react"
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native"
import Context from "../context"
import { Message } from "../types"
import MessageComponent from "./MessageComponent"

const Messages = ({messages}: {messages: Message[]}) => {

  const user = useContext(Context)!
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    listRef.current?.scrollToEnd({animated: true})
  })

  const renderMessage: ListRenderItem<Message> = ({item}) => {
    return (
      <MessageComponent 
        mine={user.uid === item.author}
        message={item}
      />
    )
  }

  return (
    <FlatList
      ref={listRef}
      style={styles.container}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(_, idx) => idx.toString()}
      ListFooterComponent={<View style={{height: 85}}></View>}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  }
})

export default Messages