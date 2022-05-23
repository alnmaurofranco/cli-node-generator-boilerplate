import { say } from 'cfonts';
import chalk from 'chalk';
import path from 'node:path';
import ora from 'ora';
import prompts from 'prompts';

import { version } from '../../package.json';
import { templates } from '../templates'; // defineTemplates
import { generate } from './boilerplate';

type Question = prompts.PromptObject<string>;

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

const initialization = async (option: any, projectName: string, main: any, engine: any) => {
  try {
    const start = Number(new Date());

    spinner.start("Let's get started...\n");

    const destination = `${path.join(process.cwd())}/${projectName || option.template}`;

    await generate(option, destination, main, engine);

    spinner.succeed(
      `${chalk.green('SUCCESS!')} Created ${chalk.cyanBright(projectName)} at ${chalk.cyanBright(destination)}`,
    );

    spinner.info('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.blueBright(`  ${engine === 'yarn' ? 'yarn dev' : 'npm run dev'}`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.blueBright(`  ${engine === 'yarn' ? 'yarn build' : 'npm run build'}`));
    console.log('    Builds the app for production.');
    console.log();
    console.log(chalk.blueBright(`  ${engine === 'yarn' ? 'yarn start' : 'npm run start'}`));
    console.log('    Runs the built app in production mode.\n');
    spinner.info('We suggest that you begin by typing:\n');
    console.log(chalk.bold.cyanBright(`⏩ cd ${projectName}\n`));
    console.log(chalk.bold.cyanBright(`⏩ ${engine === 'yarn' ? 'yarn dev' : 'npm run dev'}\n`));

    const ms = (Number(new Date()) - start) / 1000;
    spinner.succeed(`${chalk.bold.green('DONE!')} Project setup complete in ${chalk.bold.yellowBright(`${ms}s`)}`);
  } catch (err: unknown) {
    const error = err as Error;
    spinner.fail(error.message);
  }
};

(async () => {
  const questions: Question[] = [
    {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of the project? 🤔',
      initial: path.basename(process.cwd()),
      validate: (projectName: string) => {
        if (!RegExp('/^(@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$/').test(projectName)) {
          return 'Invalid project name, please follow npm guidelines';
        }
        return true;
      },
    },
    {
      type: 'select',
      name: 'option',
      message: 'What type of project? 📦',
      validate: (value: number) => {
        if (!(value >= 1 && value <= 2)) {
          return 'Specify number in the range of 1 - 2';
        }
        return true;
      },
      suggest: async (input, choices) => choices.filter((i) => i.value),
      choices: templates.map(({ template, description }, index) => ({
        value: index,
        title: template,
        description,
      })),
    },
    {
      type: 'text',
      name: 'main',
      message: 'What is the path to your express entry point? 🌈',
      initial: 'src/index.js',
    },
    {
      type: 'text',
      name: 'engine',
      message: 'What egine use of project? 📌',
      initial: 'npm',
      validate: (engine: string) => {
        if (!RegExp('/^yarn|npm|pnpm*$/').test(engine)) {
          return 'Specify npm, yarn or pnpm';
        }
        return true;
      },
    },
  ];

  const answers = await prompts(questions, { onCancel });

  if ((answers.option, answers.projectName, answers.main, answers.engine)) {
    initialization(templates[answers.option], answers.projectName, answers.main, answers.engine);
  }
})();
