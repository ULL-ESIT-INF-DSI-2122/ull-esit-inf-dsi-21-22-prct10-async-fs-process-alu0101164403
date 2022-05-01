import {watchFile, existsSync} from 'fs';
import {spawn} from 'child_process';

const fichero = process.argv[2];
const corte = process.argv[3];

// if (existsSync(fichero)) {
watchFile(fichero, () => {
  // console.log('El fichero ha sido modificado.');
  const cut = spawn('cut', ['-d', `','`, '-f', corte, fichero]);
  let lista: string = '';
  // cut.stdout.pipe(process.stdout);
  cut.stdout.on('data', (salida:string[]) => {
    lista += salida;
    console.log('lista', lista);
  });

  cut.on('close', () => {
    // listaCortes.push([lista]); //
    console.log('El array contiene: ', lista);
  });
});
// }

/*
export class Observador {
  constructor() {}

  public cut(corte, fichero) {
    if (existsSync(fichero)) {
      const listaCortes: string[][] = [];
      watchFile(fichero, () => {
        console.log('El fichero ha sido modificado.');
        const cut = spawn('cut', ['-d', `','`, '-f', corte, fichero]);
        let lista: string = '';
        // cut.stdout.pipe(process.stdout);
        cut.stdout.on('data', (salida:string[]) => {
          lista += salida;
          console.log('lista', lista);
        });
        cut.on('close', () => {
          listaCortes.push([lista]);
          console.log('El array contiene: ', lista);
        });
      });
    } else {
      throw Error('El fichero no existe');
    }
  }
}
*/
