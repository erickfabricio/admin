import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {

    static entity: string = "users"; //Router API
    static ID: string = "5e4191b1e13ccd1b3f38e176"; //MongoDB registration
    static NAME: string = "adm-users"; //MongoDB registration
            
    name: string;
    mail: string;
    hash: string;
    password: string;
    description: string;    
    role: string;
    creator: string;

}