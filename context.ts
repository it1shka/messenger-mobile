import { createContext } from "react"
import type { User } from 'firebase/auth'
const Context = createContext<User | null>(null)
export default Context