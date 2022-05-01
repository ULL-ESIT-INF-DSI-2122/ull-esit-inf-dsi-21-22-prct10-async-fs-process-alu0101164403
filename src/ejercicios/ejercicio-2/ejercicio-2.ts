import * as yargs from 'yargs';
import {spawn} from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

yargs.command({
  command: 'count',
  describe: 'Count words',
  builder: {
    file: {
      describe: 'Filename',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Word to search',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.word === 'string') {
      countWordsPipe(argv.file, argv.word);
      countWords(argv.file, argv.word);
    }
  },
});

yargs.parse();


function countWordsPipe(nameFile: string, word: string): void {
  console.log(chalk.yellow('SOLUCION USANDO PIPE: '));
  if (fs.existsSync(`./${nameFile}`)) {
    const cat = spawn('cat', [nameFile]);
    const grep = spawn('grep', ['-o', word]);
    const wc = spawn('wc', ['-l']);
    cat.stdout.pipe(grep.stdin);
    grep.stdout.pipe(wc.stdin);
    // wc.stdout.pipe(process.stdout);
    wc.stdout.on('data', (data) => {
      if (data.toString().replace('\n', '') === '0') {
        console.log(chalk.yellow('No se han encontrado ocurrencias para la palabra seleccionada.'));
      } else {
        console.log(chalk.yellow('Se han encontrado ' + data.toString().replace('\n', '') + ` ocurrencias para ${word}`));
      }
    });
  } else {
    console.log(chalk.red('No se ha encontrado el fichero.'));
  }
}


function countWords(nameFile: string, word: string): void {
  console.log(chalk.magenta('SOLUCION SIN USAR PIPE: '));
  if (fs.existsSync(`./${nameFile}`)) {
    const cat = spawn('cat', [nameFile]);
    cat.stdout.on('data', (dataCat) => {
      const grep = spawn('grep', ['-o', word]);
      grep.stdout.on('data', (dataGrep) => {
        const wc = spawn('wc', ['-l']);
        wc.stdout.on('data', (dataWc) => {
          console.log(chalk.magenta('Se han encontrado ' + dataWc.toString().replace('\n', '') + ` ocurrencias para ${word}`));
        });
        wc.stdin.write(dataGrep.toString());
        wc.stdin.end();
      });
      grep.on('close', (code) => {
        if (code === 1) {
          console.log(chalk.magenta('No se han encontrado ocurrencias para la palabra seleccionada.'));
        }
      });
      grep.stdin.write(dataCat.toString());
      grep.stdin.end();
    });
  } else {
    console.log(chalk.red('No se ha encontrado el fichero.'));
  }
}
