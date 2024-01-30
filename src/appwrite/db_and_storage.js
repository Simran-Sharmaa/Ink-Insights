import { Client, Databases, Query, ID, Storage } from "appwrite";
import config from "../config/config";

class Service {
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) // Your API Endpoint
        .setProject(config.appwriteProjectId); 
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, content, slug, featuredImage, status,userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite console :: createPost :: ",error);
        }
    }
    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                slug,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            console.log("Appwrite console :: updatePost :: ",error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Appwrite console :: getPost :: ",error);
            return false;
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug);
            return true;
        } catch (error) {
            console.log("Appwrite console :: deletePost :: ",error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
        } catch (error) {
            console.log("Appwrite console :: getPosts :: ",error);
            return false;
        }
    }

    // Upload File
    async uploadFile(file){
        try {
            return await this.storage.createFile(config.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite console :: uploadFile :: ",error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(config.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("Appwrite console :: uploadFile :: ",error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(config.appwriteBucketId,fileId);
    }

}
const service = new Service();
export default service;
