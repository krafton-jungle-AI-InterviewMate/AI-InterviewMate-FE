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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // TODO: authorizer
    // event.headers

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
      token: tokenResponse.data, // * 10분 동안 유효한 액세스 토큰
      region: "koreacentral"
    };
  }
  catch (e) {
    return {
      statusCode: 401,
      body: JSON.stringify({ data: e }),
    }
  }
};