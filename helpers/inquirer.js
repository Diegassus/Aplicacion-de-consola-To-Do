import colors from 'colors';
import  inquirer  from 'inquirer';

const pausar = {
    type:"input",
    name:"enter",
    message:`\n Presione ${"ENTER".green} para continuar `
}

const preguntas = [
    {
        type:'list',
        name:"opcion",
        message:"¿Qué desea hacer?",
        choices: [
            {
                value:"1",
                name:`${"1".green}. Crear tarea`
            },{
                value:"2",
                name:`${"2".green}. Listar tareas`
            },{
                value:"3",
                name:`${"3".green}. Listar tareas completadas`
            },{
                value:"4",
                name:`${"4".green}. Listar tareas pendientes`
            },{
                value:"5",
                name:`${"5".green}. Completar tarea(s)`
            },{
                value:"6",
                name:`${"6".green}. Eliminar tarea(s)`
            },{
                value:"0",
                name: `${"0".green}. Salir`
            }
          ]
    }
]

const inquirerMenu = async ()=>{
    console.clear();
    console.log("=======================".green);
    console.log(" Seleccione una opcion ".green);
    console.log("=======================\n".green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async ()=>{
    const enter = await inquirer.prompt(pausar);
    return enter
}

const leerInput = async (mensaje)=>{
    const question = {
        type:'input',
        name:'desc',
        message:mensaje,
        validate(value){
            if(value.length===0){
                return("Por favor, ingrese un valor")
            }
            return true
        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (listado=[])=>{
    
    const choices = listado.map((tarea,index)=>{
        const i = `${index+1}.`.green
        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:0,
        name:'0'.green + " Cancelar"
    })

    const preguntas = [{
        type:'list',
        name:'id',
        message:"Borrar",
        choices
    }]
    const {id}=await inquirer.prompt(preguntas);
    return id;
}

const mostrarCheck = async (listado=[])=>{
    
    const choices = listado.map((tarea,index)=>{
        const i = `${index+1}.`.green
        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`,
            checked:(tarea.creadoEn)?true:false
        }
    });

    const preguntas = [{
        type:'checkbox',
        name:'id',
        message:"Selecciones",
        choices
    }]
    const {id}=await inquirer.prompt(preguntas);
    return id;
}
 
const confirmar =async (message)=>{
    const question ={
        type:'confirm',
        name:'ok',
        message
    }

    const {ok} = await inquirer.prompt(question);
    return ok
}

export {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarCheck}