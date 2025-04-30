import type { StrapiBlockField, StrapiBlockLinkItem, StrapiBlockNode, StrapiBlockTextItem } from "../types/strapi";

const renderBlocksParagraph = (block: StrapiBlockTextItem): string => {
    if (block.bold) {
        return `<strong>${renderLineBreaks(block.text)}</strong>`;
    }
    return renderLineBreaks(block.text);
};

const renderLineBreaks = (text: string): string => 
    text.split(/\n|<br \/>/ig).join('<br />');

export const renderBlocks = (blocks: StrapiBlockField) => {
    return blocks.map((block) => {
        if (block.type === 'paragraph') {
            return block.children.reduce((acc: string, curr: StrapiBlockTextItem) => {
                return `${acc}${renderBlocksParagraph(curr)}`;
            },'');
        }
        return '';
    });
};

export const sanitizeStrapiNodeData = (data: Array<StrapiBlockNode>) => data.filter((item: StrapiBlockNode) => {
    return (item as StrapiBlockTextItem)?.text || (item as StrapiBlockLinkItem)?.url;
});