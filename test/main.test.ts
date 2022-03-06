import { App } from 'aws-cdk-lib';
import { constants } from '../src/constants';
import { AuthenticationComponent } from '../src/main';
test('AuthenticationComponent', () => {
  const app = new App();
  const stack = new AuthenticationComponent(app, 'auth-dev', constants.dev_ssmNamespace, { env: constants.testEnv });

  expect(stack).toHaveProperty(
    'managedActiveDirectory.adObject.cfnResourceType',
    'AWS::DirectoryService::MicrosoftAD',
  );
});