import 'react-native-gesture-handler'
import './firebase.config'
import { Provider, useDispatch } from "react-redux"
import { AppDispatch, AppState, store } from './store'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useSelector } from 'react-redux'

import SignIn from "./components/SignIn"
import MainLayout from './components/MainLayout'
import { setUser } from './store/actions/main.actions'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: AppState) => state.main.user)
  const auth = getAuth()
  onAuthStateChanged(auth, user => {
    dispatch(setUser(user))
  })

  return (
    <>
      {user ? <MainLayout /> : <SignIn />}
    </>
  )
}

export default function() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}