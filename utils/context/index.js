import { createContext, useReducer } from "react";
import { useRouter } from "next/router";
import { userReducer } from "../reducers";

const URL = process.env.URL;

const UserContext = createContext(null);

export default function GlobalProvider(props) {
  const currentRoute = useRouter().route;
  const [user, dispatchUser] = useReducer(userReducer, {
    isUserLoggedIn: "CHECK",
    homeRoute: true,
    currentRoute: currentRoute,
    URL,
  });
  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext };
