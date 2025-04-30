

export type StrapiMedia = {
    url: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
    formats: {
        small?: StrapiMedia;
        medium?: StrapiMedia;
        large?: StrapiMedia;
    },
};

export type StrapiBlockTextItem = {
    text: string;
    type: 'text';
    bold?: boolean;
    italic?: boolean;
};

export type StrapiBlockLinkItem = {
    url: string;
    type: 'link';
    children: Array<StrapiBlockTextItem>;
};

export type StrapiBlockListItem = {
    type: 'list-item';
    children: Array<StrapiBlockNode>;
};

export type StrapiBlockNode = StrapiBlockTextItem | StrapiBlockLinkItem;

export type StrapiBlockHeading = {
    type: 'heading';
    level: number;
};

export type StrapiBlockListType = 'ordered' | 'unordered'

export type StrapiBlockList = {
    type: 'list';
    format: StrapiBlockListType;
    children: Array<StrapiBlockListItem>
};

export type StrapiBlockParagraph = {
    type: 'paragraph';
};

export type StrapiBlockVariations = StrapiBlockParagraph | StrapiBlockHeading | StrapiBlockList;

export type StrapiBlockType = 'paragraph' | 'heading' | 'list';

export type StrapiBlockParagraphClass = {
    strong?: string;
    em?: string;
    a?: string;
    master?: string;
};

export type StrapiBlockClassExtension = {
    paragraph?: StrapiBlockParagraphClass | string;
    heading?: string;
    list?: string;
};

export type StrapiBlock<T = StrapiBlockVariations> = {
    children: Array<StrapiBlockTextItem>;
} & T;

export type StrapiBlockField = Array<StrapiBlock>;
