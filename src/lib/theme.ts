import type { StrapiBlock, StrapiBlockTheme, StrapiBlockThemeCode, StrapiBlockThemeHeading, StrapiBlockThemeList, StrapiBlockThemeParagraph, StrapiBlockThemeQuote, StrapiBlockUserTheme, StrapiBlockThemeImage, StrapiRenderClassesType, StrapiRenderClassesPropretyType } from '../types';

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

const modifyThemeProperty = <T extends Record<string, any>>(
    data: T,
    modify: Partial<T>,
    overwrite: boolean = false
): T => {
    const result = { ...data };
    const modifyProps = Object.keys(modify) as Array<keyof T>;
    
    modifyProps.forEach((prop) => {
        if (modify[prop]) {
            if (Array.isArray(modify[prop])) {
                result[prop] = (overwrite 
                    ? [...(modify[prop] as Array<string>)] 
                    : [...(data[prop] as Array<string>), ...(modify[prop] as Array<string>)]) as T[keyof T];
            } else if (typeof modify[prop] === 'object') {
                result[prop] = modifyThemeProperty<T[keyof T]>(data[prop], modify[prop], overwrite);
            }
        }
    });
    
    return result;
};

export const buildThemeObject = (theme: StrapiBlockUserTheme, defaultTheme: StrapiBlockTheme): StrapiBlockTheme => {
    let result = { ...defaultTheme };

    if (theme.overwrite) {
        result = modifyThemeProperty<StrapiBlockTheme>(result, theme.overwrite, true);
    }

    if (theme.extend) {
        result = modifyThemeProperty<StrapiBlockTheme>(result, theme.extend);
    }

    return result;
};

export const renderPropertyClasses = <T extends keyof StrapiBlockTheme>(theme: StrapiBlockTheme, path: T | [T, keyof StrapiBlockTheme[T]]): string => {
    const [rootLevel, subLevel] = Array.isArray(path) ? path : [path];

    if (rootLevel && subLevel && theme[rootLevel] && typeof theme[rootLevel] === 'object') {
        const nestedValue = (theme[rootLevel] as Record<string, string[]>)[subLevel as string];
        return Array.isArray(nestedValue) ? nestedValue.join(' ') : '';
    } else if (rootLevel && theme[rootLevel]) {
        const value = theme[rootLevel];
        return Array.isArray(value) ? value.join(' ') : '';
    }

    return '';
};