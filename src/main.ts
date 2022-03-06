import { App } from 'aws-cdk-lib';
import { constants } from './constants';
import { AuthenticationPipeline } from './pipeline';

const app = new App();

new AuthenticationPipeline(app, 'AuthenticationPipe', {
  env: constants.devEnv,
});

app.synth();