import { EntityModel } from './entity.model';

export class LogModel extends EntityModel {

    static entity: string = "logs";
        
    user: string;        
    description: string;
    
}
