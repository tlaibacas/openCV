export default plugin;
export { CSSSourceCode };
export * from "./languages/css-language.js";
export * from "./types.js";
declare namespace plugin {
    export namespace meta {
        let name: string;
        let version: string;
    }
    export namespace languages {
        let css: CSSLanguage;
    }
    export { rules };
    export namespace configs {
        namespace recommended {
            let name_1: string;
            export { name_1 as name };
            export let plugins: {};
            export { recommendedRules as rules };
        }
    }
}
import { CSSSourceCode } from "./languages/css-source-code.js";
import { CSSLanguage } from "./languages/css-language.js";
import rules from "./build/rules.js";
import recommendedRules from "./build/recommended-config.js";
