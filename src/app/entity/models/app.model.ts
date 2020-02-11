import { EntityModel } from './entity.model';

export class AppModel extends EntityModel {

    static entity: string = "apps";
        
    name: string;    
    contact: string;    
    description: string;        

}