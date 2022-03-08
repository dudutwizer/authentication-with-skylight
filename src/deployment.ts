import { aws_ec2, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as skylight from 'cdk-skylight';
import { Construct } from 'constructs';
import { constants } from './constants';

export interface IAuthenticationProps extends StageProps {
  vpcId?: string;
}

export class Authentication extends Stage {
  readonly awsManagedMicrosoftAd: skylight.authentication.AwsManagedMicrosoftAd;

  constructor(scope: Construct, id: string, props: IAuthenticationProps) {
    super(scope, id, props);

    const stateful = new Stack(this, 'Stateful', {});

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
