import type { StrapiBlock, StrapiBlockTheme, StrapiBlockThemeCode, StrapiBlockThemeHeading, StrapiBlockThemeList, StrapiBlockThemeParagraph, StrapiBlockThemeQuote, StrapiBlockUserTheme, StrapiBlockThemeImage, StrapiRenderClassesType, StrapiRenderClassesPropretyType, DeepPartial } from '../types';

export const StrapiBlockThemeDefault: StrapiBlockTheme = {
    block: ['astro-strapi-block'],
    heading: {
        block: ['astro-strapi-block-heading'],
        h1: ['text-6xl', 'font-bold', 'mb-4'],
        h2: ['text-5xl', 'font-bold', 'mb-4'],
        h3: ['text-4xl', 'font-bold', 'mb-4'],
        h4: ['text-3xl', 'font-bold', 'mb-4'],
        h5: ['text-2xl', 'font-bold', 'mb-4'],
        h6: ['text-xl', 'font-bold', 'mb-4'],
        content: {
            block: [],
            span: [],
            strong: ['font-bold'],
            italic: ['italic'],
            underline: ['underline'],
            strikethrough: ['line-through'],
            link: ['text-blue-500', 'underline', 'hover:text-blue-800'],
        },
    },
    paragraph: {
        block: ['astro-strapi-block-paragraph', 'mb-4'],
        span: [],
        strong: ['font-bold'],
        italic: ['italic'],
        underline: ['underline'],
        strikethrough: ['line-through'],
        link: ['text-blue-500', 'underline', 'hover:text-blue-800'],
    },
    quote: {
        block: ['astro-strapi-block-quote', 'border-l-4', 'border-gray-300', 'pl-4', 'mb-4'],
        span: [],
        strong: ['font-bold'],
        italic: ['italic'],
        underline: ['underline'],
        strikethrough: ['line-through'],
        link: ['text-blue-500', 'underline', 'hover:text-blue-800'],
    },
    list: {
        block: ['astro-strapi-block-list', 'my-4'],
        ordered: ['list-decimal', 'pl-6'],
        unordered: ['list-disc', 'pl-6'],
        item: ['mb-2', 'last:mb-0'],
    },
    code: {
        block: [
            'astro-strapi-block-code',
            'mb-4',
            'bg-gray-200',
            'p-4',
            'rounded-md',
            'text-sm',
            'font-mono',
            'last:mb-0',
        ],
        language: ['astro-strapi-block-code-language', 'inline-block', 'text-xs', 'font-sans', 'font-medium', 'bg-gray-300', 'py-1', 'px-4', 'mb-2', 'rounded-full', 'text-gray-700'],
    },
    image: {
        block: [
            'mb-4',
            'w-full',
            'h-auto',
            'flex',
            'items-center',
            'justify-center',
            'last:mb-0',
        ],
        image: ['rounded-md'],
        caption: ['text-sm', 'mb-2', 'text-gray-900', 'text-center', 'italic']
    },
};

const modifyThemeProperty = <T extends Record<string, any>>(
    data: T,
    modify: DeepPartial<T>,
    overwrite: boolean = false
): T => {
    const result = { ...data };
    const modifyProps = Object.keys(modify) as Array<keyof T>;

    modifyProps.forEach((prop) => {
        const modifyValue = modify[prop as keyof typeof modify];
        if (modifyValue !== undefined && modifyValue !== null) {
            if (Array.isArray(modifyValue)) {
                result[prop] = (overwrite
                    ? [...(modifyValue as Array<string>)]
                    : [...(data[prop] as Array<string>), ...(modifyValue as Array<string>)]) as T[keyof T];
            } else if (typeof modifyValue === 'object') {
                result[prop] = modifyThemeProperty<T[keyof T]>(data[prop], modifyValue as DeepPartial<T[keyof T]>, overwrite);
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

export const getPropertyClass = <T extends keyof StrapiBlockTheme>(theme: StrapiBlockTheme, path: T | [T, keyof StrapiBlockTheme[T]]): Array<string> => {
    const [rootLevel, subLevel] = Array.isArray(path) ? path : [path];

    if (rootLevel && subLevel && theme[rootLevel] && typeof theme[rootLevel] === 'object') {
        const nestedValue = (theme[rootLevel] as Record<string, string[]>)[subLevel as string];
        return Array.isArray(nestedValue) ? nestedValue : [];
    } else if (rootLevel && theme[rootLevel]) {
        const value = theme[rootLevel];
        return Array.isArray(value) ? value : [];
    }

    return [];
};

export const renderPropertyClasses = <T extends keyof StrapiBlockTheme>(theme: StrapiBlockTheme, path: T | [T, keyof StrapiBlockTheme[T]]): string =>
    getPropertyClass(theme, path).join(' ');