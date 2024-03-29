import { rest } from "msw";
import { setupServer } from "msw/node";

import usersData from "../../data/usersData";
import CreateUserInput from "../../../types/CreateUserInput";
import User from "../../../types/User";
import { testURL } from "../../../common/common";

export const access_token = "test-access-token";

export const handlers = [
  rest.get(`${testURL}/users`, (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),

  rest.post(`${testURL}/users/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      return res(
        ctx.json(access_token + "_" + foundUser._id)
      );
    } else {
      ctx.status(401);
      return res(ctx.json("Cannot authenticate user"));
    }
  }),

  rest.post(`${testURL}/users/register`, async (req, res, ctx) => {
    const inputData: CreateUserInput = await req.json();
    const role = "USER";
    if (inputData) {
      const newUser: User = {
        _id: String(usersData.length) + "1",
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
        role: role,
      };
      usersData.push(newUser);
      return res(ctx.json(newUser));
    } else {
      ctx.json({
        message: "Unexpected token } in JSON at position 87",
        error: "Bad Request",
        statusCode: 400,
      });
    }
  }),
];

const usersServer = setupServer(...handlers);
export default usersServer;
