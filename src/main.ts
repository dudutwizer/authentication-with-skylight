import { App } from 'aws-cdk-lib';
import { constants } from './constants';
import { Authentication } from './deployment';
import { Toolchain } from './toolchain';

const app = new App();

// Development stage
new Authentication(app, `${constants.APP_NAME}-Dev`, {
  // TODO: Rename ssmNamespace to configurationStore/configurationNamespace or similar
  env: constants.DEV_ENV,
});

// Continuous deployment
new Toolchain(app, `${constants.APP_NAME}-Toolchain`, {
  env: constants.TOOLCHAIN_ENV,
});

app.synth();
