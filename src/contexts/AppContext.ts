import { createContext, Dispatch, SetStateAction } from "react";
import { AuthorizeResult } from "react-native-app-auth";
import { UserData } from "store/interfaces/SpotifyInterfaces";

interface ContextProps {
  user: UserData | null,
  auth: AuthorizeResult | null,
  setUser: Dispatch<SetStateAction<UserData | null>>
  setAuth: Dispatch<SetStateAction<AuthorizeResult | null>>
}

const AppContext = createContext<ContextProps> ({
  user: null,
  auth: null,
  setUser: () => null,
  setAuth: () => null
})

export default AppContext;