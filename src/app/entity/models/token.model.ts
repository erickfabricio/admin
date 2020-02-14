import { EntityModel } from './entity.model';

export class TokenModel extends EntityModel {
    
    static entity: string = "tokens"; //Router API
    static ID: string = "5e432aeec82683248f939725"; //MongoDB registration
    static NAME: string = "adm-tokens"; //Collection
            
    generation: string;
    generationName: string;
    time: string;
    key: string;
    playload: string;
    token: string;    
    signOut: Date;
    
}
