import { describe, it, expect } from '@jest/globals';
import { StrapiBlockThemeDefault, buildThemeObject, renderPropertyClasses } from '../theme';
import { StrapiBlockTheme, StrapiBlockUserTheme } from '../../types/theme';
import { ForceInvalid } from '../../types/common';

describe('theme.ts', () => {
    describe('buildThemeObject', () => {
        it('should return the default theme when no modifications are provided', () => {
            const theme = {};
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
                    }
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(['bg-red-500']);
            expect(result.heading.h1).toEqual(['bg-blue-500']);
            expect(result.heading.h2).toEqual(StrapiBlockThemeDefault.heading.h2);
        });
        it('should extend properties when using extend', () => {
            const theme = {
                extend: {
                    block: ['bg-red-500'],
                    heading: {
                        block: ['bg-red-500'],
                        h1: ['bg-blue-500'],
                    }
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual([...StrapiBlockThemeDefault.block, 'bg-red-500']);
            expect(result.heading.h1).toEqual([...StrapiBlockThemeDefault.heading.h1, 'bg-blue-500']);
        });
        it('should handle both overwrite and extend', () => {
            const theme = {
                overwrite: {
                    block: ['bg-red-500']
                },
                extend: {
                    heading: {
                        block: ['bg-red-500'],
                        h1: ['bg-blue-500'],
                    }
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(['bg-red-500']);
            expect(result.heading.h1).toEqual([...StrapiBlockThemeDefault.heading.h1, 'bg-blue-500']);
        });
        it('should preserve nested structures', () => {
            const theme = {
                extend: {
                    paragraph: {
                        block: ['bg-red-500'],
                        strong: ['bg-blue-500'],
                    }
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.paragraph.block).toEqual([...StrapiBlockThemeDefault.paragraph.block, 'bg-red-500']);
            expect(result.paragraph.strong).toEqual([...StrapiBlockThemeDefault.paragraph.strong, 'bg-blue-500']);
            expect(result.paragraph.italic).toEqual(StrapiBlockThemeDefault.paragraph.italic);
        });
        it('should handle empty arrays', () => {
            const theme = {
                overwrite: {
                    block: []
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual([]);
        });
        it('should preserve original values when modification is empty', () => {
            const theme = {
                extend: {
                    block: [],
                    heading: {}
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(StrapiBlockThemeDefault.block);
            expect(result.heading).toEqual(StrapiBlockThemeDefault.heading);
        });
        it('should handle deep nested structures with multiple levels', () => {
            const theme: StrapiBlockUserTheme = {
                extend: {
                    paragraph: {
                        block: ['bg-red-500'],
                        strong: ['bg-blue-500']
                    }
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.paragraph.block).toEqual([...StrapiBlockThemeDefault.paragraph.block, 'bg-red-500']);
            expect(result.paragraph.strong).toEqual([...StrapiBlockThemeDefault.paragraph.strong, 'bg-blue-500']);
        });
        it('should handle undefined values in theme modifications', () => {
            const theme: StrapiBlockUserTheme = {
                extend: {
                    block: undefined,
                    heading: undefined
                }
            };
            const result = buildThemeObject(theme, StrapiBlockThemeDefault);
            expect(result.block).toEqual(StrapiBlockThemeDefault.block);
            expect(result.heading).toEqual(StrapiBlockThemeDefault.heading);
        });
    });
    describe('renderPropertyClasses', () => {
        it('should render root level classes when given a single property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, 'block');
            expect(result).toBe('astro-strapi-block');
        });
        it('should render nested level classes when given an array path', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, ['heading', 'h1']);
            expect(result).toBe('text-6xl font-bold mb-4');
        });
        it('should return empty string for non-existent root property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, 'nonExistent' as ForceInvalid);
            expect(result).toBe('');
        });
        it('should return empty string for non-existent nested property', () => {
            const result = renderPropertyClasses(StrapiBlockThemeDefault, ['heading', 'nonExistent'] as ForceInvalid);
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
        it('should handle empty arrays in theme properties', () => {
            const theme: StrapiBlockTheme = {
                ...StrapiBlockThemeDefault,
                block: []
            };
            const result = renderPropertyClasses(theme, 'block');
            expect(result).toBe('');
        });
        it('should handle undefined values in theme properties', () => {
            const theme: StrapiBlockTheme = {
                ...StrapiBlockThemeDefault,
                block: undefined as ForceInvalid
            };
            const result = renderPropertyClasses(theme, 'block');
            expect(result).toBe('');
        });
        it('should handle non-array values in theme properties', () => {
            const theme: StrapiBlockTheme = {
                ...StrapiBlockThemeDefault,
                block: 'not-an-array' as ForceInvalid
            };
            const result = renderPropertyClasses(theme, 'block');
            expect(result).toBe('');
        });
    });
});
