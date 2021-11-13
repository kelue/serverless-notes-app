import handlers from "../../helpers/handlerLib";
import dynamoDb from "../../helpers/dynamoDb";
import * as middy from "middy"
import { cors, httpErrorHandler } from "middy/middlewares"

export const handler = middy ( handlers (async (event) => {
    const user = event.requestContext.identity.cognitoIdentityId
  const params = {
    TableName: process.env.NOTES_TABLE,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: user, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
}));

handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());