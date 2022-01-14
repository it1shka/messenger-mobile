import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { Button, StyleSheet, Text, View } from "react-native"
import * as GoogleAuth from 'expo-google-app-auth'

const SignIn = () => {

  const handleSignIn = async () => {
    const config: GoogleAuth.GoogleLogInConfig = {
      androidClientId: '970576399247-jti0ss80iujqfe6ioj2n0nu7knd2gghm.apps.googleusercontent.com'
    }
    const result = await GoogleAuth.logInAsync(config)
    if(result.type !== 'success') return
    const auth = getAuth()
    const {idToken, accessToken} = result
    const credential = GoogleAuthProvider.credential(idToken, accessToken)
    signInWithCredential(auth, credential)
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>Войти с Google!</Text>
      <Button title="Войти!" onPress={handleSignIn}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SignIn