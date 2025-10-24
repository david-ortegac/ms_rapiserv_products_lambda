import { Context } from 'aws-lambda';

export const handler = async (event: any, context: Context) => {
   console.log("event", event);
   console.log("context", context);
   return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' })
   }
};