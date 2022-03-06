import { aws_ec2, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as skylight from 'cdk-skylight';
import { Construct } from 'constructs';

export interface IAuthenticationComponentProps extends StageProps{
  ssmNamespace: string;
  vpcID? : string;
}

export class AuthenticationComponent extends Stage {
  readonly managedActiveDirectory: skylight.authentication.AdAuthentication;
  constructor(
    scope: Construct,
    id: string,
    props: IAuthenticationComponentProps,
  ) {
    super(scope, id, props);

    const stateful = new Stack(this, 'Stateful', { terminationProtection: true });

    const vpc = props.vpcID ? aws_ec2.Vpc.fromLookup(stateful, 'referenced-vpc', { vpcId: props.vpcID }) : new aws_ec2.Vpc(stateful, 'vpc', { maxAzs: 2 });

    this.managedActiveDirectory = new skylight.authentication.AdAuthentication(
      stateful,
      'auth',
      {
        vpc: vpc,
        domainName: 'skylight.aws',
        ssmParameters: {
          namespace: props.ssmNamespace,
        },
      },
    );
    this.managedActiveDirectory.createADGroup(
      'WebAppHosts',
      'WebApp Authorized Hosts Created by CDK');
  }
}