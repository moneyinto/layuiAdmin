import key from "./../config/key";
import * as jwt from "jsonwebtoken";
import * as moment from 'moment';
const crypto = require('crypto');

export class Business {
    static encrypt(obj) {
        return jwt.sign(obj, key);
    }

    static decrypt(token, callback) {
        jwt.verify(token, key, (err, decoded) => {
            callback(err, decoded);
        });
    }

    static getCookie(name, cookies) {
        let Cookies = {};
        cookies && cookies.split(';').forEach((Cookie) => {
            var parts = Cookie.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
        return Cookies[name];
    }

    static getNow() {
        return moment().unix();
    }

    static md5(text) {
        const md5 = crypto.createHash('md5');
        return md5.update(text).digest('hex');
    }
}
