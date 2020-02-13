import { RoleModel } from './role.model';
import { PrivilegeCollectionModel } from './privilege.collection.model';

export class Util {

    public static validateAccessCollection(role: RoleModel, collection: string, action: string): boolean {
        let access: boolean = false;

        try {

            let pc: PrivilegeCollectionModel = role.privileges.collections.find(c => c.name == collection);

            switch (action) {
                case "create":
                    access = pc.create;
                    break;
                case "read":
                    access = pc.read;
                    break;
                case "update":
                    access = pc.update;
                    break;
                case "delete":
                    access = pc.delete;
                    break;
            }
        } catch (ex) {
            //console.log("Collection: " + collection + ", no definida");
            return access;
        }

        //console.log(access);
        return access;
    }

}