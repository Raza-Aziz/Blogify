import conf from "../conf/conf";
import { Client, Storage, TablesDB, Query, ID } from "appwrite";

export class DBService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setEndpoint(conf.appwriteProjectId);

    this.database = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ userId, title, slug, featuredImage, status, content }) {
    try {
      return await this.database.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title: title,
          featuredImage: featuredImage,
          status: status,
          content: content,
          userId: userId,
        },
      });
    } catch (error) {
      console.error("Blog creation failed :", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        },
      );
    } catch (error) {
      console.error("Blog Update failed :", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error("Blog deletion failed :", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("getPost error :", error);
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.database.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: queries,
      });
    } catch (error) {
      console.error("getAllPosts error :", error);
    }
  }

  // File services
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.error("Appwrite service :: File upload :: error :", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: File Delete :: error :", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: File Delete :: error :", error);
    }
  }
}

const dbservice = new DBService();
export default dbservice;
