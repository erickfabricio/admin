import { EntityModel } from './entity.model';

export class ModuleModel extends EntityModel {

    static entity: string = "modules";
        
    name: string;        
    description: string;    

}