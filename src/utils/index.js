const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

const packageManagerCommands = {
  npm: {
    install: 'npm i -s',
    installDev: 'npm i -D',
  },
  yarn: {
    install: 'yarn add',
    installDev: 'yarn add -D',
  },
  pnpm: {
    install: 'pnpm add',
    installDev: 'pnpm add -D',
  },
};

const choicePackageManager = (engine, config) => {
  const spinner = ora({ spinner: 'dots' });

  try {
    execSync(`git init`, config);
    spinner.succeed(
      `${chalk.greenBright('SUCCESS!')} Initialized empty Git repository in ${
        config.cwd
      }\n`
    );
  } catch (err) {
    spinner.fail(`${err}`);
  }

  spinner.start(chalk.bold.white('Installing dependencies...'));

  try {
    execSync(
      `${packageManagerCommands[engine].install} ${config.dependencies}`,
      config
    );
    spinner.succeed(
      `${chalk.greenBright('SUCCESS!')} Dependencies installed\n`
    );
  } catch (err) {
    spinner.fail(err);
  }

  spinner.start(chalk.bold.white('Installing dev dependencies...'));

  try {
    execSync(
      `${packageManagerCommands[engine].installDev} ${config.devDependencies}`,
      config
    );
    spinner.succeed(
      `${chalk.greenBright('SUCCESS!')} DevDependencies installed\n`
    );
  } catch (err) {
    spinner.fail(err);
  }
};

module.exports = { choicePackageManager };
