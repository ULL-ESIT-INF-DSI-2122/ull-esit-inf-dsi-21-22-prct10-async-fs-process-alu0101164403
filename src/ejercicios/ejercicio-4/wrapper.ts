import * as fs from 'fs';
import * as fsE from 'fs-extra';
import chalk from 'chalk';

export class Wrapper {
  constructor() {}

  /**
   * comprobar si es directorio o fichero
   * devuelve un numero para indicar si es directorio (0), fichero (1)
   * o si no encuentra la ruta(-1)
   * @param path ruta del directorio o fichero
   * @returns number
   */
  public whatType(path: string): number {
    if (fs.existsSync(path)) {
      if (fs.lstatSync(path).isDirectory()) {
        console.log(chalk.yellow('Es un directorio.'));
        return 0;
      }
      if (fs.lstatSync(path).isFile()) {
        console.log(chalk.yellow('Es un fichero.'));
        return 1;
      }
    } else {
      console.log(chalk.red('ERROR.La ruta dada no existe.'));
    }
    return -1;
  }
  /**
   * crear un directorio en una ruta dada
   * @param path string, ruta del directorio nuevo incluido el nombre del directorio
   */
  public newDirectory(path: string, name: string): void {
    const type: number = this.whatType(path);
    // si la ruta es de un directorio y no hay directorios con ese nombre
    if (type === 0 && (this.whatType(path+'/'+name) === -1 || this.whatType(path+'/'+name) === 1)) {
      fs.mkdirSync(path+'/'+name);
      console.log(chalk.yellow('Se ha creado el directorio correctamente.'));
    }
  }
  /**
   * mostrar nombre de ficheros de un directorio
   * @param path string, ruta del directorio
   */
  public listFiles(path: string): void {
    const type: number = this.whatType(path);
    if (type === 0) {
      fs.readdir(path, (err, files) => {
        if (err) {
          console.log(chalk.yellow('Error: ', err));
        } else {
          files.forEach(function(file) {
            if (fs.lstatSync(path+'/'+file).isFile()) {
              console.log(chalk.magenta(file));
            }
          });
        }
      });
    }
  }
  /**
   * mostrar contenido de un fichero
   * @param path string, ruta del fichero a mostrar
   */
  public catFile(path: string): void {
    const type: number = this.whatType(path);
    // si la ruta pertenece a un fichero
    if (type === 1) {
      const dataFile = fs.readFileSync(path, 'utf-8');
      console.log(chalk.magenta(dataFile.toString()));
    }
  }
  /**
   * borrar ficheros/directorios
   * @param path string, ruta del fichero o directorio a eliminar
   */
  public delete(path: string): void {
    // elimina ficheros y directorios
    fs.rm(path, {recursive: true, force: true}, (err) => {
      if (err) {
        console.log(chalk.red('Ocurrio un error al borrar los datos:', err));
      } else {
        console.log(chalk.yellow('Se elimino correctamente.'));
      }
    });
  }
  /**
   * mover ficheros/directorio de una ruta a otra
   * @param originPath string, ruta de origen
   * @param destinationPath string, ruta de destino
   */
  public move(originPath: string, destinationPath: string): void {
    const type: number = this.whatType(originPath);
    // si es directorio
    if (type === 0) {
      fsE.move(originPath, destinationPath, (err) => {
        if (err) {
          console.log(chalk.red('Error al mover el directorio:', err));
        } else {
          console.log(chalk.yellow('Se movio el directorio correctamente.'));
        }
      });
    }
    // si es fichero
    if (type === 1) {
      fs.rename(originPath, destinationPath, (err) => {
        if (err) {
          console.log(chalk.red('Error al mover el fichero:', err));
        } else {
          console.log(chalk.yellow('Se movio el fichero correctamente.'));
        }
      });
    }
  }
  /**
   * copiar ficheros/directorio de una ruta en otra
   * @param originPath string, ruta de origen
   * @param destinationPath string, ruta de destino
   */
  public copy(originPath: string, destinationPath: string): void {
    const type: number = this.whatType(originPath);
    // si es directorio
    if (type === 0) {
      fs.cp(originPath, destinationPath, {recursive: true}, (err) => {
        if (err) {
          console.log(chalk.red('Error al copiar el directorio:', err));
        } else {
          console.log(chalk.yellow('Se copio el directorio correctamente.'));
        }
      });
    }
    // si es fichero, comprueba la existencia de un fichero de mismo nombre
    if (type === 1) {
      fs.copyFile(originPath, destinationPath, fs.constants.COPYFILE_EXCL, (err) => {
        if (err) {
          console.log(chalk.red('Error al copiar el fichero:', err));
        } else {
          console.log(chalk.yellow('Se copio el fichero correctamente.'));
        }
      });
    }
  }
}
