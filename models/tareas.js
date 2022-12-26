import { Tarea  } from "./tarea.js";


class Tareas{

    _listado = {};


    constructor(){
        this._listado = {};
    }

    borrarTareas(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    listarTareas(){

        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            listado.push(this._listado[key]);
        })
        return listado
    }

    listadoCompleto(){
        this.listarTareas().forEach((task,index)=>{
           const idx = `${index++}`.green;
           const {desc,creadoEn} = task;
           const estado = (creadoEn)
                            ? "Completada".green
                            : "Pendiente".red;
            console.log(`${idx}. ${desc} :: ${estado}`)
        })
        
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach((tarea)=>{
            this._listado[tarea.id]=tarea
        })
    }

    listarPendientesCompletadas(completadas){
        console.log();
        let i = 0;
        this.listarTareas().forEach((task)=>{
            const {desc,creadoEn} = task;
            if(completadas){
                if(creadoEn!=null){
                    i += 1;
                    console.log(`${(i+'.').green} ${desc} :: ${"Completada".green}`);
                }
            }else{
                if(creadoEn==null){
                    i += 1;
                    console.log(`${(i+'.').green} ${desc} :: ${"Pendiente".red}`);
                }
                
            }
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach((id)=>{
            const tarea = this._listado[id];
            if(!tarea.creadoEn){
                tarea.creadoEn= new Date().toISOString();
            }
        })

        this.listarTareas().forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].creadoEn=null
            }
        })
    }
}

export {Tareas};
