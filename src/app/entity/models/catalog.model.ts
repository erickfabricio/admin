import { EntityModel } from './entity.model';
import { ItemModel } from './item.model';

export class CatalogModel extends EntityModel {

    static entity: string = "catalogs";

    name: string;
    description: string;
    list: ItemModel[];
  
}