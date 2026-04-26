/**
 * CSS Source Code Object.
 * @extends {TextSourceCodeBase<{LangOptions: CSSLanguageOptions, RootNode: StyleSheetPlain, SyntaxElementWithLoc: CSSSyntaxElement, ConfigNode: Comment}>}
 */
export class CSSSourceCode extends TextSourceCodeBase<{
    LangOptions: CSSLanguageOptions;
    RootNode: StyleSheetPlain;
    SyntaxElementWithLoc: CSSSyntaxElement;
    ConfigNode: Comment;
}> {
    /**
     * Creates a new instance.
     * @param {Object} options The options for the instance.
     * @param {string} options.text The source code text.
     * @param {StyleSheetPlain} options.ast The root AST node.
     * @param {Array<Comment>} options.comments The comment nodes in the source code.
     * @param {Lexer} options.lexer The lexer used to parse the source code.
     */
    constructor({ text, ast, comments, lexer }: {
        text: string;
        ast: StyleSheetPlain;
        comments: Array<Comment>;
        lexer: Lexer;
    });
    /**
     * The comment node in the source code.
     * @type {Array<Comment>|undefined}
     */
    comments: Array<Comment> | undefined;
    /**
     * The lexer for this instance.
     * @type {Lexer}
     */
    lexer: Lexer;
    /**
     * Returns an array of all inline configuration nodes found in the
     * source code.
     * @returns {Array<Comment>} An array of all inline configuration nodes.
     */
    getInlineConfigNodes(): Array<Comment>;
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
     * @returns {{problems:Array<FileProblem>,configs:Array<{config:{rules:RulesConfig},loc:CssLocationRange}>}} Information
     *      that ESLint needs to further process the rule configurations.
     */
    applyInlineConfig(): {
        problems: Array<FileProblem>;
        configs: Array<{
            config: {
                rules: RulesConfig;
            };
            loc: CssLocationRange;
        }>;
    };
    /**
     * Traverse the source code and return the steps that were taken.
     * @returns {Iterable<CSSTraversalStep>} The steps that were taken while traversing the source code.
     */
    traverse(): Iterable<CSSTraversalStep>;
    #private;
}
import type { CSSLanguageOptions } from "./css-language.js";
import type { StyleSheetPlain } from "@eslint/css-tree";
import type { CSSSyntaxElement } from "../types.js";
import type { Comment } from "@eslint/css-tree";
import { TextSourceCodeBase } from "@eslint/plugin-kit";
import type { Lexer } from "@eslint/css-tree";
import type { FileProblem } from "@eslint/core";
import { Directive } from "@eslint/plugin-kit";
import type { RulesConfig } from "@eslint/core";
import type { CssLocationRange } from "@eslint/css-tree";
/**
 * A class to represent a step in the traversal process.
 */
declare class CSSTraversalStep extends VisitNodeStep {
    /**
     * Creates a new instance.
     * @param {Object} options The options for the step.
     * @param {CssNode} options.target The target of the step.
     * @param {1|2} options.phase The phase of the step.
     * @param {Array<any>} options.args The arguments of the step.
     */
    constructor({ target, phase, args }: {
        target: CssNode;
        phase: 1 | 2;
        args: Array<any>;
    });
    /**
     * The target of the step.
     * @type {CssNode}
     */
    target: CssNode;
}
import { VisitNodeStep } from "@eslint/plugin-kit";
import type { CssNode } from "@eslint/css-tree";
export {};
