// index.mjs
import aws from 'aws-sdk';
import axios from 'axios';
/*
Use the following code to retrieve configured secrets from SSM:

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["AZURE_SECRET_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AZURE_STT_API
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
    const { Parameters } = await (new aws.SSM())
      .getParameters({
        Names: ["AZURE_SECRET_KEY"].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();

    const headers = { 
      headers: {
          "Ocp-Apim-Subscription-Key": Parameters[0].Value,
          "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const tokenResponse = await axios.post(`https://koreacentral.api.cognitive.microsoft.com/sts/v1.0/issuetoken`, null, headers);

    return {
      statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({ token: tokenResponse.data, region: "koreacentral" }),
    };

    // return {
    //   statusCode: 200,
    // //  Uncomment below to enable CORS requests
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "*"
    // }, 
    //     body: JSON.stringify('test!'),
    // };
  }
  catch (e) {
    return {
      statusCode: 401,
      body: JSON.stringify({ data: e }),
    }
  }
};