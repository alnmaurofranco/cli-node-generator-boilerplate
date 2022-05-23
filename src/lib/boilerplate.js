const path = require('path');
const { ncp } = require('ncp');
const { writeFile, mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const { choicePackageManager } = require('../utils');

const boilerplatesVersion = '1.0.0';

const copyProjectFiles = (config, destination) => {
  const prjFolder = `../templates/${config.template}`;
  const source = path.join(__dirname, prjFolder);
  return new Promise((resolve, reject) => {
    ncp.limit = 16;
    ncp(source, destination, { stopOnErr: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const updatePackageJson = async (destination, main) => {
  try {
    const pathName = `${destination}/package.json`;
    let data = require(pathName);

    data.version = boilerplatesVersion;
    data.main = main;
    data.name = path.basename(destination);
    data.author = 'alnmaurofranco';
    data = JSON.stringify(data, null, 2);

    await writeFile(pathName, data);
  } catch (err) {
    throw console.log(err);
  }
};

const downloadNodeModules = (config, destination, engine) => {
  const configOptions = {
    cwd: destination,
    devDependencies: config.devDependencies,
    dependencies: config.dependencies,
  };

  choicePackageManager(engine, configOptions);
};

const generate = async (config, destination, main, engine) => {
  try {
    if (!existsSync(destination)) {
      await mkdir(destination, { recursive: true });
    }
    await copyProjectFiles(config, destination);
    await updatePackageJson(destination, main);
    downloadNodeModules(config, destination, engine);
  } catch (err) {
    throw console.log(err);
  }
};

module.exports = generate;
