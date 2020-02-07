import { EntityModel } from 'src/app/entity/models/entity.model';
import { UserModel } from 'src/app/entity/models/user.model';


export class SessionModel {

    //static entity: string = "users";

    token: string
    user: UserModel;    

}