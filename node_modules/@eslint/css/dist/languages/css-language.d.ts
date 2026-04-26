/**
 * CSS Language Object
 * @implements {Language<{ LangOptions: CSSLanguageOptions; Code: CSSSourceCode; RootNode: StyleSheetPlain; Node: CssNodePlain}>}
 */
export class CSSLanguage implements Language {
    /**
     * The type of file to read.
     * @type {"text"}
     */
    fileType: "text";
    /**
     * The line number at which the parser starts counting.
     * @type {0|1}
     */
    lineStart: 0 | 1;
    /**
     * The column number at which the parser starts counting.
     * @type {0|1}
     */
    columnStart: 0 | 1;
    /**
     * The name of the key that holds the type of the node.
     * @type {string}
     */
    nodeTypeKey: string;
    /**
     * The visitor keys for the CSSTree AST.
     * @type {Record<string, string[]>}
     */
    visitorKeys: Record<string, string[]>;
    /**
     * The default language options.
     * @type {CSSLanguageOptions}
     */
    defaultLanguageOptions: CSSLanguageOptions;
    /**
     * Validates the language options.
     * @param {CSSLanguageOptions} languageOptions The language options to validate.
     * @returns {void}
     * @throws {TypeError} When the language options are invalid.
     */
    validateLanguageOptions(languageOptions: CSSLanguageOptions): void;
    /**
     * Normalizes the language options so they can be serialized.
     * @param {CSSLanguageOptions} languageOptions The language options to normalize.
     * @returns {CSSLanguageOptions} The normalized language options.
     */
    normalizeLanguageOptions(languageOptions: CSSLanguageOptions): CSSLanguageOptions;
    /**
     * Parses the given file into an AST.
     * @param {File} file The virtual file to parse.
     * @param {Object} [context] The parsing context.
     * @param {CSSLanguageOptions} [context.languageOptions] The language options to use for parsing.
     * @returns {CSSParseResult} The result of parsing.
     */
    parse(file: File, { languageOptions }?: {
        languageOptions?: CSSLanguageOptions;
    }): CSSParseResult;
    /**
     * Creates a new `CSSSourceCode` object from the given information.
     * @param {File} file The virtual file to create a `CSSSourceCode` object from.
     * @param {CSSOkParseResult} parseResult The result returned from `parse()`.
     * @returns {CSSSourceCode} The new `CSSSourceCode` object.
     */
    createSourceCode(file: File, parseResult: CSSOkParseResult): CSSSourceCode;
}
export type CSSOkParseResult = OkParseResult<StyleSheetPlain> & {
    comments: Comment[];
    lexer: Lexer;
};
export type CSSParseResult = ParseResult<StyleSheetPlain>;
/**
 * DefaultSyntaxConfig type representing the structure returned by `@eslint/css-tree/definition-syntax-data`.
 * This type is defined inline because it's not exported from the main `@eslint/css-tree` package.
 */
export type DefaultSyntaxConfig = Pick<SyntaxConfig, "atrules" | "types" | "properties">;
export type SyntaxExtensionCallback = (defaultSyntax: DefaultSyntaxConfig) => Partial<SyntaxConfig>;
export type CSSLanguageOptions = {
    /**
     * Whether to be tolerant of recoverable parsing errors.
     */
    tolerant?: boolean;
    /**
     * Custom syntax to use for parsing.
     */
    customSyntax?: Partial<SyntaxConfig> | SyntaxExtensionCallback;
};
import type { Language } from "@eslint/core";
import type { File } from "@eslint/core";
import { CSSSourceCode } from "./css-source-code.js";
import type { StyleSheetPlain } from "@eslint/css-tree";
import type { OkParseResult } from "@eslint/core";
import type { Comment } from "@eslint/css-tree";
import type { Lexer } from "@eslint/css-tree";
import type { ParseResult } from "@eslint/core";
import type { SyntaxConfig } from "@eslint/css-tree";
