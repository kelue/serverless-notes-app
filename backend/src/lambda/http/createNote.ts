import handlers from "../../helpers/handlerLib"
import * as uuid from "uuid/dist"
import dynamoDb  from "../../helpers/dynamoDb"
import * as middy from "middy"
import { cors, httpErrorHandler } from "middy/middlewares"

export const handler = middy( handlers(async (event) => {
    
  const data = JSON.parse(event.body);
  const user = event.requestContext.identity.cognitoIdentityId
  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: {
      // The attributes of the item to be created
      userId: user, // The id of the author
      noteId: uuid.v1(), // Provides a unique uuid for the notes
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: new Date().toISOString(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
}));

//couldn't figure out a way to work middy into the code
handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());
