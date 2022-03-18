import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handler from "./index";

describe("handler", () => {
  describe("searching for a movie", () => {
    it("returns status 200", async () => {
      const response = (await handler(
        {
          queryStringParameters: {
            query: "fkldsjflk;sadfdlfjf;as",
            type: "movie",
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined
      )) as APIGatewayProxyResult;

      expect(response.statusCode).toBe(200);
    });

    it("returns the expected results", async () => {
      const response = (await handler(
        {
          queryStringParameters: {
            query: "the simpsons",
            type: "movie",
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined
      )) as APIGatewayProxyResult;

      const body = JSON.parse(response.body);
      const expected = {
        id: 35,
        title: "The Simpsons Movie",
        overview:
          "After Homer accidentally pollutes the town's water supply, Springfield is encased in a gigantic dome by the EPA and the Simpsons are declared fugitives.",
      };
      const actual = body.find((m) => m.id == 35);

      expect(actual).toEqual(expected);
    });
  });

  describe("when the user specifies an invalid type", () => {
    it("should return a 404 error", async() => {
      const response = (await handler(
        {
          queryStringParameters: {
            query: "the simpsons",
            type: "wrong",
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined
      )) as APIGatewayProxyResult;

      expect(response.statusCode).toEqual(404)
    })
  })
});
