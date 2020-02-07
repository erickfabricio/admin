export class EntityModel {

    _id: string;
    
    constructor(){
    }

    deserialize(input: any): this {        
        return Object.assign(this, input);
    }

}
