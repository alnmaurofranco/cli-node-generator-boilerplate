#! /usr/bin/env node

const { join, basename } = require("path");
const { prompt } = require("prompts");
const generate = require("./boilerplate");
const options = require('../options');
const chalk = require('chalk')
const { say } = require('cfonts')

say('GNB CLI!', {
	font: 'block',
	align: 'center',
	colors: ['greenBright'],
	background: 'transparent',
	letterSpacing: 1,
	lineHeight: 1,
	space: true,
	maxLength: '0',
	gradient: false,
	independentGradient: false,
	transitionGradient: true,
	env: 'node'
});

const onCancel = () => {
  console.log(chalk.bold.redBright("🚨❌ Project creation failed! 🚨❌"));
};

const initialization = async (option, projectName, engine) => {
  try {
    const start = new Date;

    const destination = `${join(process.cwd())}/${
      projectName || option.template
    }`;

    await generate(option, destination);
    console.log(chalk.bold.greenBright(`✅ Project setup complete! at ${destination}`));

    console.log(`cd ${destination}`)
    console.log(`${engine === 'yarn' ? 'yarn install' : 'npm i'}`)

    const ms = (new Date - start) / 1000;
    console.log(chalk.bold.greenBright(`\n🟢 All done! in ${ms}s 🟢`))
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const questions = [
    {
      type: "text",
      name: "projectName",
      message: "What is the name of the project? 🤔",
      initial: basename(process.cwd()),
      validate: (projectName) =>
        /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
          projectName
        )
          ? true
          : "Invalid project name, please follow npm guidelines",
    },
    {
      type: "select",
      name: "option",
      message: "What type of project? 📦",
      validate: (value) =>
        value >= 1 && value <= 2
          ? true
          : "Specify number in the range of 1 - 2",
      suggest: (input, choices) => choices.filter((i) => i.value),
      choices: options.map((el, index) => ({
        value: index,
        title: el.template,
        description: el.description,
      })),
      fallback: {
        title: "Using default",
        value: 1,
      },
    },
    {
      type: "select",
      name: "engine",
      message: "What egine of project? 📌",
      validate: (value) =>
        value >= 1 && value <= 2
          ? true
          : "Specify number in the range of 1 - 2",
      suggest: (input, choices) => choices.filter((i) => i.value),
      choices: [
        "npm",
        "yarn"
      ],
      fallback: {
        title: "Using default",
        value: 1,
      },
    },
    {
      type: "text",
      name: "main",
      message: "What is the path to your express entry point? 🌈",
      initial: "src/index.js",
      fallback: {
        title: "Using default",
        value: "src/index.js",
      },
    },
  ];

  const answers = await prompt(questions, { onCancel });

  if ((answers.option, answers.projectName, answers.main)) {
    console.log(chalk.bold.white("Let's get started..."));
    initialization(options[answers.option], answers.projectName, answers.engine);
  }
})();
