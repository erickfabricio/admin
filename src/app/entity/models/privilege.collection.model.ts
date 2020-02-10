import { EntityModel } from './entity.model';

export class PrivilegeCollectionModel extends EntityModel {

    name: string;
    view: boolean;
    edit: boolean;
    delete: boolean;

    validatePrivileges(): void {
        if (this.edit || this.delete) {
            this.view = true;
        }
    }

    static validatePrivileges(pc: PrivilegeCollectionModel): void {
        if (pc.edit || pc.delete) {
            pc.view = true;
        }
    }

}