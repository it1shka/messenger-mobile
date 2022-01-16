import { StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  }
})

export const UserStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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