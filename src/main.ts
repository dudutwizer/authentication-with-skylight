import { App } from 'aws-cdk-lib';
import { constants } from './constants';
import { Authentication } from './deployment';
import { Toolchain } from './toolchain';

// TODO: Format long lines in all project files
const app = new App();

// Development stage
new Authentication(app, `${constants.APP_NAME}-Dev`, {
  // TODO: Rename ssmNamespace to configurationStore/configurationNamespace or similar
  ssmNamespace: constants.PROD_SSM_PARAMETER_STORE_NAMESPACE,
  env: constants.DEV_ENV,
})

// Continuous deployment
new Toolchain(app, `${constants.APP_NAME}-Toolchain`, {
  env: constants.TOOLCHAIN_ENV,
});

app.synth();
