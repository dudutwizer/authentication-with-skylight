export const constants = {
  dev_vpcID: 'vpc-0fec090b9337f6b9d',
  dev_ssmNamespace: 'dev-authentication', // ssm parameter store to use
  devEnv: { // for development, use account/region from cdk cli
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  testEnv: { // for development, use account/region from cdk cli
    account: '117923233529',
    region: 'us-east-1',
  },
} as const;