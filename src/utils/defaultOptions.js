import IrisIcon from '../assets/chains/iris.svg';
import OmniIcon from '../assets/chains/omniflix.svg';
import StargazeIcon from '../assets/chains/stargaze.svg';
import JunoIcon from '../assets/chains/juno.svg';
import OsmoIcon from '../assets/chains/osmo.svg';
import { config } from '../config';

export const list = [{
    icon: OmniIcon,
    name: 'OmniFlix Hub',
    value: 'omniflix',
}, {
    icon: StargazeIcon,
    name: 'Stargaze',
    value: 'stargaze',
}, {
    icon: IrisIcon,
    name: 'IrisNet',
    value: 'iris',
}, {
    icon: JunoIcon,
    name: 'Juno',
    value: 'juno',
}, {
    icon: OsmoIcon,
    name: 'Uptick',
    value: 'uptick',
}];

export const tokensList = [{
    network: config,
    value: 'uflix',
    label: 'FLIX',
}];

export const customSchema = {
    name: 'Custom Schema',
    schema: {
        id: 'custom_schema',
        properties: {},
        required: [],
        type: 'object',
    },
};

export const noSchema = {
    name: 'No Schema',
};

export const schemaPropertyTypes = [{
    name: 'string',
}, {
    name: 'boolean',
}, {
    name: 'number',
}, {
    name: 'date',
}, {
    name: 'textarea',
}];
