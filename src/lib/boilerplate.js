const path = require('path');
const { execSync } = require('child_process');
const { ncp } = require('ncp');
const { writeFile, mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const chalk = require('chalk');
const ora = require('ora');

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
  const options = { cwd: destination };
  const spinner = ora({ spinner: 'dots' });

  if (engine === 'yarn') {
    // YARN - Yarn Package Manager
    try {
      execSync(`git init`, options);
      spinner.succeed(
        `${chalk.greenBright(
          'SUCCESS!'
        )} Initialized empty Git repository in ${destination}\n`
      );
    } catch (err) {
      spinner.fail(`${err}`);
    }

    spinner.start(chalk.bold.white('Installing dependencies...'));
    try {
      execSync(`yarn add ${config.dependencies}`, options);
      spinner.succeed(
        `${chalk.greenBright('SUCCESS!')} Dependencies installed\n`
      );
    } catch (err) {
      spinner.fail(err);
    }

    spinner.start(chalk.bold.white('Installing dev dependencies...'));
    try {
      execSync(`yarn add -D ${config.devDependencies}`, options);
      spinner.succeed(
        `${chalk.greenBright('SUCCESS!')} DevDependencies installed\n`
      );
    } catch (err) {
      spinner.fail(err);
    }
  } else {
    // NPM - Node Package Manager
    try {
      execSync(`git init`, options);
      spinner.succeed(
        `${chalk.greenBright(
          'SUCCESS!'
        )} Initialized empty Git repository in ${destination}\n`
      );
    } catch (err) {
      spinner.fail(`${err}`);
    }

    spinner.start(chalk.bold.white('Installing dependencies...'));
    try {
      execSync(`npm i -s ${config.dependencies}`, options);
      spinner.succeed(
        `${chalk.greenBright('SUCCESS!')} Dependencies installed\n`
      );
    } catch (err) {
      spinner.fail(err);
    }

    spinner.start(chalk.bold.white('Installing dev dependencies...'));
    try {
      execSync(`npm i -D ${config.devDependencies}`, options);
      spinner.succeed(
        `${chalk.greenBright('SUCCESS!')} DevDependencies installed\n`
      );
    } catch (err) {
      spinner.fail(err);
    }
  }
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
