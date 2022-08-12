import * as child_process from 'child_process';

const services = ['bar-service', 'foo-service'];

function latestCommitInDirectory(dirname) {
    return String(child_process.execSync(`git log --pretty=format:%H -n 1 -- ${dirname}`));
}

const serviceVersions = {};

const currentCommit = latestCommitInDirectory('.');

for (const service of services) {
    const version = latestCommitInDirectory(service);

    serviceVersions[service] = version;
}

console.log(currentCommit);
console.log(serviceVersions);
