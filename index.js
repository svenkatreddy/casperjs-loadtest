const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));
const debug = require('debug')('casperjs-loadtest');
const perf = require('execution-time')();

const file = argv.file;
const samples = argv.s || 1;
const concurrency = argv.c || 1;

if(!file) {
  return new Error('cannot find --file option');
}

if(!samples) {
  debug('no sample is specified, using 1 as default')
}

if(!concurrency) {
  debug('no concurrency is specified, using 1 as default')
}


const cmdToExecute = 'casperjs --ignore-ssl-errors=yes '+ file;
const metrics = {};
let samplesCount = 0;
let concurrentCount = 0;

const executeTheCommand = function(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, function(error, stdout, stderr) {
      concurrentCount += 1;
      debug(`sample: ${samplesCount}`);
      debug(`concurrent: ${concurrentCount}`);
      if(stderr) reject(stderr);
      if(error) reject(error);
      resolve(stdout);
    });
  });   
};

const doAnotherSample = () => {
  if(samplesCount < samples) {
    doConcurrency();
    samplesCount += 1;
  }
};

const doConcurrency = () => {
  const promisesArray = [];

  for(const i=0; i<concurrency; i += 1) {
    promisesArray.push(
      executeTheCommand(cmdToExecute)
    );
  }

  concurrentCount = 0;
  Promise.all(promisesArray)
  .then(values => { 
    debug(values);
    doAnotherSample();
  })
  .catch(error => {
    debug(error);
    doAnotherSample();
  });
};

doAnotherSample();