import conf from "../conf/conf";
import { Client, Storage, TablesDB } from "appwrite";

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
}

const dbservice = new DBService();
export default dbservice;
