import React, {useContext, useEffect} from "react";
import {useTransition, animated} from "react-spring";
import AppRouter from "./components/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {Context} from ".";
import {observer} from "mobx-react-lite";
import HomeHeader from "./components/HomeHeader";

const App = observer(() => {
    const {user} = useContext(Context);
    useEffect(() => {
        user.setIsAuth(true);
    },[]);


  return (
            <Router>
                <HomeHeader/>
                <AppRouter/>
            </Router>
  );
});

export default App;
