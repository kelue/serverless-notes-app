import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export default function handlers(lambda) {
    return async function ( event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
      let body, statusCode;
  
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {

        console.log(e)

        body = { error: e.message };
        statusCode = 500;
      }
  
      // Return HTTP response
      return {
        statusCode,
        body: JSON.stringify(body),
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Credentials": true,
        // }, //KEEPING THIS HERE INCASE MIDDY IMPLEMENTATION BREAKS 
      };
    };
  }