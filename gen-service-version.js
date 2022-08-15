const child_process = require('child_process');

const services = ['bar-service', 'foo-service'];

function latestCommitInDirectory(dirname) {
  return String(child_process.execSync(`git log --pretty=format:%H -n 1 ${dirname}`));
}

const serviceVersions = {};

const currentCommit = latestCommitInDirectory('.');

for (const service of services) {
  serviceVersions[service] = latestCommitInDirectory(service);
}

console.log(currentCommit);
console.log(serviceVersions);

let job_strategy_matrix = [];
Object.entries(serviceVersions).forEach(([name, version]) => {
  const skip = version === currentCommit ? 'run' : 'skip';

  console.log(`${name}::${skip}`);
  if (version === currentCommit) {
    job_strategy_matrix.push(name);
  }
});

console.log(`::set-output name=job-strategy-matrix::["${job_strategy_matrix.join('", "')}"]`);
