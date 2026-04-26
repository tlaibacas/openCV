export default rule;
export type SortOptions = {
    /**
     * Whether key comparisons are case-sensitive.
     */
    caseSensitive: boolean;
    /**
     * Whether to use natural sort order instead of purely alphanumeric.
     */
    natural: boolean;
    /**
     * Minimum number of keys in an object before enforcing sorting.
     */
    minKeys: number;
    /**
     * Whether a blank line between properties starts a new group that is independently sorted.
     */
    allowLineSeparatedGroups: boolean;
};
export type SortKeysMessageIds = "sortKeys";
export type SortDirection = "asc" | "desc";
export type SortKeysRuleOptions = [SortDirection, SortOptions];
export type SortKeysRuleDefinition = JSONRuleDefinition<{
    RuleOptions: SortKeysRuleOptions;
    MessageIds: SortKeysMessageIds;
}>;
export type Comparator = (a: string, b: string) => boolean;
export type DirectionName = "ascending" | "descending";
export type SortName = "alphanumeric" | "natural";
export type Sensitivity = "sensitive" | "insensitive";
export type ComparatorMap = Record<DirectionName, Record<SortName, Record<Sensitivity, Comparator>>>;
/** @type {SortKeysRuleDefinition} */
declare const rule: SortKeysRuleDefinition;
import type { JSONRuleDefinition } from "../types.js";
