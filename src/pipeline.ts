import { pipelines, Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { constants } from './constants';

import { AuthenticationComponent } from './deployment';

export class AuthenticationPipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'pipe', {
      pipelineName: 'authPipe',
      synth: new ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(constants.repoString, constants.repoBranch, {connectionArn: constants.gitHubConnectionArn}),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(new AuthenticationComponent(this, 'auth', {
      ssmNamespace: constants.dev_ssmNamespace,
      env: props?.env,
    }));
  }
}
