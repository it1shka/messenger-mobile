import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { MyUser } from "../types"

const defaultpp = require('../assets/defaultpp.png')

const Channel = ({id}: {id: string}) => {
  
  const [user, setUser] = useState<MyUser | null>(null)

  useEffect(() => {
    const db = getFirestore()
    const userRef = doc(db, 'users', id)
    getDoc(userRef).then(snap => {
      if(!snap.exists) return
      const data = snap.data() as MyUser
      setUser(data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Image 
        style={styles.profilePicture}
        source={user ? {uri: user.photoURL} : defaultpp}
      />
      <View style={{marginLeft: 15}}>
        <Text style={{fontSize: 18}}>{user?.displayName ?? 'Неизвестен'}</Text>
        <Text style={{color: 'grey'}}>{user?.email ?? 'Неизвестно'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,

    backgroundColor: 'white',
    borderRadius: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100,
  }
})

export default Channel