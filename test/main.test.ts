import { App } from 'aws-cdk-lib';
import { constants } from '../src/constants';
import { AuthenticationComponent } from '../src/deployment';
test('AuthenticationComponent', () => {
  const app = new App();
  const stack = new AuthenticationComponent(app, 'auth-dev-test', {
    ssmNamespace: constants.dev_ssmNamespace,
    vpcID: constants.dev_vpcID,
    env: constants.testEnv,
  });

  expect(stack).toHaveProperty(
    'managedActiveDirectory.adObject.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
});