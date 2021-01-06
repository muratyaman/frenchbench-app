require('dotenv').config();
const { spawn } = require('child_process');
const package = require('./package.json');

const { version } = package;

const bucket = 'frenchbench-app';
const source = './build';
const destination = 's3://'+ bucket + '/v/' + version;

const cmd = 'aws';
const options = ['s3', 'sync', source, destination, '--acl', 'public-read'];

const awsS3Sync = spawn(cmd, options);

awsS3Sync.stdout.on('data', (data) => {
  console.log(`${data}`);
});

awsS3Sync.stderr.on('data', (data) => {
  console.error(`aws error: ${data}`);
});

awsS3Sync.on('close', (code) => {
  if (code) { // error if not 0
    console.log(`aws exited with error code: ${code}`);
  } else {
    console.log('aws exited successfully!');
  }
});
