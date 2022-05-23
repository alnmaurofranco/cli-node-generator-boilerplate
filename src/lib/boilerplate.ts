/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { ncp } from 'ncp';
import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

import { choicePackageManager } from '../utils';

const boilerplatesVersion = '1.0.0';

const copyProjectFiles = (config: any, destination: string) => {
  const prjFolder = `../../templates/${config.template}`;
  const source = path.join(__dirname, prjFolder);
  return new Promise((reject) => {
    ncp(source, destination, { stopOnErr: true, limit: 16 }, (err) => {
      if (err) {
        reject(err);
      }
    });
  });
};

const updatePackageJson = async (destination: string, main: string) => {
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

const downloadNodeModules = (config: any, destination: string, engine: any) => {
  const configOptions = {
    cwd: destination,
    devDependencies: config.devDependencies,
    dependencies: config.dependencies,
  };

  choicePackageManager(engine, configOptions);
};

export const generate = async (config: any, destination: string, main: string, engine: string) => {
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
