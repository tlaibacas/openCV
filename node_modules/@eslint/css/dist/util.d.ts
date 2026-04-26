/**
 * @fileoverview Utility functions for ESLint CSS plugin.
 * @author Nicholas C. Zakas
 */
/**
 * @import { SyntaxMatchError, SyntaxReferenceError } from "@eslint/css-tree"
 */
/**
 * Determines if an error is a syntax match error.
 * @param {Object} error The error object to check.
 * @returns {error is SyntaxMatchError} True if the error is a syntax match error, false if not.
 */
export function isSyntaxMatchError(error: any): error is SyntaxMatchError;
/**
 * Determines if an error is a syntax reference error.
 * @param {Object} error The error object to check.
 * @returns {error is SyntaxReferenceError} True if the error is a syntax reference error, false if not.
 */
export function isSyntaxReferenceError(error: any): error is SyntaxReferenceError;
import type { SyntaxMatchError } from "@eslint/css-tree";
import type { SyntaxReferenceError } from "@eslint/css-tree";
