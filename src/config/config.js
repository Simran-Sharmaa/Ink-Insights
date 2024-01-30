const config = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
    tinyMceApiKey: String(process.env.REACT_APP_TINY_MCE_API_KEY)
}
export default config