import { describe, it, expect } from '@jest/globals';
import { renderBlocks, sanitizeStrapiNodeData } from '../strapi';
import type { StrapiBlockField, StrapiBlockTextItem, StrapiBlockLinkItem } from '../../types/strapi';

describe('strapi.ts', () => {
    describe('renderBlocks', () => {
        it('should render paragraph blocks with text', () => {
            const blocks: StrapiBlockField = [{
                type: 'paragraph',
                children: [
                    { type: 'text', text: 'Hello World' } as StrapiBlockTextItem
                ]
            }];
            const result = renderBlocks(blocks);
            expect(result).toEqual(['Hello World']);
        });

        it('should render paragraph blocks with bold text', () => {
            const blocks: StrapiBlockField = [{
                type: 'paragraph',
                children: [
                    { type: 'text', text: 'Hello', bold: true } as StrapiBlockTextItem,
                    { type: 'text', text: ' World' } as StrapiBlockTextItem
                ]
            }];
            const result = renderBlocks(blocks);
            expect(result).toEqual(['<strong>Hello</strong> World']);
        });

        it('should handle line breaks in text', () => {
            const blocks: StrapiBlockField = [{
                type: 'paragraph',
                children: [
                    { type: 'text', text: 'Hello\nWorld' } as StrapiBlockTextItem
                ]
            }];
            const result = renderBlocks(blocks);
            expect(result).toEqual(['Hello<br />World']);
        });

        it('should handle HTML line breaks in text', () => {
            const blocks: StrapiBlockField = [{
                type: 'paragraph',
                children: [
                    { type: 'text', text: 'Hello<br />World' } as StrapiBlockTextItem
                ]
            }];
            const result = renderBlocks(blocks);
            expect(result).toEqual(['Hello<br />World']);
        });

        it('should return empty string for non-paragraph blocks', () => {
            const blocks: StrapiBlockField = [{
                type: 'heading',
                children: [
                    { type: 'text', text: 'Hello World' } as StrapiBlockTextItem
                ],
                level: 1
            }];
            const result = renderBlocks(blocks);
            expect(result).toEqual(['']);
        });
    });

    describe('sanitizeStrapiNodeData', () => {
        it('should filter out nodes without text or url', () => {
            const data = [
                { type: 'text', text: 'Hello' } as StrapiBlockTextItem,
                { type: 'link', url: 'https://example.com' } as StrapiBlockLinkItem,
                { type: 'text' } as StrapiBlockTextItem,
                { type: 'link' } as StrapiBlockLinkItem
            ];
            const result = sanitizeStrapiNodeData(data);
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ type: 'text', text: 'Hello' });
            expect(result[1]).toEqual({ type: 'link', url: 'https://example.com' });
        });

        it('should handle empty array', () => {
            const result = sanitizeStrapiNodeData([]);
            expect(result).toEqual([]);
        });

        it('should handle array with only invalid nodes', () => {
            const data = [
                { type: 'text' } as StrapiBlockTextItem,
                { type: 'link' } as StrapiBlockLinkItem
            ];
            const result = sanitizeStrapiNodeData(data);
            expect(result).toEqual([]);
        });
    });
}); 