export const constants = {
  dev_vpcID: 'vpc-0fec090b9337f6b9d',
  dev_ssmNamespace: 'dev-authentication', // ssm parameter store to use
  devEnv: { // for development, use account/region from cdk cli
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  testEnv: { // Test Account
    account: '117923233529',
    region: 'us-east-1',
  },
  repoString: "dudutwizer/authentication-with-skylight",
  repoBranch: "main",
  gitHubConnectionArn: "arn:aws:codestar-connections:us-east-1:117923233529:connection/ad346622-f9a0-4c53-90a2-f6220123678b"
} as const;