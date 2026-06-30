import { uuidRegex } from "../types.js";

export const isUuid = (v: string) => uuidRegex.test(v);
