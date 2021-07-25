#! /usr/bin/env node

const { join, basename } = require('path');
const { prompt } = require('prompts');
const { say } = require('cfonts');
const ora = require('ora');
const chalk = require('chalk');
const options = require('../options');
const generate = require('./boilerplate');
const { version } = require('../../package.json');

say('GNB CLI!', {
  font: 'block',
  align: 'center',
  colors: ['greenBright'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  maxLength: '0',
  gradient: false,
  independentGradient: false,
  transitionGradient: true,
  env: 'node',
});

say(`Version ${version} - By AlanM Franco`, {
  font: 'console',
  align: 'center',
  colors: ['white'],
  background: 'transparent',
  env: 'node',
});

const spinner = ora({ spinner: 'dots' });

const onCancel = () => {
  spinner.fail(`${chalk.bold.red('FAILED!')} Project creation failed!`);
};

const initialization = async (option, projectName, main, engine) => {
  try {
    const start = new Date();

    spinner.start(`Let's get started...\n`);

    const destination = `${join(process.cwd())}/${
      projectName || option.template
    }`;

    await generate(option, destination, main, engine);

    spinner.succeed(
      `${chalk.green('SUCCESS!')} Created ${chalk.cyanBright(
        projectName
      )} at ${chalk.cyanBright(destination)}`
    );

    spinner.info('Inside that directory, you can run several commands:');
    console.log();
    console.log(
      chalk.blueBright(`  ${engine === 'yarn' ? 'yarn dev' : 'npm run dev'}`)
    );
    console.log('    Starts the development server.');
    console.log();
    console.log(
      chalk.blueBright(
        `  ${engine === 'yarn' ? 'yarn build' : 'npm run build'}`
      )
    );
    console.log('    Builds the app for production.');
    console.log();
    console.log(
      chalk.blueBright(
        `  ${engine === 'yarn' ? 'yarn start' : 'npm run start'}`
      )
    );
    console.log('    Runs the built app in production mode.\n');
    spinner.info(`We suggest that you begin by typing:\n`);
    console.log(chalk.bold.cyanBright(`⏩ cd ${projectName}\n`));
    console.log(
      chalk.bold.cyanBright(
        `⏩ ${engine === 'yarn' ? 'yarn dev' : 'npm run dev'}\n`
      )
    );

    const ms = (new Date() - start) / 1000;
    spinner.succeed(
      `${chalk.bold.green(
        'DONE!'
      )} Project setup complete in ${chalk.bold.yellowBright(`${ms}s`)}`
    );
  } catch (error) {
    spinner.fail(error);
  }
};

(async () => {
  const questions = [
    {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of the project? 🤔',
      initial: basename(process.cwd()),
      validate: (projectName) =>
        /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
          projectName
        )
          ? true
          : 'Invalid project name, please follow npm guidelines',
    },
    {
      type: 'select',
      name: 'option',
      message: 'What type of project? 📦',
      validate: (value) =>
        value >= 1 && value <= 2
          ? true
          : 'Specify number in the range of 1 - 2',
      suggest: (input, choices) => choices.filter((i) => i.value),
      choices: options.map((el, index) => ({
        value: index,
        title: el.template,
        description: el.description,
      })),
      fallback: {
        title: 'Using default',
        value: 1,
      },
    },
    {
      type: 'text',
      name: 'main',
      message: 'What is the path to your express entry point? 🌈',
      initial: 'src/index.js',
      fallback: {
        title: 'Using default',
        value: 'src/index.js',
      },
    },
    {
      type: 'text',
      name: 'engine',
      message: 'What egine (yarn or npm) use of project? 📌',
      initial: 'npm',
      validate: (engine) =>
        /^yarn|npm*$/.test(engine)
          ? true
          : 'Invalid engine, please digit yarn or npm.',
    },
  ];

  const answers = await prompt(questions, { onCancel });

  if ((answers.option, answers.projectName, answers.main, answers.engine)) {
    initialization(
      options[answers.option],
      answers.projectName,
      answers.main,
      answers.engine
    );
  }
})();
