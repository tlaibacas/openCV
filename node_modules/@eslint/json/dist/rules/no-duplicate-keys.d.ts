export default rule;
export type NoDuplicateKeysMessageIds = "duplicateKey";
export type NoDuplicateKeysRuleDefinition = JSONRuleDefinition<{
    MessageIds: NoDuplicateKeysMessageIds;
}>;
/**
 * @import { MemberNode } from "@humanwhocodes/momoa";
 * @import { JSONRuleDefinition } from "../types.js";
 * @typedef {"duplicateKey"} NoDuplicateKeysMessageIds
 * @typedef {JSONRuleDefinition<{ MessageIds: NoDuplicateKeysMessageIds }>} NoDuplicateKeysRuleDefinition
 */
/** @type {NoDuplicateKeysRuleDefinition} */
declare const rule: NoDuplicateKeysRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
