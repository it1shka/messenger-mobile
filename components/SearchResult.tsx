import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useState, useEffect } from "react"
import { View, TouchableOpacity, Image, Text } from "react-native"
import { MyUser } from "../types"
import { UserStyles } from "./styles"

const defaultpp = require('../assets/defaultpp.png')

const SearchResult = ({id, select}: {id: string, select: (id: string) => void}) => {

  const db = getFirestore()
  const [user, setUser] = useState<MyUser | null>(null)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const userRef = doc(db, 'users', id)
    getDoc(userRef).then(snap => {
      if(!snap.exists) return
      const data = snap.data() as MyUser
      setUser(data)
    })
  }, [])

  const handleChoose = () => {
    select(id)
    setSelected(true)
  }

  if(selected) return (
    <View style={UserStyles.container}>
      <Image 
        style={UserStyles.profilePicture}
        source={user ? {uri: user.photoURL} : defaultpp}
      />
      <Text style={{fontSize: 24, marginLeft: 15, color: 'grey'}}>Добавлен!</Text>
    </View>
  )

  return (
    <TouchableOpacity 
      disabled={!user}
      onPress={handleChoose}
      style={UserStyles.container}
    >
      <Image 
        style={UserStyles.profilePicture}
        source={user ? {uri: user.photoURL} : defaultpp}
      />
      <View style={{marginLeft: 15}}>
        <Text style={{fontSize: 18}}>{user?.displayName ?? 'Неизвестен'}</Text>
        <Text style={{color: 'grey'}}>{user?.email ?? 'Неизвестно'}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchResult