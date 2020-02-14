import { EntityModel } from './entity.model';

export class ItemModel extends EntityModel {

    static entity: string = "catalogs";

    name: string;
    description: string;
 
}