import { App } from 'aws-cdk-lib';
import { constants } from '../src/constants';
import { Authentication } from '../src/deployment';
test('AuthenticationComponent', () => {
  const app = new App();
  const stack = new Authentication(app, 'auth-dev-test', {
    vpcId: constants.PROD_VPC_ID,
    env: constants.PROD_ENV,
  });

  expect(stack).toHaveProperty(
    'awsManagedMicrosoftAd.adObject.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
});
