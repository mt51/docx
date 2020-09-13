import boxen, { BorderStyle } from 'boxen';
import chalk from 'chalk';
import address from 'address';
import consola from 'consola';
import getVersion from '../utils/version';

export function logBanner(mode: String, port: number) {

  const local = `http://localhost:${port}/`;
  const network = `http://${address.ip()}:${port}/`;

  const lines: string[] = [];

  lines.push(`${chalk.bold(chalk.green('docx'))} v${getVersion()}\n`);
  // @ts-ignore
  lines.push(`Running in ${chalk.bold(chalk.green(mode))} mode\n`);

  lines.push(`local: ${chalk.bold(chalk.green(local))}\n`);

  lines.push(`network: ${chalk.bold(chalk.green(network))}\n`);

  // lines.push(`Document: ${chalk.cyan(document)} `);

  console.log(
    boxen(lines.join('\n'), {
      margin: 1,
      padding: 1,
      borderColor: 'green',
      borderStyle: BorderStyle.Round,
    })
  );
}

export {
  consola
}