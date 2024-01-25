import request from "supertest";
import app from "../server.js";
import * as dotenv from "dotenv";

var name = "TestUser1909"
var password = "SafePassword1909#"
var email = "TestEmail@email.com"

describe("CMS API user requests", () => {

  test("[/user/register] Register user", async () => {
    const response = await request(app).post(
      `/user/register/`
    ).send({username: name, password: password, email: email});
    expect(response.statusCode).toBe(201);
    expect(response.type).toBe("application/json");
  });

    test("[/user/getUser/] Check if user exist", async () => {
      const response = await request(app).get(
        `/user/getUser/${name}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("[/user/getUserList/] Check endpoint with correct data", async () => {
      const response = await request(app).get(
        `/user/getUserList/1`
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("[/user/login/] Check if user login endpoint works", async () => {
      const response = await request(app).post(
        `/user/login/`
      ).send({username: name, password: password});
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("[/user/deleteUser/] Delete test user", async () => {
      const response = await request(app).delete(
        `/user/deleteUser/`
      ).send({username: name});
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

  });