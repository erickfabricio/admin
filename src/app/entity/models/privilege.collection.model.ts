import { EntityModel } from './entity.model';

export class PrivilegeCollectionModel extends EntityModel {

    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;

    validatePrivileges(): void {
        if (this.update || this.delete) {
            this.read = true;
        }
    }

    static validatePrivileges(pc: PrivilegeCollectionModel): void {
        if (pc.update || pc.delete) {
            pc.read = true;
        }
    }

}