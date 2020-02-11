import { EntityModel } from './entity.model';

export class DataModel extends EntityModel {

    static entity: string = "data";
        
    user: string;    
    directory: string;    
    description: string;
    
}