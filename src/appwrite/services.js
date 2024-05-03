import config from "../config/config.js"
import { Client, ID , Storage , Databases , Query } from "appwrite";

export class Services {

    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl) 
        .setProject(config.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createArticle({title,slug,content,featuredImage,status,userId,author}) {
        console.log("create article called");
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,   //  DOCUMENT_ID can also be ID.unique()
                {title,content,featuredImage,status,userId,author} // data to be added to article
            )
        } catch (error) {
            console.log("create article error:: ", error);
        }
    }

    async updateArticle(slug,{title,content,featuredImage,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,   // can also be ID.unique()
                {   // data to be added to post
                    title:title,
                    content,
                    featuredImage,
                    status,
                    
                } 
            )
        } catch (error) {
            console.log("Update article error:: ", error);
        }
    }

    async deleteArticle(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,   // DOCUMENT_ID can also be ID.unique()
            )
            return true
        } catch (error) {
            console.log("Update article error:: ", error);
            return false
        }
    }

    async getArticle(slug) {
        console.log("Get article called. Slug : ", slug);
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,   // DOCUMENT_ID can also be ID.unique()
            )
        } catch (error) {
            console.log("Error fetching article:: ", error);
            return false
        }
    }

    async getAllArticles(queries = [Query.equal('status', ['Active'])]) {
        try {
            console.log("get all articles called");
            //console.log(queries);
            const res = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            return res.documents
        } catch (error) {
            console.log("Fetch all articles error:: ", error);
            return;
        }
    }

//  FILE SERVICES

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("upload file error", error);
            return false
        }
    }

    async delFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Delete file error", error);
            return false
        }
    }

    async getFile(fileId) {
        
        try {
            const res = this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            console.log(res.href);
            return res.href
        } catch (error) {
            console.log("Error getting file", error);
            return false
        }
    }

}

const service = new Services();

export default service