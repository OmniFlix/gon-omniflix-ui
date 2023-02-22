import { mediaReference } from './ipfs';

export const ibcName = (value) => {
    let name = null;
    if (value.name && value.name.value) {
        name = value.name.value;
        return name;
    }

    Object.keys(value).map((key) => {
        const val = key && key.split(':name');
        if (val && val.length && val.length > 1) {
            name = value[key].value;
            return name;
        }
        return null;
    });

    return name;
};

export const ibcSymbol = (value) => {
    let symbol = null;
    if (value.symbol && value.symbol.value) {
        symbol = value.symbol.value;
        return symbol;
    }

    Object.keys(value).map((key) => {
        const val = key && key.split(':symbol');
        if (val && val.length && val.length > 1) {
            symbol = value[key].value;
            return symbol;
        }
        return null;
    });

    return symbol;
};

export const ibcDescription = (value) => {
    let description = null;
    if (value.description && value.description.value) {
        description = value.description.value;
        return description;
    }

    Object.keys(value).map((key) => {
        const val = key && key.split(':description');
        if (val && val.length && val.length > 1) {
            description = value[key].value;
            return description;
        }
        return null;
    });

    return description;
};

export const ibcMedia = (value) => {
    let url = null;
    if (value.media_uri && value.media_uri.value) {
        url = value.media_uri.value;
        return mediaReference(url);
    }

    Object.keys(value).map((key) => {
        if (url) {
            return url;
        }

        const val = key && key.split(':media_uri');
        if (val && val.length && val.length > 1) {
            url = value[key].value;
            return url;
        }

        const val1 = key && key.split(':uri');
        if (val1 && val1.length && val1.length > 1) {
            url = value[key].value;
            return url;
        }

        const val2 = key && key.split(':uri_hash');
        if (val2 && val2.length && val2.length > 1) {
            url = value[key].value;
            return url;
        }

        return url;
    });

    return mediaReference(url);
};

export const ibcPreview = (value) => {
    let url = null;
    if (value.preview_uri && value.preview_uri.value) {
        url = value.preview_uri.value;
        return mediaReference(url);
    }

    Object.keys(value).map((key) => {
        if (url) {
            return url;
        }

        const val = key && key.split(':preview_uri');
        if (val && val.length && val.length > 1) {
            url = value[key].value;
            return url;
        }

        const val1 = key && key.split(':uri');
        if (val1 && val1.length && val1.length > 1) {
            url = value[key].value;
            return url;
        }

        const val2 = key && key.split(':uri_hash');
        if (val2 && val2.length && val2.length > 1) {
            url = value[key].value;
            return url;
        }
        return url;
    });

    return mediaReference(url);
};
