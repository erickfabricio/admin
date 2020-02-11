export class EntityModel {

    _id: string;
    creationDate: Date;
    state: string;
    
    constructor(){
    }

    deserialize(input: any): this {        
        return Object.assign(this, input);
    }

}
