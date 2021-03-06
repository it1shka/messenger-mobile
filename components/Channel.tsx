import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { arrayRemove, doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { Text, View, Image, TouchableOpacity, Alert } from "react-native"
import Context from "../context"
import { MyUser } from "../types"
import { StackParamList } from "./MainLayout"
import { UserStyles } from "./styles"

const defaultpp = require('../assets/defaultpp.png')

const warning = (name?: string) => `Вы действительно хотите удалить чат с пользователем ${name}?`

type ChatsProp = StackNavigationProp<StackParamList, 'Root'>

const Channel = ({id}: {id: string}) => {
  
  const currentUser = useContext(Context)
  const db = getFirestore()
  const [user, setUser] = useState<MyUser | null>(null)
  const navigation = useNavigation<ChatsProp>()

  useEffect(() => {
    const userRef = doc(db, 'users', id)
    getDoc(userRef).then(snap => {
      if(!snap.exists) return
      const data = snap.data() as MyUser
      setUser(data)
    })
  }, [])

  const handleRemoveChannel = () => {
    const remove = async () => {
      const channelsRef = doc(db, 'engaged', currentUser!.uid)
      await setDoc(channelsRef, {
        channels: arrayRemove(id)
      }, {merge: true})
    }

    Alert.alert('Предупреждение!', warning(user?.displayName), [
      { text: 'Неа', },
      {
        text: 'Да!',
        onPress: remove,
      }
    ])
  }

  const handleChooseChannel = () => {
    navigation.navigate('Dialog', {friend: user!})
  }

  return (
    <TouchableOpacity 
      disabled={!user}
      onLongPress={handleRemoveChannel} 
      onPress={handleChooseChannel}
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

export default Channel