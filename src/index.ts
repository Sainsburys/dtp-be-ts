import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import axios from "axios";

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event: APIGatewayProxyEvent
) => {
  const endpoint = event.queryStringParameters["type"];
  if(endpoint === 'tv' || endpoint === 'movie' || endpoint === 'multi') {

  } else {
    return {
      statusCode: 404,
      body: 'Invalid Endpoint: Valid endpoints are "tv", "movie"'
    }
  }
  const searchQuery = event.queryStringParameters["query"];
  const searchResult = await axios.get(
    `https://api.themoviedb.org/3/search/${endpoint}?api_key=c857fa67fba523ad3ce66df18e7ab279&query=${searchQuery}`
  );

  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
    body: JSON.stringify(
      searchResult.data.results.map((responseItemFromTMDB) => {
        // add some logic
        let title = null
        if (responseItemFromTMDB.title) {
           title = responseItemFromTMDB.title
        } else {
           title = responseItemFromTMDB.name
        }
        return {
          title: title,
          id: responseItemFromTMDB.id,
          overview: responseItemFromTMDB.overview,
        }
      })
    ),
  };
};

export default handler;
