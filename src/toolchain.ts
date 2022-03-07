import { pipelines, Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { constants } from './constants';

import { Authentication } from './deployment';

export class Toolchain extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const codepipeline = new pipelines.CodePipeline(this, 'CodePipeline', {
      synth: new ShellStep('ShellStep', {
        input: pipelines.CodePipelineSource.connection(
          `${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO_NAME}`,
          constants.GITHUB_REPO_BRANCH,
          { connectionArn: constants.GITHUB_CONNECTION_ARN }
        ),
        commands: ['npm install', 'npm run build', 'npx cdk synth'],
      }),
    });

    const authentication = new Authentication(
      this,
      `${constants.APP_NAME}-Prod`,
      {
        // TODO: Rename ssmNamespace to configurationStore/configurationNamespace or similar
        ssmNamespace: constants.PROD_SSM_PARAMETER_STORE_NAMESPACE,
        vpcId: constants.PROD_VPC_ID,
        terminationProtection: constants.PROD_TERMINATION_PROTECTION,
        env: constants.PROD_ENV,
      }
    );

    codepipeline.addStage(authentication);
  }
}
