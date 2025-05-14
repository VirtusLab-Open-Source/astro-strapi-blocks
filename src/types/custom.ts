import { StrapiBlockTheme } from "./theme";

export type AstroComponent = any;
export type AstroComponentProps = {
    comp: AstroComponent;
} & Record<string, any>;
export type StrapiBlockUserComponents = Record<keyof StrapiBlockTheme, AstroComponent>;