import handlers from "../../helpers/handlerLib"
import dynamoDb from "../../helpers/dynamoDb"
import * as middy from "middy"
import { cors, httpErrorHandler } from "middy/middlewares"


export const handler = middy (handlers(async (event) => {
    const user = event.requestContext.identity.cognitoIdentityId
  const params = {
    TableName: process.env.NOTES_TABLE,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": user,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
}));

handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());