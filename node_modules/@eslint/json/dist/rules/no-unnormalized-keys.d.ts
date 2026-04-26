export default rule;
export type NoUnnormalizedKeysMessageIds = "unnormalizedKey";
export type NoUnnormalizedKeysOptions = {
    form: string;
};
export type NoUnnormalizedKeysRuleDefinition = JSONRuleDefinition<{
    RuleOptions: [NoUnnormalizedKeysOptions];
    MessageIds: NoUnnormalizedKeysMessageIds;
}>;
/**
 * @import { JSONRuleDefinition } from "../types.js";
 * @typedef {"unnormalizedKey"} NoUnnormalizedKeysMessageIds
 * @typedef {{ form: string }} NoUnnormalizedKeysOptions
 * @typedef {JSONRuleDefinition<{ RuleOptions: [NoUnnormalizedKeysOptions], MessageIds: NoUnnormalizedKeysMessageIds }>} NoUnnormalizedKeysRuleDefinition
 */
/** @type {NoUnnormalizedKeysRuleDefinition} */
declare const rule: NoUnnormalizedKeysRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
