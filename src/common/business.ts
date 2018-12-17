import key from "./../config/key";
import * as jwt from "jsonwebtoken";
import * as moment from 'moment';

export class Business {
    static encryption(obj) {
        return jwt.sign(obj, key);
    }

    static getNow() {
        return moment().unix();
    }
}
