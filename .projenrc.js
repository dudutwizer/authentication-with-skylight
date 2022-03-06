const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  author: 'Dudu (David) Twizer',
  authorAddress: 'dudut@amazon.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'authentication',
  deps: ['cdk-skylight'] /* Runtime dependencies of this module. */,
  releaseToNpm: false,
});
project.synth();