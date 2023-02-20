import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import HostingStore from "./store/HostingStore";
import DomainStore from "./store/DomainStore";
import ServiceStore from "./store/ServiceStore";
//import  'bootstrap/dist/css/bootstrap.min.css';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        hosting: new HostingStore(),
        domain: new DomainStore(),
        service: new ServiceStore()
    }}>
        <App />
    </Context.Provider>
);

