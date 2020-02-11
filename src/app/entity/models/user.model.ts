import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {

    static entity: string = "users";
        
    name: string;    
    mail: string;
    password: string;
    description: string;    
    role: string;

}