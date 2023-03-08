import IrisIcon from '../assets/chains/iris.svg';
import OmniIcon from '../assets/chains/omniflix.svg';
import UpTickIcon from '../assets/chains/uptick.svg';
import StargazeIcon from '../assets/chains/stargaze.svg';
import JunoIcon from '../assets/chains/juno.svg';
import { config } from '../config';

export const tokensList = [{
    network: config,
    value: 'uflix',
    label: 'FLIX',
}];

export const list = [{
    icon: OmniIcon,
    name: 'OmniFlix',
    value: 'omniflix',
}, {
    icon: IrisIcon,
    name: 'IrisNet',
    value: 'iris',
}, {
    icon: UpTickIcon,
    name: 'Uptick',
    value: 'uptick',
}, {
    icon: StargazeIcon,
    name: 'Stargaze',
    value: 'stargaze',
    cosmwasm: true,
}, {
    icon: JunoIcon,
    name: 'Juno',
    value: 'juno',
    cosmwasm: true,
}];

export const schemaList = [{
    name: 'Video Schema',
    schema: {
        id: 'video',
        type: 'object',
        properties: {
            type: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            genre: {
                type: 'string',
            },
            tags: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            rights: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        delivery_medium: {
                            type: 'string',
                        },
                        format_of_delivery: {
                            type: 'string',
                        },
                        territories: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        languages: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        original: {
                            type: 'boolean',
                        },
                        dub: {
                            type: 'boolean',
                        },
                        remake: {
                            type: 'boolean',
                        },
                    },
                    required: [],
                },
            },
        },
        required: [
            'type',
            'title',
        ],
    },
}, {
    name: 'Ticket Schema',
    schema: {
        id: 'ticket',
        type: 'object',
        properties: {
            type: {
                type: 'string',
            },
            event_name: {
                type: 'string',
            },
            ticket_valid_from: {
                type: 'date',
            },
            ticket_valid_upto: {
                type: 'date',
            },
            price: {
                type: 'number',
            },
            ticket_url: {
                type: 'string',
            },
        },
        required: [
            'type',
            'event_name',
            'ticket_valid_from',
            'ticket_valid_upto',
            'price',
            'ticket_url',
        ],
    },
}, {
    name: 'PFP Schema',
    schema: {
        id: 'pfp',
        type: 'object',
        properties: {
            type: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            id: {
                type: 'number',
                min: 1,
            },
            hair: {
                type: 'string',
            },
            eyes: {
                type: 'string',
            },
            face: {
                type: 'string',
            },
            teeth: {
                type: 'string',
            },
            ears: {
                type: 'string',
            },
            mouth: {
                type: 'string',
            },
            clothes: {
                type: 'string',
            },
            accessories: {
                type: 'string',
            },
        },
        required: [
            'type',
            'name',
            'id',
        ],
    },
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

export const suffixOptions = [{
    name: 'NFT - 1',
    value: ' - ',
}, {
    name: 'NFT #1',
    value: ' #',
}, {
    name: 'NFT (1)',
    value: ' ()',
}, {
    name: 'No Suffix',
    value: null,
}];
