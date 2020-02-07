import { EntityModel } from './entity.model';
import { PrivilegeCollectionModel } from './privilege.collection.model';
import { PrivilegeModuleModel } from './privilege.module.model';

export class RoleModel extends EntityModel {

    static entity: string = "roles";

    name: string;
    description: string;
    creationDate: Date;
    state: string;

    privileges: {
        collections: PrivilegeCollectionModel[],
        modules: PrivilegeModuleModel[]
    }

    validatePrivileges(): void {
        for (let pc of this.privileges.collections) {
            pc.validatePrivileges();
        }
    }

}