import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import './App.css' */
import MapPage from './Map';
import SignInPage from './Signin';
import SignUpPage from './Signup';
import { UserDataProvider } from "./userContext";


function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
          <Routes>
            <Route path="/" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
      </UserDataProvider>
    </BrowserRouter>
  )
}

export default App
