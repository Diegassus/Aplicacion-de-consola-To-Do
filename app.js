import colors from 'colors';

import {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarCheck} from "./helpers/inquirer.js";
import {guardar,leer} from './helpers/guardarArchivo.js'
import {Tarea} from './models/tarea.js';
import {Tareas} from './models/tareas.js';

const  main = async ()=>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leer();

    if(tareasDB){
       tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
        
            case '2':
                //console.log(tareas.listarTareas());
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarCheck(tareas.listarTareas());
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listarTareas());
                if(id!='0'){
                    const ok = await confirmar("Esta seguro de que desea borrarlo?");
                     if(ok){
                        tareas.borrarTareas(id);
                        console.log("Tarea Borrada!!")
                    }
                }
                
                break;
        }

        guardar(tareas.listarTareas());
        console.log('\n');
        await pausa();
    }while(opt !== '0');
}

main()