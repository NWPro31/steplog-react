export default class UserStore {
    constructor () {
        this._isAuth = false;
        this._treeview = false;
        this._user = {};
        this._userName = '';
        this._role = '';
        this._users = {};
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    setTreeview(bool){
        this._treeview = bool;
    }

    setUser(user){
        this._user = user;
    }

    setUsers(users){
        this._users = users;
    }

    setRole(role){
        this._role = role;
    }

    setUserName(userName){
        this._userName = userName;
    }

    get user(){
        return this._user;
    }

    get users(){
        return this._users;
    }

    get role(){
        return this._role;
    }

    get userName(){
        return this._userName;
    }
    get isAuth(){
        return this._isAuth;
    }

    get treeview(){
        return this._treeview;
    }

};