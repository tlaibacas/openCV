export default rule;
export type NoEmptyKeysMessageIds = "emptyKey";
export type NoEmptyKeysRuleDefinition = JSONRuleDefinition<{
    MessageIds: NoEmptyKeysMessageIds;
}>;
/**
 * @import { JSONRuleDefinition } from "../types.js";
 * @typedef {"emptyKey"} NoEmptyKeysMessageIds
 * @typedef {JSONRuleDefinition<{ MessageIds: NoEmptyKeysMessageIds }>} NoEmptyKeysRuleDefinition
 */
/** @type {NoEmptyKeysRuleDefinition} */
declare const rule: NoEmptyKeysRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
