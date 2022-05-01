import * as yargs from 'yargs';
import {Wrapper} from './wrapper';

const wrapper: Wrapper = new Wrapper();

yargs.command({
  command: 'type',
  describe: 'Tell if is file or directory.',
  builder: {
    path: {
      describe: 'Path file/directory.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.whatType(argv.path);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'newDirectory',
  describe: 'Create a new directory on a given path.',
  builder: {
    path: {
      describe: 'Path directory.',
      demandOption: true,
      type: 'string',
    },
    name: {
      describe: 'Name directory.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.name === 'string') {
      wrapper.newDirectory(argv.path, argv.name);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'listFiles',
  describe: 'List filenames in a directory.',
  builder: {
    path: {
      describe: 'Path directory.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.listFiles(argv.path);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'cat',
  describe: 'Show the content of a file.',
  builder: {
    path: {
      describe: 'Path file.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.catFile(argv.path);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'delete',
  describe: 'Delete a directory or file.',
  builder: {
    path: {
      describe: 'Path directory/file.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.delete(argv.path);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'move',
  describe: 'Move a directory or file from one path to another.',
  builder: {
    originPath: {
      describe: 'Path directory/file origin.',
      demandOption: true,
      type: 'string',
    },
    destinationPath: {
      describe: 'Path directory/file destination.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.originPath === 'string' && typeof argv.destinationPath === 'string') {
      wrapper.move(argv.originPath, argv.destinationPath);
    } else {
      console.log('Error en argv.');
    }
  },
});

yargs.command({
  command: 'copy',
  describe: 'Copy a directory or file from one path to another.',
  builder: {
    originPath: {
      describe: 'Path directory/file origin.',
      demandOption: true,
      type: 'string',
    },
    destinationPath: {
      describe: 'Path directory/file destination.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.originPath === 'string' && typeof argv.destinationPath === 'string') {
      wrapper.copy(argv.originPath, argv.destinationPath);
    } else {
      console.log('Error en argv.');
    }
  },
});


yargs.parse();
