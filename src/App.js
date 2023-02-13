import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {Context} from ".";
import {observer} from "mobx-react-lite";
import HomeHeader from "./components/HomeHeader";
import {check} from "./http/userAPI";


const App = observer(() => {
    const {user} = useContext(Context);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false)).catch(e => {
            if(e.response.status === 401) {
                user.setIsAuth(false);
                user.setUser({});
            }
        });
    },[]);

    if(loading) {
        return(
            <div>Spinner</div>
        );
    }

  return (
            <Router>
                <AppRouter/>
            </Router>
  );
});

export default App;
