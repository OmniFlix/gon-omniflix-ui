/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {PageRequest, PageResponse} from "../../cosmos/base/query/v1beta1/pagination";
import {Collection, Denom, ONFT, Owner} from "./onft";

export const protobufPackage = "OmniFlix.onft.v1beta1";

export interface QueryCollectionRequest {
    denomId: string;
    pagination: PageRequest | undefined;
}

export interface QueryCollectionResponse {
    collection: Collection | undefined;
    pagination: PageResponse | undefined;
}

export interface QueryIBCCollectionRequest {
    hash: string;
    pagination: PageRequest | undefined;
}

export interface QueryDenomRequest {
    denomId: string;
}

export interface QueryIBCDenomRequest {
    hash: string;
}

export interface QueryDenomResponse {
    denom: Denom | undefined;
}

export interface QueryDenomsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
    owner: string;
}

export interface QueryDenomsResponse {
    denoms: Denom[];
    pagination: PageResponse | undefined;
}

export interface QueryONFTRequest {
    denomId: string;
    id: string;
}

export interface QueryONFTResponse {
    onft: ONFT | undefined;
}

export interface QueryOwnerONFTsRequest {
    denomId: string;
    owner: string;
    pagination: PageRequest | undefined;
}

export interface QueryOwnerONFTsResponse {
    owner: Owner | undefined;
    pagination: PageResponse | undefined;
}

export interface QuerySupplyRequest {
    denomId: string;
    owner: string;
}

export interface QuerySupplyResponse {
    amount: number;
}

function createBaseQueryCollectionRequest(): QueryCollectionRequest {
    return {denomId: "", pagination: undefined};
}

export const QueryCollectionRequest = {
    encode(message: QueryCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denomId !== "") {
            writer.uint32(10).string(message.denomId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCollectionRequest {
        return {
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryCollectionRequest): unknown {
        const obj: any = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryCollectionRequest>, I>>(base?: I): QueryCollectionRequest {
        return QueryCollectionRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryCollectionRequest>, I>>(object: I): QueryCollectionRequest {
        const message = createBaseQueryCollectionRequest();
        message.denomId = object.denomId ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryCollectionResponse(): QueryCollectionResponse {
    return {collection: undefined, pagination: undefined};
}

export const QueryCollectionResponse = {
    encode(message: QueryCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.collection !== undefined) {
            Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collection = Collection.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCollectionResponse {
        return {
            collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryCollectionResponse): unknown {
        const obj: any = {};
        message.collection !== undefined &&
        (obj.collection = message.collection ? Collection.toJSON(message.collection) : undefined);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryCollectionResponse>, I>>(base?: I): QueryCollectionResponse {
        return QueryCollectionResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryCollectionResponse>, I>>(object: I): QueryCollectionResponse {
        const message = createBaseQueryCollectionResponse();
        message.collection = (object.collection !== undefined && object.collection !== null)
            ? Collection.fromPartial(object.collection)
            : undefined;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryIBCCollectionRequest(): QueryIBCCollectionRequest {
    return {hash: "", pagination: undefined};
}

export const QueryIBCCollectionRequest = {
    encode(message: QueryIBCCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIBCCollectionRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIBCCollectionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryIBCCollectionRequest {
        return {
            hash: isSet(object.hash) ? String(object.hash) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryIBCCollectionRequest): unknown {
        const obj: any = {};
        message.hash !== undefined && (obj.hash = message.hash);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryIBCCollectionRequest>, I>>(base?: I): QueryIBCCollectionRequest {
        return QueryIBCCollectionRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryIBCCollectionRequest>, I>>(object: I): QueryIBCCollectionRequest {
        const message = createBaseQueryIBCCollectionRequest();
        message.hash = object.hash ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryDenomRequest(): QueryDenomRequest {
    return {denomId: ""};
}

export const QueryDenomRequest = {
    encode(message: QueryDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denomId !== "") {
            writer.uint32(10).string(message.denomId);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryDenomRequest {
        return {denomId: isSet(object.denomId) ? String(object.denomId) : ""};
    },

    toJSON(message: QueryDenomRequest): unknown {
        const obj: any = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(base?: I): QueryDenomRequest {
        return QueryDenomRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(object: I): QueryDenomRequest {
        const message = createBaseQueryDenomRequest();
        message.denomId = object.denomId ?? "";
        return message;
    },
};

function createBaseQueryIBCDenomRequest(): QueryIBCDenomRequest {
    return {hash: ""};
}

export const QueryIBCDenomRequest = {
    encode(message: QueryIBCDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIBCDenomRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIBCDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryIBCDenomRequest {
        return {hash: isSet(object.hash) ? String(object.hash) : ""};
    },

    toJSON(message: QueryIBCDenomRequest): unknown {
        const obj: any = {};
        message.hash !== undefined && (obj.hash = message.hash);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryIBCDenomRequest>, I>>(base?: I): QueryIBCDenomRequest {
        return QueryIBCDenomRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryIBCDenomRequest>, I>>(object: I): QueryIBCDenomRequest {
        const message = createBaseQueryIBCDenomRequest();
        message.hash = object.hash ?? "";
        return message;
    },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
    return {denom: undefined};
}

export const QueryDenomResponse = {
    encode(message: QueryDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denom !== undefined) {
            Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = Denom.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryDenomResponse {
        return {denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined};
    },

    toJSON(message: QueryDenomResponse): unknown {
        const obj: any = {};
        message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(base?: I): QueryDenomResponse {
        return QueryDenomResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(object: I): QueryDenomResponse {
        const message = createBaseQueryDenomResponse();
        message.denom = (object.denom !== undefined && object.denom !== null) ? Denom.fromPartial(object.denom) : undefined;
        return message;
    },
};

function createBaseQueryDenomsRequest(): QueryDenomsRequest {
    return {pagination: undefined, owner: ""};
}

export const QueryDenomsRequest = {
    encode(message: QueryDenomsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryDenomsRequest {
        return {
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: QueryDenomsRequest): unknown {
        const obj: any = {};
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(base?: I): QueryDenomsRequest {
        return QueryDenomsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(object: I): QueryDenomsRequest {
        const message = createBaseQueryDenomsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseQueryDenomsResponse(): QueryDenomsResponse {
    return {denoms: [], pagination: undefined};
}

export const QueryDenomsResponse = {
    encode(message: QueryDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.denoms) {
            Denom.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denoms.push(Denom.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryDenomsResponse {
        return {
            denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryDenomsResponse): unknown {
        const obj: any = {};
        if (message.denoms) {
            obj.denoms = message.denoms.map((e) => e ? Denom.toJSON(e) : undefined);
        } else {
            obj.denoms = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(base?: I): QueryDenomsResponse {
        return QueryDenomsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(object: I): QueryDenomsResponse {
        const message = createBaseQueryDenomsResponse();
        message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryONFTRequest(): QueryONFTRequest {
    return {denomId: "", id: ""};
}

export const QueryONFTRequest = {
    encode(message: QueryONFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denomId !== "") {
            writer.uint32(10).string(message.denomId);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryONFTRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryONFTRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryONFTRequest {
        return {
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            id: isSet(object.id) ? String(object.id) : "",
        };
    },

    toJSON(message: QueryONFTRequest): unknown {
        const obj: any = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryONFTRequest>, I>>(base?: I): QueryONFTRequest {
        return QueryONFTRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryONFTRequest>, I>>(object: I): QueryONFTRequest {
        const message = createBaseQueryONFTRequest();
        message.denomId = object.denomId ?? "";
        message.id = object.id ?? "";
        return message;
    },
};

function createBaseQueryONFTResponse(): QueryONFTResponse {
    return {onft: undefined};
}

export const QueryONFTResponse = {
    encode(message: QueryONFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.onft !== undefined) {
            ONFT.encode(message.onft, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryONFTResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryONFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.onft = ONFT.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryONFTResponse {
        return {onft: isSet(object.onft) ? ONFT.fromJSON(object.onft) : undefined};
    },

    toJSON(message: QueryONFTResponse): unknown {
        const obj: any = {};
        message.onft !== undefined && (obj.onft = message.onft ? ONFT.toJSON(message.onft) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryONFTResponse>, I>>(base?: I): QueryONFTResponse {
        return QueryONFTResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryONFTResponse>, I>>(object: I): QueryONFTResponse {
        const message = createBaseQueryONFTResponse();
        message.onft = (object.onft !== undefined && object.onft !== null) ? ONFT.fromPartial(object.onft) : undefined;
        return message;
    },
};

function createBaseQueryOwnerONFTsRequest(): QueryOwnerONFTsRequest {
    return {denomId: "", owner: "", pagination: undefined};
}

export const QueryOwnerONFTsRequest = {
    encode(message: QueryOwnerONFTsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denomId !== "") {
            writer.uint32(10).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerONFTsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOwnerONFTsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryOwnerONFTsRequest {
        return {
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryOwnerONFTsRequest): unknown {
        const obj: any = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryOwnerONFTsRequest>, I>>(base?: I): QueryOwnerONFTsRequest {
        return QueryOwnerONFTsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryOwnerONFTsRequest>, I>>(object: I): QueryOwnerONFTsRequest {
        const message = createBaseQueryOwnerONFTsRequest();
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryOwnerONFTsResponse(): QueryOwnerONFTsResponse {
    return {owner: undefined, pagination: undefined};
}

export const QueryOwnerONFTsResponse = {
    encode(message: QueryOwnerONFTsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.owner !== undefined) {
            Owner.encode(message.owner, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerONFTsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOwnerONFTsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = Owner.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryOwnerONFTsResponse {
        return {
            owner: isSet(object.owner) ? Owner.fromJSON(object.owner) : undefined,
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryOwnerONFTsResponse): unknown {
        const obj: any = {};
        message.owner !== undefined && (obj.owner = message.owner ? Owner.toJSON(message.owner) : undefined);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryOwnerONFTsResponse>, I>>(base?: I): QueryOwnerONFTsResponse {
        return QueryOwnerONFTsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryOwnerONFTsResponse>, I>>(object: I): QueryOwnerONFTsResponse {
        const message = createBaseQueryOwnerONFTsResponse();
        message.owner = (object.owner !== undefined && object.owner !== null) ? Owner.fromPartial(object.owner) : undefined;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQuerySupplyRequest(): QuerySupplyRequest {
    return {denomId: "", owner: ""};
}

export const QuerySupplyRequest = {
    encode(message: QuerySupplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denomId !== "") {
            writer.uint32(10).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySupplyRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QuerySupplyRequest {
        return {
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: QuerySupplyRequest): unknown {
        const obj: any = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<QuerySupplyRequest>, I>>(base?: I): QuerySupplyRequest {
        return QuerySupplyRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QuerySupplyRequest>, I>>(object: I): QuerySupplyRequest {
        const message = createBaseQuerySupplyRequest();
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseQuerySupplyResponse(): QuerySupplyResponse {
    return {amount: 0};
}

export const QuerySupplyResponse = {
    encode(message: QuerySupplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.amount !== 0) {
            writer.uint32(8).uint64(message.amount);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySupplyResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = longToNumber(reader.uint64() as Long);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QuerySupplyResponse {
        return {amount: isSet(object.amount) ? Number(object.amount) : 0};
    },

    toJSON(message: QuerySupplyResponse): unknown {
        const obj: any = {};
        message.amount !== undefined && (obj.amount = Math.round(message.amount));
        return obj;
    },

    create<I extends Exact<DeepPartial<QuerySupplyResponse>, I>>(base?: I): QuerySupplyResponse {
        return QuerySupplyResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QuerySupplyResponse>, I>>(object: I): QuerySupplyResponse {
        const message = createBaseQuerySupplyResponse();
        message.amount = object.amount ?? 0;
        return message;
    },
};

export interface Query {
    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;

    IBCCollection(request: QueryIBCCollectionRequest): Promise<QueryCollectionResponse>;

    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;

    IBCDenom(request: QueryIBCDenomRequest): Promise<QueryDenomResponse>;

    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;

    ONFT(request: QueryONFTRequest): Promise<QueryONFTResponse>;

    OwnerONFTs(request: QueryOwnerONFTsRequest): Promise<QueryOwnerONFTsResponse>;

    Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    private readonly service: string;

    constructor(rpc: Rpc, opts?: { service?: string }) {
        this.service = opts?.service || "OmniFlix.onft.v1beta1.Query";
        this.rpc = rpc;
        this.Collection = this.Collection.bind(this);
        this.IBCCollection = this.IBCCollection.bind(this);
        this.Denom = this.Denom.bind(this);
        this.IBCDenom = this.IBCDenom.bind(this);
        this.Denoms = this.Denoms.bind(this);
        this.ONFT = this.ONFT.bind(this);
        this.OwnerONFTs = this.OwnerONFTs.bind(this);
        this.Supply = this.Supply.bind(this);
    }

    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse> {
        const data = QueryCollectionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Collection", data);
        return promise.then((data) => QueryCollectionResponse.decode(new _m0.Reader(data)));
    }

    IBCCollection(request: QueryIBCCollectionRequest): Promise<QueryCollectionResponse> {
        const data = QueryIBCCollectionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IBCCollection", data);
        return promise.then((data) => QueryCollectionResponse.decode(new _m0.Reader(data)));
    }

    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse> {
        const data = QueryDenomRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Denom", data);
        return promise.then((data) => QueryDenomResponse.decode(new _m0.Reader(data)));
    }

    IBCDenom(request: QueryIBCDenomRequest): Promise<QueryDenomResponse> {
        const data = QueryIBCDenomRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IBCDenom", data);
        return promise.then((data) => QueryDenomResponse.decode(new _m0.Reader(data)));
    }

    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse> {
        const data = QueryDenomsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Denoms", data);
        return promise.then((data) => QueryDenomsResponse.decode(new _m0.Reader(data)));
    }

    ONFT(request: QueryONFTRequest): Promise<QueryONFTResponse> {
        const data = QueryONFTRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ONFT", data);
        return promise.then((data) => QueryONFTResponse.decode(new _m0.Reader(data)));
    }

    OwnerONFTs(request: QueryOwnerONFTsRequest): Promise<QueryOwnerONFTsResponse> {
        const data = QueryOwnerONFTsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "OwnerONFTs", data);
        return promise.then((data) => QueryOwnerONFTsResponse.decode(new _m0.Reader(data)));
    }

    Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
        const data = QuerySupplyRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Supply", data);
        return promise.then((data) => QuerySupplyResponse.decode(new _m0.Reader(data)));
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
    : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
        : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
            : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
    : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}

function isSet(value: any): boolean {
    return value !== null && value !== undefined;
}
