import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import * as uuid from "uuid"
import * as AWS from "aws-sdk"
import * as middy from "middy"
import { cors, httpErrorHandler } from "middy/middlewares"


const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  console.log("Processing event: ", event);
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
})

handler
  .use(
    cors({
      credentials: true,
    })
  )
  .use(httpErrorHandler());
