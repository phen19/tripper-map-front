import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

const USER_DATA = "user_data";

function UserDataProvider(props) {
  const [userData, setUserData] = useState(
    () => JSON.parse(window.localStorage.getItem(USER_DATA)) || null
  );

  return (
    <UserDataContext.Provider value={[userData, setUserData]} {...props} />
  );
}

function saveUserDataInLocalStorage(userData) {
  window.localStorage.setItem(USER_DATA, JSON.stringify(userData));
}

function deleteUserDataInLocalStorage() {
  window.localStorage.removeItem(USER_DATA);
}

function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataContext");
  }
  return context;
}

export {
  UserDataProvider,
  useUserData,
  saveUserDataInLocalStorage,
  deleteUserDataInLocalStorage,
};
