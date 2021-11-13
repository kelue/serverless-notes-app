import handlers from "../../helpers/handlerLib"
import dynamoDb from "../../helpers/dynamoDb"
import * as middy from "middy"
import { cors, httpErrorHandler } from "middy/middlewares"

export const handler = middy( handlers(async (event) => {
  const params = {
    TableName: process.env.NOTES_TABLE,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
}));

handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());