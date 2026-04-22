import type { StrapiBlock, StrapiBlockListType, StrapiBlockTheme, StrapiBlockThemeCode, StrapiBlockThemeHeading, StrapiBlockThemeList, StrapiBlockThemeParagraph, StrapiBlockThemeQuote, StrapiBlockUserTheme, StrapiBlockThemeImage, StrapiRenderClassesType, StrapiRenderClassesPropretyType, DeepPartial } from '../types';

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
        ordered: ['pl-6'],
        unordered: ['pl-6'],
        item: ['mb-2', 'last:mb-0'],
        nested: ['mb-2'],
        indent: {
            ordered: ['list-decimal', 'list-[lower-latin]', 'list-[lower-roman]', 'list-[upper-latin]', 'list-[upper-roman]', 'list-decimal'],
            unordered: ['list-disc', 'list-[circle]', 'list-[square]', 'list-disk', 'list-[circle]', 'list-[square]'],
        }
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

function getPropertyClassImpl(theme: StrapiBlockTheme, path: keyof StrapiBlockTheme | ReadonlyArray<string | number>): Array<string> {
    const pathArr = Array.isArray(path) ? path : [path];
    let current: any = theme;

    for (let i = 0; i < pathArr.length; i++) {
        if (!current) break;
        current = current[pathArr[i]];
    }

    return Array.isArray(current) ? current : [];
}

export function getPropertyClass(
    theme: StrapiBlockTheme,
    path: ['list', 'indent', StrapiBlockListType],
): Array<string>;
export function getPropertyClass<T extends keyof StrapiBlockTheme, K extends keyof StrapiBlockTheme[T]>(
    theme: StrapiBlockTheme,
    path: T | [T, K],
): Array<string>;
export function getPropertyClass(theme: StrapiBlockTheme, path: keyof StrapiBlockTheme | ReadonlyArray<string | number>): Array<string> {
    return getPropertyClassImpl(theme, path);
}

export function renderPropertyClasses(
    theme: StrapiBlockTheme,
    path: ['list', 'indent', StrapiBlockListType],
): string;
export function renderPropertyClasses<T extends keyof StrapiBlockTheme>(theme: StrapiBlockTheme, path: T | [T, keyof StrapiBlockTheme[T]]): string;
export function renderPropertyClasses(theme: StrapiBlockTheme, path: keyof StrapiBlockTheme | ReadonlyArray<string | number>): string {
    return getPropertyClassImpl(theme, path).join(' ');
}