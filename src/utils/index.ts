import chalk from 'chalk';
import { execSync } from 'node:child_process';
import ora from 'ora';

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

type PackageManager = keyof typeof packageManagerCommands;

export const choicePackageManager = (engine: PackageManager, config: any) => {
  const spinner = ora({ spinner: 'dots' });

  try {
    execSync('git init', config);
    spinner.succeed(`${chalk.greenBright('SUCCESS!')} Initialized empty Git repository in ${config.cwd}\n`);
  } catch (err: unknown) {
    const error = err as Error;
    spinner.fail(error.message);
  }

  spinner.start(chalk.bold.white('Installing dependencies...'));

  try {
    execSync(`${packageManagerCommands[engine].install} ${config.dependencies}`, config);
    spinner.succeed(`${chalk.greenBright('SUCCESS!')} Dependencies installed\n`);
  } catch (err: unknown) {
    const error = err as Error;
    spinner.fail(error.message);
  }

  spinner.start(chalk.bold.white('Installing dev dependencies...'));

  try {
    execSync(`${packageManagerCommands[engine].installDev} ${config.devDependencies}`, config);
    spinner.succeed(`${chalk.greenBright('SUCCESS!')} DevDependencies installed\n`);
  } catch (err: unknown) {
    const error = err as Error;
    spinner.fail(error.message);
  }
};
