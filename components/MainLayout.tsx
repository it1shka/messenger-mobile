import Profile from "./Profile"
import Chats from "./Chats"
import Search from "./Search"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import Dialog from "./Dialog"
import { MyUser } from "../types"

export type StackParamList = {
  Root: undefined
  Dialog: {friend: MyUser}
}

export type DrawerParamList = {
  Profile: undefined
  Chats: undefined
  Search: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()
const Stack = createStackNavigator<StackParamList>()

const MainLayout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" options={{ headerShown: false }} component={DrawerLayout}/>
        <Stack.Screen name="Dialog" component={Dialog} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const DrawerLayout = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" options={{title: 'Профиль'}} component={Profile}/>
      <Drawer.Screen name="Chats" options={{title: 'Чаты'}} component={Chats}/>
      <Drawer.Screen name="Search" options={{title: 'Поиск'}} component={Search} />
    </Drawer.Navigator>
  )
}

export default MainLayout