import { describe, it, expect } from '@jest/globals';
import { StrapiBlockThemeDefault, buildThemeObject, renderPropertyClasses } from '../theme';
import type { StrapiBlockTheme, StrapiBlockUserTheme, StrapiBlockThemeHeading, StrapiBlockThemeParagraph } from '../../types';

describe('theme.ts', () => {
    describe('buildThemeObject', () => {
        it('should return the default theme when no modifications are provided', () => {
            const theme: StrapiBlockUserTheme = {};
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result).toEqual(StrapiBlockThemeDefault);
        });

        it('should overwrite properties when using overwrite', () => {
            const theme: StrapiBlockUserTheme = {
                overwrite: {
                    block: ['bg-red-500'],
                    heading: {
                        block: ['bg-red-500'],
                        h1: ['bg-blue-500'],
                    } as StrapiBlockThemeHeading
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(['bg-red-500']);
            expect(result.heading.h1).toEqual(['bg-blue-500']);
            expect(result.heading.h2).toEqual(StrapiBlockThemeDefault.heading.h2);
        });

        it('should extend properties when using extend', () => {
            const theme: StrapiBlockUserTheme = {
                extend: {
                    block: ['bg-red-500'],
                    heading: {
                        block: ['bg-red-500'],
                        h1: ['bg-blue-500'],
                    } as StrapiBlockThemeHeading
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual([...StrapiBlockThemeDefault.block, 'bg-red-500']);
            expect(result.heading.h1).toEqual([...StrapiBlockThemeDefault.heading.h1, 'bg-blue-500']);
        });

        it('should handle both overwrite and extend', () => {
            const theme: StrapiBlockUserTheme = {
                overwrite: {
                    block: ['bg-red-500']
                } as Partial<StrapiBlockTheme>,
                extend: {
                    heading: {
                        block: ['bg-red-500'],
                        h1: ['bg-blue-500'],
                    } as StrapiBlockThemeHeading
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(['bg-red-500']);
            expect(result.heading.h1).toEqual([...StrapiBlockThemeDefault.heading.h1, 'bg-blue-500']);
        });

        it('should preserve nested structures', () => {
            const theme: StrapiBlockUserTheme = {
                extend: {
                    paragraph: {
                        block: ['bg-red-500'],
                        strong: ['bg-blue-500'],
                    } as StrapiBlockThemeParagraph
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.paragraph.block).toEqual([...StrapiBlockThemeDefault.paragraph.block, 'bg-red-500']);
            expect(result.paragraph.strong).toEqual([...StrapiBlockThemeDefault.paragraph.strong, 'bg-blue-500']);
            expect(result.paragraph.italic).toEqual(StrapiBlockThemeDefault.paragraph.italic);
        });

        it('should handle empty arrays', () => {
            const theme: StrapiBlockUserTheme = {
                overwrite: {
                    block: []
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual([]);
        });

        it('should preserve original values when modification is empty', () => {
            const theme: StrapiBlockUserTheme = {
                extend: {
                    block: [],
                    heading: {} as StrapiBlockThemeHeading
                } as Partial<StrapiBlockTheme>
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(StrapiBlockThemeDefault.block);
            expect(result.heading).toEqual(StrapiBlockThemeDefault.heading);
        });
    });

    describe('renderPropertyClasses', () => {
        it('should render root level classes when given a single property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, 'block');
            expect(result).toBe('bg-blue-500');
        });

        it('should render nested level classes when given an array path', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, ['heading', 'h1']);
            expect(result).toBe('bg-green-500');
        });

        it('should return empty string for non-existent root property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, 'nonExistent' as keyof StrapiBlockTheme);
            expect(result).toBe('');
        });

        it('should return empty string for non-existent nested property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, ['heading', 'nonExistent' as keyof StrapiBlockThemeHeading]);
            expect(result).toBe('');
        });

        it('should handle multiple classes in root level', () => {
            const theme = {
                ...StrapiBlockThemeDefault,
                block: ['bg-blue-500', 'text-white']
            };
            const result = renderPropertyClasses(theme, 'block');
            expect(result).toBe('bg-blue-500 text-white');
        });

        it('should handle multiple classes in nested level', () => {
            const theme = {
                ...StrapiBlockThemeDefault,
                heading: {
                    ...StrapiBlockThemeDefault.heading,
                    h1: ['bg-green-500', 'text-white']
                }
            };
            const result = renderPropertyClasses(theme, ['heading', 'h1']);
            expect(result).toBe('bg-green-500 text-white');
        });
    });
}); 