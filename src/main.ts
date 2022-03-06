import { App, Stack, StackProps, aws_ec2 } from 'aws-cdk-lib';
import * as skylight from 'cdk-skylight';
import { Construct } from 'constructs';
import { constants } from './constants';
export class AuthenticationComponent extends Stack {
  readonly managedActiveDirectory: skylight.authentication.AdAuthentication;
  constructor(
    scope: Construct,
    id: string,
    ssmNamespace: string,
    props: StackProps,
    vpcID? : string,
  ) {
    super(scope, id, props);

    const vpc = vpcID ? aws_ec2.Vpc.fromLookup(this, 'referenced-vpc', { vpcId: vpcID }) : new aws_ec2.Vpc(this, 'vpc', { maxAzs: 2 });

    this.managedActiveDirectory = new skylight.authentication.AdAuthentication(
      this,
      'auth',
      {
        vpc: vpc,
        domainName: 'skylight.aws',
        ssmParameters: {
          namespace: ssmNamespace,
        },
      },
    );
    this.managedActiveDirectory.createADGroup(
      'WebAppHosts',
      'WebApp Authorized Hosts Created by CDK');
  }
}

const app = new App();

new AuthenticationComponent(app, 'auth-dev', constants.dev_ssmNamespace, { env: constants.testEnv });

app.synth();