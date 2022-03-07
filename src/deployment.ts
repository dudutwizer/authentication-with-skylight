import { aws_ec2, Stack, Stage, StageProps } from "aws-cdk-lib";
import * as skylight from "cdk-skylight";
import { Construct } from "constructs";
import { constants } from "./constants";

export interface IAuthenticationProps extends StageProps {
  ssmNamespace: string;
  vpcId?: string;
  terminationProtection?: boolean;
}

export class Authentication extends Stage {
  readonly awsManagedMicrosoftAd: skylight.authentication.AwsManagedMicrosoftAd;

  constructor(scope: Construct, id: string, props: IAuthenticationProps) {
    super(scope, id, props);

    // TODO: Check if terminationProtection available in CDK Pipelines
    props.terminationProtection = props.terminationProtection ?? false;
    const stateful = new Stack(this, "Stateful", {
      terminationProtection: props.terminationProtection,
    });

    const vpc = props.vpcId
      ? aws_ec2.Vpc.fromLookup(stateful, "Vpc", { vpcId: props.vpcId })
      : new aws_ec2.Vpc(stateful, "Vpc", { maxAzs: 2 });

    this.awsManagedMicrosoftAd =
      new skylight.authentication.AwsManagedMicrosoftAd(
        stateful,
        "AwsManagedMicrosoftAd",
        {
          vpc: vpc,
          domainName: constants.ACTIVE_DIRECTORY_DOMAIN_NAME,
          // TODO: Rename ssmParameters to configurationStore/configurationNamespace or similar
          // TODO: Implement "skylight.authentication.AwsManagedMicrosoftAd.getConfigurationObject(configurationStore, configurationNamespace)"
          ssmParameters: {
            namespace: constants.PROD_SSM_PARAMETER_STORE_NAMESPACE,
          },
        }
      );

    // Move this part to BL Application
    this.awsManagedMicrosoftAd.createADGroup(
      "WebAppHosts",
      "WebApp Authorized Hosts Created by CDK"
    );
  }
}
