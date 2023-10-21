"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sheet = void 0;
const google_auth_library_1 = require("google-auth-library");
const google_spreadsheet_1 = require("google-spreadsheet");
class Sheet {
    constructor(sheetId) {
        const serviceAccountAuth = new google_auth_library_1.JWT({
            email: process.env.client_email,
            key: process.env.private_key.split(String.raw `\n`).join('\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });
        this.doc = new google_spreadsheet_1.GoogleSpreadsheet(sheetId, serviceAccountAuth);
    }
    addRow(row) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(row);
            try {
                yield this.doc.loadInfo();
                let sheet = this.doc.sheetsByIndex[0];
                yield sheet.addRow(row, {
                    insert: true,
                    raw: true
                });
            }
            catch (e) {
                console.log('failed to add row', e);
                return false;
            }
            return true;
        });
    }
}
exports.Sheet = Sheet;
//# sourceMappingURL=sheets.js.map