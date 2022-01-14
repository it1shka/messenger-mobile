import Profile from "./Profile"
import Chats from "./Chats"
import Search from "./Search"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

const Drawer = createDrawerNavigator()

const MainLayout = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Профиль" component={Profile}/>
        <Drawer.Screen name="Чаты" component={Chats}/>
        <Drawer.Screen name="Поиск" component={Search} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


export default MainLayout