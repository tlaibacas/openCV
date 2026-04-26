/**
 * JSON Source Code Object
 * @extends {TextSourceCodeBase<{LangOptions: JSONLanguageOptions, RootNode: DocumentNode, SyntaxElementWithLoc: JSONSyntaxElement, ConfigNode: Token}>}
 */
export class JSONSourceCode extends TextSourceCodeBase<{
    LangOptions: JSONLanguageOptions;
    RootNode: DocumentNode;
    SyntaxElementWithLoc: JSONSyntaxElement;
    ConfigNode: Token;
}> {
    /**
     * Creates a new instance.
     * @param {Object} options The options for the instance.
     * @param {string} options.text The source code text.
     * @param {DocumentNode} options.ast The root AST node.
     */
    constructor({ text, ast }: {
        text: string;
        ast: DocumentNode;
    });
    /**
     * The comment tokens in the source code.
     * @type {Array<Token>|undefined}
     */
    comments: Array<Token> | undefined;
    /**
     * Returns an array of all inline configuration nodes found in the
     * source code.
     * @returns {Array<Token>} An array of all inline configuration nodes.
     */
    getInlineConfigNodes(): Array<Token>;
    /**
     * Returns directives that enable or disable rules along with any problems
     * encountered while parsing the directives.
     * @returns {{problems:Array<FileProblem>,directives:Array<Directive>}} Information
     *      that ESLint needs to further process the directives.
     */
    getDisableDirectives(): {
        problems: Array<FileProblem>;
        directives: Array<Directive>;
    };
    /**
     * Returns inline rule configurations along with any problems
     * encountered while parsing the configurations.
     * @returns {{problems:Array<FileProblem>,configs:Array<{config:{rules:RulesConfig},loc:LocationRange}>}} Information
     *      that ESLint needs to further process the rule configurations.
     */
    applyInlineConfig(): {
        problems: Array<FileProblem>;
        configs: Array<{
            config: {
                rules: RulesConfig;
            };
            loc: LocationRange;
        }>;
    };
    /**
     * Returns the parent of the given node.
     * @param {AnyNode} node The node to get the parent of.
     * @returns {AnyNode|undefined} The parent of the node.
     */
    getParent(node: AnyNode): AnyNode | undefined;
    /**
     * Traverse the source code and return the steps that were taken.
     * @returns {Iterable<JSONTraversalStep>} The steps that were taken while traversing the source code.
     */
    traverse(): Iterable<JSONTraversalStep>;
    /**
     * Gets the token before the given node or token, optionally including comments.
     * @param {AnyNode|Token} nodeOrToken The node or token to get the previous token for.
     * @param {Object} [options] Options object.
     * @param {boolean} [options.includeComments] If true, return comments when they are present.
     * @returns {Token|null} The previous token or comment, or null if there is none.
     */
    getTokenBefore(nodeOrToken: AnyNode | Token, { includeComments }?: {
        includeComments?: boolean;
    }): Token | null;
    /**
     * Gets the token after the given node or token, skipping any comments unless includeComments is true.
     * @param {AnyNode|Token} nodeOrToken The node or token to get the next token for.
     * @param {Object} [options] Options object.
     * @param {boolean} [options.includeComments=false] If true, return comments when they are present.
     * @returns {Token|null} The next token or comment, or null if there is none.
     */
    getTokenAfter(nodeOrToken: AnyNode | Token, { includeComments }?: {
        includeComments?: boolean;
    }): Token | null;
    #private;
}
import type { JSONLanguageOptions } from "./json-language.js";
import type { DocumentNode } from "@humanwhocodes/momoa";
import type { JSONSyntaxElement } from "../types.js";
import type { Token } from "@humanwhocodes/momoa";
import { TextSourceCodeBase } from "@eslint/plugin-kit";
import type { FileProblem } from "@eslint/core";
import { Directive } from "@eslint/plugin-kit";
import type { RulesConfig } from "@eslint/core";
import type { LocationRange } from "@humanwhocodes/momoa";
import type { AnyNode } from "@humanwhocodes/momoa";
/**
 * A class to represent a step in the traversal process.
 */
declare class JSONTraversalStep extends VisitNodeStep {
    /**
     * Creates a new instance.
     * @param {Object} options The options for the step.
     * @param {AnyNode} options.target The target of the step.
     * @param {1|2} options.phase The phase of the step.
     * @param {Array<any>} options.args The arguments of the step.
     */
    constructor({ target, phase, args }: {
        target: AnyNode;
        phase: 1 | 2;
        args: Array<any>;
    });
    /**
     * The target of the step.
     * @type {AnyNode}
     */
    target: AnyNode;
}
import { VisitNodeStep } from "@eslint/plugin-kit";
export {};
