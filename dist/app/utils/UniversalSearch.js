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
class UniversalSearch {
    constructor(model) {
        this.model = model;
    }
    GetData() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            var _a, _b;
            const page = (_a = options.page) !== null && _a !== void 0 ? _a : 1;
            const limit = (_b = options.limit) !== null && _b !== void 0 ? _b : 10;
            const skip = (page - 1) * limit;
            let query = options.filter || {};
            if (options.term) {
                const schemaPaths = Object.keys(this.model.schema.paths).filter((key) => !["_id", "__v"].includes(key));
                query = Object.assign(Object.assign({}, query), { $or: [
                        { title: { $regex: options.term, $options: "i" } },
                        { description: { $regex: options.term, $options: "i" } },
                    ] });
            }
            const [total, data] = yield Promise.all([
                this.model.countDocuments(query),
                this.model
                    .find(query, options.projection)
                    .sort(options.sort || { _id: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
            ]);
            return {
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                },
                data,
            };
        });
    }
}
exports.default = UniversalSearch;
