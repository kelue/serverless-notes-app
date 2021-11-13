const dev = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "serverless-notes-api-dev-attachmentsbucket-1o305ytcv5uxh",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://k0kba3ct0d.execute-api.us-east-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_ZaMZD84YA",
    APP_CLIENT_ID: "4ntia20uv8bk7bng5pvn1ei4f9",
    IDENTITY_POOL_ID: "us-east-2:7827997f-a262-4e8f-9fd2-687fc2fbe60a",
  },
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1i904t99uyi9u",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_m3dpB46HZ",
    APP_CLIENT_ID: "fuindvj7f1ljpa35tp2d7kjrn",
    IDENTITY_POOL_ID: "us-east-1:67cb4bb1-d2b2-49ec-b412-5b7ef2404bcc",
  },
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
