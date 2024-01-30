import { Client, Account, ID } from "appwrite";
import config from "../config/config";
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // API Endpoint
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // console.log("userAccount::", userAccount);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error in auth.js::createAccount ", error.message);
      // throw error;
    }
  }
  async login({ email, password }) {
    try {
      // return await this.account.createEmailSession(email, password);
      const login = await this.account.createEmailSession(email, password);
      // console.log("login", login);
      return login;
    } catch (error) {
      console.log("error in auth.js::login", error.message);
      // throw error;
    }
  }
  async getCurrentUser() {
    try {
      // return await this.account.get()
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("error in auth.js::getCurrentUser", error.message);
      // throw error;
    }
    return null;
  }
  async logout() {
    try {
      //    await this.account.deleteSession('[SESSION_ID]');
      //    const userLoggedOut =await  this.account.deleteSession('[SESSION_ID]');
      const userLoggedOut = await this.account.deleteSessions()
      // console.log("userlogged out:: ", userLoggedOut);
    } catch (error) {
      console.log("error in auth.js::logout", error.message);
      // throw error;
    }
  }
}

const authservice = new AuthService();
export default authservice;
