import got from 'got';
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import { Stream } from 'stream';
import { promisify } from 'util';
import { extract } from 'tar';
import { makeDir } from './dir';
import { rimraf } from 'rimraf';

import { ROOT_DIR } from './dir';

export const TEMPLATES_ENGINE_DIR = `${ROOT_DIR}/.build-onchain-apps`;
export const TEMPLATES_DIR = `${TEMPLATES_ENGINE_DIR}/templates`;

const pipeline = promisify(Stream.pipeline);

export async function downloadAndExtractTemplates(): Promise<void> {
  // ensure the templates directory exists
  await makeDir(TEMPLATES_DIR);

  return pipeline(
    got.stream(
      'https://codeload.github.com/base-org/build-onchain-apps/tar.gz/main'
    ),
    extract({ cwd: TEMPLATES_ENGINE_DIR, strip: 1 })
  );
}

export const getTemplateDir = (appName: string) => {
  return path.join(TEMPLATES_DIR, appName);
};

export const getTemplateChoices = (): string[] => {
  const templates = fs.readdirSync(TEMPLATES_DIR).filter((file) => {
    const filePath = path.join(TEMPLATES_DIR, file);
    return fs.statSync(filePath).isDirectory();
  });
  return templates;
};

export async function removeDownloadedTemplates() {
  try {
    await rimraf.sync(TEMPLATES_ENGINE_DIR);
  } catch (e) {
    console.error('Error while removing directories:', e);
  }
}

export const updatePackageJson = (
  projectDir: string,
  appName: string
): boolean => {
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = appName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return true;
  } else {
    console.warn(chalk.yellow('package.json not found in the template.'));
    return false;
  }
};

export const displayFinalInstructions = (appName: string) => {
  console.log(chalk.green(`🚀 Project '${appName}' created successfully!`));
  console.log(
    chalk.blue(`Type 'cd apps/${appName}' to navigate into your new project.`)
  );
  console.log(chalk.blue(`Run 'yarn' to install dependencies.`));
  console.log(chalk.blue(`Run 'yarn dev' to start the development server.`));
};
