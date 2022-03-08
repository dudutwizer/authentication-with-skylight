import { aws_ec2, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as skylight from '../src';
import { Construct } from 'constructs';
import { constants } from './constants';

export interface IAuthenticationProps extends StageProps {
  vpcId?: string;
  terminationProtection?: boolean;
}

export class Authentication extends Stage {
  readonly awsManagedMicrosoftAd: skylight.authentication.AwsManagedMicrosoftAd;

  constructor(scope: Construct, id: string, props: IAuthenticationProps) {
    super(scope, id, props);

    // TODO: Check if terminationProtection available in CDK Pipelines
    props.terminationProtection = props.terminationProtection ?? false;
    const stateful = new Stack(this, 'Stateful', {
      terminationProtection: props.terminationProtection,
    });

    const vpc = props.vpcId
      ? aws_ec2.Vpc.fromLookup(stateful, 'Vpc', { vpcId: props.vpcId })
      : new aws_ec2.Vpc(stateful, 'Vpc', { maxAzs: 2 });

    this.awsManagedMicrosoftAd =
      new skylight.authentication.AwsManagedMicrosoftAd(
        stateful,
        'AwsManagedMicrosoftAd',
        {
          vpc: vpc,
          domainName: constants.ACTIVE_DIRECTORY_DOMAIN_NAME,
          createWorker: true,
        }
      );
  }
}
