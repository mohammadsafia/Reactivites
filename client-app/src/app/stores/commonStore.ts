import { ServerError } from "types";
import { makeAutoObservable } from "mobx";

export default class CommonStore {
  error: ServerError | null = null;
  
  constructor() {
    makeAutoObservable(this)
  }
  
  setServerError = (serverError: ServerError)=> {
    this.error = serverError;
  }
  
}