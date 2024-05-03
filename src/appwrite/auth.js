import config from "../config/config.js"
import { Client, Account, ID  } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        //  run whenever an instance of class is created
        this.client
        .setEndpoint(config.appwriteUrl) 
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    createAccount = async ({ email , password , name }) => {
        console.log("Create account called");
        try {
            const userAccount = await this.account.create(ID.unique(), email , password , name);
            if(userAccount) {
                // call login if signup successful
                return this.login({ email , password })
            } else {
                return userAccount 
            }
        } catch (error) {
            throw error;
        }
    }

    login = async ({ email , password  }) => {
        console.log("Appwrite Login called");
        try {
            const userAccount =  await this.account.createEmailPasswordSession(email , password)
            if(userAccount) {
                return userAccount
            } else {
                return userAccount 
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getCurrentUser = async () => {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null;
    }

    logout = async () => {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
        return null
    }

    
}

const authService = new AuthService();

export default authService