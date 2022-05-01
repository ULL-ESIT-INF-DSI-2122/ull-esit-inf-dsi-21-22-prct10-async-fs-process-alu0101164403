import chalk from 'chalk';
import * as fs from 'fs';
import * as yargs from 'yargs';


yargs.command({
  command: 'watch',
  describe: 'Control changes of directory.',
  builder: {
    user: {
      describe: 'User name.',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'Path directory of user.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.user === 'string') {
      watchDirectory(argv.user, argv.path);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.parse();

export function watchDirectory(user: string, path: string): void {
  if (fs.existsSync(path)) {
    fs.watch(path, (event, filename) => {
      // console.log('event is: ' + event);
      if (event === 'change') {
        console.log(chalk.magenta('Se ha modificado el fichero', filename));
        const dataFile = fs.readFileSync(path+'/'+filename, 'utf-8');
        console.log(chalk.magenta(dataFile.toString()));
      }
      if (event === 'rename') {
        if (fs.existsSync(path+'/'+filename)) {
          console.log(chalk.magenta('Se ha creado el fichero', filename));
        } else {
          console.log(chalk.magenta('Se ha borrado el fichero', filename));
        }
      }
    });
  } else {
    console.log(chalk.red('No se ha encontrado la ruta especificada'));
  }
}
