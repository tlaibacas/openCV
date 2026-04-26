export default rule;
export type TopLevelInteropMessageIds = "topLevel";
export type TopLevelInteropRuleDefinition = JSONRuleDefinition<{
    MessageIds: TopLevelInteropMessageIds;
}>;
/**
 * @fileoverview Rule to ensure top-level items are either an array or object.
 * @author Joe Hildebrand
 */
/**
 * @import { JSONRuleDefinition } from "../types.js";
 * @typedef {"topLevel"} TopLevelInteropMessageIds
 * @typedef {JSONRuleDefinition<{ MessageIds: TopLevelInteropMessageIds }>} TopLevelInteropRuleDefinition
 */
/** @type {TopLevelInteropRuleDefinition} */
declare const rule: TopLevelInteropRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
