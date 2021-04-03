const path = require("path");
const { execSync } = require("child_process");
const { ncp } = require("ncp");
const { writeFile, mkdir } = require("fs").promises;
const { existsSync } = require("fs");
const chalk = require("chalk");

const boilerplatesVersion = "1.0.0";

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
    data = JSON.stringify(data, null, 2);

    await writeFile(pathName, data);
  } catch (err) {
    throw err;
  }
};

const downloadNodeModules = (config, destination, engine) => {
  const options = { cwd: destination };

  if (engine === "yarn") {
    console.log(chalk.bold.white("\nInstalling dependencies..."));
    execSync(`yarn add ${config.dependencies}`, options);
    console.log(chalk.bold.greenBright("Dependencies installation done...\n"));

    console.log(chalk.bold.white("Installing dev dependencies..."));
    execSync(`yarn add -D ${config.devDependencies}`, options);
    console.log(
      chalk.bold.greenBright("Dependencies installation complete...\n")
    );
  } else {
    console.log(chalk.bold.white("\nInstalling dependencies..."));
    execSync(`npm i -s ${config.dependencies}`, options);
    console.log(chalk.bold.greenBright("Dependencies installation done...\n"));

    console.log(chalk.bold.white("Installing dev dependencies..."));
    execSync(`npm i -D ${config.devDependencies}`, options);
    console.log(
      chalk.bold.greenBright("Dependencies installation complete...\n")
    );
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
    throw err;
  }
};

module.exports = generate;
