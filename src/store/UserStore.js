export default class UserStore {
    constructor () {
        this._isAuth = false;
        this._user = {};
        this._role = '';
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    setUser(user){
        this._user = user;
    }

    setRole(role){
        this._role = role;
    }

    get user(){
        return this._user;
    }

    get role(){
        return this._role;
    }
    get isAuth(){
        return this._isAuth;
    }

};