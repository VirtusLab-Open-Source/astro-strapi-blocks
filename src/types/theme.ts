import { DeepPartial } from "./common";

export type StrapiBlockThemeBlock = Array<string>;

export type StrapiBlockThemeHeading = {
    block: StrapiBlockThemeBlock;
    h1: Array<string>;
    h2: Array<string>;
    h3: Array<string>;
    h4: Array<string>;
    h5: Array<string>;
    h6: Array<string>;
}

export type StrapiBlockThemeParagraph = {
    block: StrapiBlockThemeBlock;
    span: Array<string>;
    strong: Array<string>;
    italic: Array<string>;
    underline: Array<string>;
    strikethrough: Array<string>;
    link: Array<string>;
}

export type StrapiBlockThemeQuote = StrapiBlockThemeParagraph & {

};

export type StrapiBlockTextNodePartial = StrapiBlockThemeParagraph & StrapiBlockThemeQuote;

export type StrapiBlockThemeList = {
    block: StrapiBlockThemeBlock;
    ordered: Array<string>;
    unordered: Array<string>;
    item: Array<string>;
}

export type StrapiBlockThemeCode = {
    block: StrapiBlockThemeBlock;
    language: Array<string>;
}
export type StrapiBlockThemeImage = {
    block: StrapiBlockThemeBlock;
    image: Array<string>;
    caption: Array<string>;
}

export type StrapiBlockTheme = {
    block: StrapiBlockThemeBlock;
    heading: StrapiBlockThemeHeading;
    paragraph: StrapiBlockThemeParagraph;
    quote: StrapiBlockThemeQuote;
    list: StrapiBlockThemeList;
    code: StrapiBlockThemeCode;
    image: StrapiBlockThemeImage;
}

export type StrapiBlockUserTheme = {
    overwrite?: DeepPartial<StrapiBlockTheme>;
    extend?: DeepPartial<StrapiBlockTheme>;
}

export type StrapiRenderClassesPropretyType = keyof StrapiBlockThemeHeading | keyof StrapiBlockThemeParagraph | keyof StrapiBlockThemeQuote | keyof StrapiBlockThemeList | keyof StrapiBlockThemeCode | keyof StrapiBlockThemeImage;
export type StrapiRenderClassesType = keyof StrapiBlockTheme | StrapiRenderClassesPropretyType;