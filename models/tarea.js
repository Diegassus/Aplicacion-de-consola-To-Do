import {v4 as uudiv4} from 'uuid';

class Tarea {
    id = '';
    desc = '';
    creadoEn = null;

    constructor ( desc ){
        this.id = uudiv4();
        this.desc = desc;
        this.creadoEn = null;
    }

}

export {Tarea};