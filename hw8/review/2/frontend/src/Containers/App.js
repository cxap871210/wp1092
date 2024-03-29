import "./App.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import SignIn from './SignIn'
import ChatRoom from './ChatRoom'
import { message } from "antd";
const LOCALSTORAGE_KEY = "save-me";

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const {type, msg} = payload
      const content = {
        content: msg,
        duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
          message.error(content)
          break
        default: 
          break
      }
    }
  }
  
  return (
    <div className="App">
      {signedIn ? (<ChatRoom me={me} displayStatus={displayStatus}/>) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />)}
    </div>);
};
export default App;

