const get = (obj: any, key: string, defaultValue: any = undefined) => obj?.[key] ?? defaultValue;

export type TextSizes<T extends string = 'base' | 'medium' | 'large' | 'xlarge' | '2xlarge'> = T;
export type TextClasses<T extends string = TextSizes> = {
    [key in T]?: string;
};

export type TextColorClasses<T extends string = any> = {
    [key in T]?: string;
};

export const defaultGetBodyTextClass = (size: string, isMobile: boolean = false): string => {
    const sizeUnified = size.toLowerCase() as TextSizes;
    const classes: TextClasses = {
        'base': 'text-body-base',
        'medium': 'text-body-medium',
        'large': 'text-body-large',
    };
    const classesMobile: TextClasses = {
        'base': 'sm:max-md:text-mobile-body-base',
        'medium': 'sm:max-md:text-mobile-body-medium',
        'large': 'sm:max-md:text-mobile-body-large',
    }

    if (isMobile) {
        return get(classesMobile, sizeUnified);
    }
    return get(classes, sizeUnified);
};

export const defaultGetHeaderTextClass = (size: string, isMobile: boolean = false): string => {
    const sizeUnified = size.toLowerCase() as TextSizes;
    const classes: TextClasses = {
        'base': 'text-base',
        'medium': 'text-medium',
        'large': 'text-large',
        'xlarge': 'text-xlarge',
        '2xlarge': 'text-2xlarge',
    };
    const classesMobile: TextClasses = {
        'base': 'sm:max-md:text-mobile-base',
        'medium': 'sm:max-md:text-mobile-medium',
        'large': 'sm:max-md:text-mobile-large',
        'xlarge': 'sm:max-md:text-mobile-xlarge',
        '2xlarge': 'sm:max-md:text-mobile-2xlarge',
    }
    if (isMobile) {
        return get(classesMobile, sizeUnified, '');
    }
    return get(classes, sizeUnified, '');
};

export const defaultGetTextContentColor = (color: string): string => {
    const classes: TextColorClasses = {
        'primary': 'text-primary',
        'secondary': 'text-secondary',
        'tertiary': 'text-tertiary',
        'alert': 'text-alert',
        'warning': 'text-warning',
        'success': 'text-success',
        'info': 'text-info',
        'disabled': 'text-disabled',
        'inverted': 'text-inverted',
        'inverted-secondary': 'text-inverted-secondary',
        'inverted-tertiary': 'text-inverted-tertiary',
        'inverted-disabled': 'text-inverted-disabled',
    };
    return get(classes, color, '');
}