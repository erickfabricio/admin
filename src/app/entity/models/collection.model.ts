import { EntityModel } from './entity.model';

export class CollectionModel extends EntityModel {

    static entity: string = "collections";
        
    name: string;
    description: string;    

}