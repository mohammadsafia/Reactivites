import { User, UserFormValues } from "types";
import { makeAutoObservable } from "mobx";
import agent from "app/api/agent";
import { store } from "app/stores/store";
import { history } from "../../index";

export default class UserStore {
  user: User | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  get isLoggedIn() {
    return !!this.user;
  }
  
  login = async (data: UserFormValues) => {
    try {
      const user = await agent.Account.login(data);
      this.successLogin(user);
    } catch (err) {
      throw err;
    }
  };
  
  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('token');
    this.user = null;
    history.push('/');
  };
  
  setUser = (user: User) => {
    this.user = user;
  };
  
  getUser = async () => {
    try {
      const user = await agent.Account.current();
      this.setUser(user);
    } catch (e) {
      console.log(e);
    }
  };
  
  register = async (data: UserFormValues) => {
    try {
      const user = await agent.Account.register(data);
      this.successLogin(user);
    } catch (err) {
      throw err;
    }
  };
  
  private successLogin = (user: User) => {
    store.commonStore.setToken(user.token);
    this.setUser(user);
    history.push('/activities');
    store.modalStore.closeModal();
  };
}