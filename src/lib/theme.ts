import type { StrapiBlockTheme, StrapiBlockThemeHeading, StrapiBlockUserTheme } from '../types';

export const StrapiBlockThemeDefault: StrapiBlockTheme = {
    block: ['bg-blue-500'],
    heading: {
        block: ['bg-red-500'],
        h1: ['bg-green-500'],
        h2: ['bg-yellow-500'],
        h3: ['bg-purple-500'],
        h4: ['bg-pink-500'],
        h5: ['bg-orange-500'],
        h6: ['bg-brown-500'],
    },
    paragraph: {
        block: ['bg-green-500'],
        strong: ['bg-red-500'],
        italic: ['bg-blue-500'],
        underline: ['bg-yellow-500'],
        strikethrough: ['bg-purple-500'],
        link: ['bg-orange-500'],
    },
    quote: {
        block: ['bg-brown-500'],
        link: ['bg-orange-500'],
    },
    list: {
        block: ['bg-purple-500'],
        ordered: ['bg-pink-500'],
        unordered: ['bg-orange-500'],
    },
    code: {
        block: ['bg-brown-500'],
        language: ['bg-orange-500'],
    },
    image: {
        block: ['bg-orange-500'],
        image: ['bg-purple-500'],
    },
};

const overrideBlock = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    if (override.block) result.block = [...override.block];
};

const overrideHeading = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const heading = { ...result.heading };
    if (override.heading) {
        if (heading.block) heading.block = [...heading.block];
        if (heading.h1) heading.h1 = [...heading.h1];
        if (heading.h2) heading.h2 = [...heading.h2];
        if (heading.h3) heading.h3 = [...heading.h3];
        if (heading.h4) heading.h4 = [...heading.h4];
        if (heading.h5) heading.h5 = [...heading.h5];
        if (heading.h6) heading.h6 = [...heading.h6];
    }
    return heading;
};

const overrideParagraph = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const paragraph = { ...result.paragraph };
    if (override.paragraph) {
        if (paragraph.block) paragraph.block = [...paragraph.block];
        if (paragraph.strong) paragraph.strong = [...paragraph.strong];
        if (paragraph.italic) paragraph.italic = [...paragraph.italic];
        if (paragraph.underline) paragraph.underline = [...paragraph.underline];
        if (paragraph.strikethrough) paragraph.strikethrough = [...paragraph.strikethrough];
        if (paragraph.link) paragraph.link = [...paragraph.link];
    }
    return paragraph;
};

const overrideQuote = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const quote = { ...result.quote };
    if (override.quote) {
        if (quote.block) quote.block = [...quote.block];
        if (quote.link) quote.link = [...quote.link];
    }
    return quote;
};

const overrideList = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const list = { ...result.list };
    if (override.list) {
        if (list.block) list.block = [...list.block];
        if (list.ordered) list.ordered = [...list.ordered];
        if (list.unordered) list.unordered = [...list.unordered];
    }
    return list;
};

const overrideCode = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const code = { ...result.code };
    if (override.code) {
        if (code.block) code.block = [...code.block];
        if (code.language) code.language = [...code.language];
    }
    return code;
};

const overrideImage = (result: StrapiBlockTheme, override: Partial<StrapiBlockTheme>) => {
    const image = { ...result.image };
    if (override.image) {
        if (image.block) image.block = [...image.block];
        if (image.image) image.image = [...image.image];
    }
    return image;
};

const extendBlock = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.block) return {
        ...result,
        block: [...result.block, ...extend.block],
    };
    return result;
};

const extendHeading = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.heading) {
        const heading = { ...result.heading };
        const headingProps: Array<keyof StrapiBlockThemeHeading> = Object.keys(heading) as Array<keyof StrapiBlockThemeHeading>;
        headingProps.forEach((prop: keyof StrapiBlockThemeHeading) => {
            if (extend?.heading?.[prop]) heading[prop] = [...heading[prop], ...extend.heading[prop]];
        });
        return {
            ...result,
            heading: heading,
        };
    }
    return result;
};

const extendParagraph = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.paragraph) {
        const paragraph = extend.paragraph;
        if (paragraph.block) result.paragraph.block = [...result.paragraph.block, ...paragraph.block];
        if (paragraph.strong) result.paragraph.strong = [...result.paragraph.strong, ...paragraph.strong];
        if (paragraph.italic) result.paragraph.italic = [...result.paragraph.italic, ...paragraph.italic];
        if (paragraph.underline) result.paragraph.underline = [...result.paragraph.underline, ...paragraph.underline];
        if (paragraph.strikethrough) result.paragraph.strikethrough = [...result.paragraph.strikethrough, ...paragraph.strikethrough];
        if (paragraph.link) result.paragraph.link = [...result.paragraph.link, ...paragraph.link];
    }
};

const extendQuote = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.quote) {
        const quote = extend.quote;
        if (quote.block) result.quote.block = [...result.quote.block, ...quote.block];
        if (quote.link) result.quote.link = [...result.quote.link, ...quote.link];
    }
};

const extendList = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.list) {
        const list = extend.list;
        if (list.block) result.list.block = [...result.list.block, ...list.block];
        if (list.ordered) result.list.ordered = [...result.list.ordered, ...list.ordered];
        if (list.unordered) result.list.unordered = [...result.list.unordered, ...list.unordered];
    }
};

const extendCode = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.code) {
        const code = extend.code;
        if (code.block) result.code.block = [...result.code.block, ...code.block];
        if (code.language) result.code.language = [...result.code.language, ...code.language];
    }
};

const extendImage = (result: StrapiBlockTheme, extend: Partial<StrapiBlockTheme>) => {
    if (extend.image) {
        const image = extend.image;
        if (image.block) result.image.block = [...result.image.block, ...image.block];
        if (image.image) result.image.image = [...result.image.image, ...image.image];
    }
};

export const buildThemeObject = (theme: StrapiBlockUserTheme, defaultTheme: StrapiBlockTheme): StrapiBlockTheme => {
    const result = { ...defaultTheme };

    // Obsługa override - całkowite nadpisanie wybranych parametrów
    if (theme.override) {
        return {
            ...result,
            block: overrideBlock(result, theme.override),
            heading: overrideHeading(result, theme.override),
            paragraph: overrideParagraph(result, theme.override),
            quote: overrideQuote(result, theme.override),
            list: overrideList(result, theme.override),
            code: overrideCode(result, theme.override),
            image: overrideImage(result, theme.override),
        };
    }

    // Obsługa extend - rozszerzenie tablic klas
    if (theme.extend) {
        extendBlock(result, theme.extend);
        extendHeading(result, theme.extend);
        extendParagraph(result, theme.extend);
        extendQuote(result, theme.extend);
        extendList(result, theme.extend);
        extendCode(result, theme.extend);
        extendImage(result, theme.extend);
    }

    return result;
};