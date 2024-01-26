import request from "supertest";
import app from "../server.js";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const name = "TestUser1909"
const email = "TestEmail@email.com"

const url = process.env.DB;

const client = new MongoClient(url);

describe("API connection + test content type", () => {
  test("GET /test endpoint", async () => {
    const response = await request(app).get(`/test`);
    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
  });
});

describe("DB connection", () => {
  test("test db connection", async () => {
    await client.connect();
    const db = client.db("CMSBlog");

    const testCollectionName = "Test-collection";
    const testCollection = db.collection(testCollectionName);
    const testData = {_id: name, username: name, email: email}

    await testCollection.insertOne(testData);

    const insertedData = await testCollection.findOne({username: name})
    
    expect(insertedData).toEqual(testData);

    await db.collection(testCollectionName).drop();

    const droppedCollection = await db
      .listCollections({ name: testCollectionName })
      .hasNext();

    expect(droppedCollection).toBeFalsy();

    await client.close();
  });
});