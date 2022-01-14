import { getAuth, signOut } from "firebase/auth"
import { useContext } from "react"
import { StyleSheet, Text, View, Button, Image } from "react-native"
import Context from "../context"

const defaultpp = require('../assets/defaultpp.png')

const Profile = () => {
  const auth = getAuth()
  const user = useContext(Context)
  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.profilePicture} source={user?.photoURL ? {uri: user.photoURL} : defaultpp} />
      <Text style={{fontSize: 18}}>{user?.displayName ?? 'Нет имени'}</Text>
      <Text>{user?.email ?? 'Нет почты'}</Text>
      <Button title="Выйти" onPress={handleSignOut}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  }
})

export default Profile