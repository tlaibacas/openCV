export default rule;
export type NoUnsafeValuesMessageIds = "unsafeNumber" | "unsafeInteger" | "unsafeZero" | "subnormal" | "loneSurrogate";
export type NoUnsafeValuesRuleDefinition = JSONRuleDefinition<{
    MessageIds: NoUnsafeValuesMessageIds;
}>;
/** @type {NoUnsafeValuesRuleDefinition} */
declare const rule: NoUnsafeValuesRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
