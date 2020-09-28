import { get } from 'lodash';
import chalk from 'chalk';
import ghPages from 'gh-pages';
import { build } from './build';
import { docxConfigsPath, SITE_DIST_DIR } from '../common/constant';

const docxConfig = require(docxConfigsPath);


const deploySrc = get(docxConfig, 'outputDir', SITE_DIST_DIR);

export async function deploy() {
  await build();

  console.log(chalk.green('Start deploy'));

  ghPages.publish(deploySrc, (err) => {
    if (!err) {
      console.log(chalk.green('Deploy success'));
    } else {
      console.log(err);
    }
  });
}