import 'react-native-gesture-handler'
import './firebase.config'
import {getAuth, onAuthStateChanged, User} from 'firebase/auth'
import { useState } from 'react'
import Context from './context'

import SignIn from "./components/SignIn"
import MainLayout from './components/MainLayout'


const App = () => {
  const [user, setUser] = useState<User | null>(null)

  const auth = getAuth()
  onAuthStateChanged(auth, user => {
    setUser(user)
  })

  return (
    <Context.Provider value={user}>
      {user ? <MainLayout /> : <SignIn />}
    </Context.Provider>
  )
}

export default App