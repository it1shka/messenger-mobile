import { arrayUnion, collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { useContext } from "react"
import { useState } from "react"
import { FlatList, View } from "react-native"
import Context from "../context"
import { MyUser } from "../types"
import SearchInput from "./SearchInput"
import SearchResult from "./SearchResult"

function successor(str: string) {
  const beginning = str.slice(0, -1)
  let last = str.charAt(str.length - 1)
  last = String.fromCharCode(last.charCodeAt(0) + 1)
  return beginning + last 
}

const Search = () => {

  const user = useContext(Context)!
  const [contacts, setContacts] = useState<string[]>([])
  const db = getFirestore()
  const channelsRef = doc(db, 'engaged', user.uid)

  const selectUser = (uid: string) => {
    setDoc(channelsRef, {
      channels: arrayUnion(uid)
    }, {merge: true})
  }

  const onQuery = async (queryStr: string) => {
    try {
      setContacts([])
      
      const usersRef = collection(db, 'users')
      const usersQuery = query(
        usersRef,
        where('email', '>=', queryStr),
        where('email', '<', successor(queryStr)) 
      )

      const snapshot = await getDocs(usersQuery)
      const ids = snapshot.docs.map(doc => {
        return (doc.data() as MyUser).uid
      }).filter(uid => uid !== user.uid)

      setContacts(ids)

    } catch {}
  }

  return (
    <View>
      <SearchInput onQuery={onQuery}/>
      <FlatList 
        data={contacts}
        keyExtractor={(item) => item}
        renderItem={({item}) => {
          return <SearchResult select={selectUser} id={item}/>
        }}
      />
    </View>
  )
}

export default Search