import { EntityModel } from './entity.model';
import { PrivilegeCollectionModel } from './privilege.collection.model';
import { PrivilegeModuleModel } from './privilege.module.model';

export class RoleModel extends EntityModel {

    static entity: string = "roles";

    name: string;
    description: string;
    
    privileges: {
        collections: PrivilegeCollectionModel[],
        modules: PrivilegeModuleModel[]
    }

    validatePrivileges(): void {
        for (let pc of this.privileges.collections) {
            pc.validatePrivileges();
        }
    }

    static validatePrivileges(r : RoleModel): void {
        for (let pc of r.privileges.collections) {
            PrivilegeCollectionModel.validatePrivileges(pc);            
        }
    }

}