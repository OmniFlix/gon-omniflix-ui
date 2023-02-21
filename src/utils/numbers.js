export const splitDecimals = (value) => {
    return value.toString().split('.');
};

export const commaSeparator = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const noExponent = (value) => {
    const data = String(value).split(/[eE]/);

    if (data.length === 1) {
        return data[0];
    }

    let z = '';
    const sign = this < 0 ? '-' : '';
    const str = data[0].replace('.', '');
    let mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) {
            z += '0';
        }
        return z + str.replace(/^\\-/, '');
    }

    mag -= str.length;

    while (mag--) {
        z += '0';
    }
    return str + z;
};
