import { EntityModel } from './entity.model';

export class TokenModel extends EntityModel {

    static entity: string = "tokens";
            
    time: string;
    key: string;
    payload: string;
    token: string;    
    
}
