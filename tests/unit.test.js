import request from "supertest";
import app from "../server.js";

const name = "TestUser1909"
const password = "SafePassword1909#"
const email = "TestEmail@email.com"
const configType = "Global"
const pageName = "Home"

describe("CMS API user requests", () => {

  test("[/user/register] Register user with incorrect data", async () => {
    const response = await request(app).post(
      `/user/register/`
    ).send({username: "name", password: "password", email: "email"});
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
  });

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

    test("[/user/getUserList/] Check endpoint with empty data", async () => {
      const response = await request(app).get(
        `/user/getUserList/`
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

    test("[/user/login/] Check login endpoint with incorrect data", async () => {
      const response = await request(app).post(
        `/user/login/`
      ).send({username: "name", password: "password"});
      expect(response.statusCode).toBe(401);
      expect(response.type).toBe("application/json");
    });
    
    test("[/user/lockUser/:username] Check if locking user works", async () => {
      const response = await request(app).post(
        `/user/lockUser/${name}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("[/user/login/] Check if blocked user can log in", async () => {
      const response = await request(app).post(
        `/user/login/`
      ).send({username: name, password: password});
      expect(response.statusCode).toBe(401);
      expect(response.type).toBe("application/json");
    });

    test("[/user/unlockUser/:username] Check if unlocking user works", async () => {
      const response = await request(app).post(
        `/user/unlockUser/${name}`
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

    test("[/user/getAllRoles] Check all roles", async () => {
      const response = await request(app).get(
        `/user/getAllRoles`
      );
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

describe("CMS API page requests", () => {
  test("[/page/getConfig/:configId] Check getConfig endpoint with correct data", async () => {
    const response = await request(app).get(
      `/page/getConfig/${configType}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });

  test("[/page/getConfig/:configId] Check getConfig endpoint with incorrect data", async () => {
    const response = await request(app).get(
      `/page/getConfig/asdsa`
    );
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("[/page/getPage/:pageName] Check getPage endpoint with correct data", async () => {
    const response = await request(app).get(
      `/page/getPage/${pageName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("[/page/getPage/:pageName] Check getPages endpoint", async () => {
    const response = await request(app).get(
      `/page/getPages`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });

  test("[/page/getPage/:pageName] Check getPage endpoint with incorrect data", async () => {
    const response = await request(app).get(
      `/page/getPage/ersafs`
    );
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("[/page/getArticles/:number?] Check getArticles endpoint with correct data", async () => {
    const response = await request(app).get(
      `/page/getArticles/1`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });

  test("[/page/getArticles/:number?] Check getArticles endpoint with incorrect data", async () => {
    const response = await request(app).get(
      `/page/getArticles/asd`
    );
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
  });
  
});