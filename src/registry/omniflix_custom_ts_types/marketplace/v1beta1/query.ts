/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {PageRequest, PageResponse} from "../../cosmos/base/query/v1beta1/pagination";
import {AuctionListing, AuctionStatus, auctionStatusFromJSON, auctionStatusToJSON, Bid} from "./auction";
import {Listing} from "./listing";
import {Params} from "./params";

export const protobufPackage = "OmniFlix.marketplace.v1beta1";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}

export interface QueryListingsRequest {
    owner: string;
    priceDenom: string;
    pagination: PageRequest | undefined;
}

export interface QueryListingsResponse {
    listings: Listing[];
    pagination: PageResponse | undefined;
}

export interface QueryListingRequest {
    id: string;
}

export interface QueryListingResponse {
    listing: Listing | undefined;
}

export interface QueryListingsByOwnerRequest {
    owner: string;
    pagination: PageRequest | undefined;
}

export interface QueryListingsByOwnerResponse {
    listings: Listing[];
    pagination: PageResponse | undefined;
}

export interface QueryListingByNFTIDRequest {
    nftId: string;
}

export interface QueryListingsByPriceDenomRequest {
    priceDenom: string;
    pagination: PageRequest | undefined;
}

export interface QueryListingsByPriceDenomResponse {
    listings: Listing[];
    pagination: PageResponse | undefined;
}

export interface QueryAuctionsRequest {
    status: AuctionStatus;
    owner: string;
    priceDenom: string;
    pagination: PageRequest | undefined;
}

export interface QueryAuctionsResponse {
    auctions: AuctionListing[];
    pagination: PageResponse | undefined;
}

export interface QueryAuctionRequest {
    id: number;
}

export interface QueryAuctionResponse {
    auction: AuctionListing | undefined;
}

export interface QueryAuctionsByOwnerRequest {
    owner: string;
    pagination: PageRequest | undefined;
}

export interface QueryAuctionByNFTIDRequest {
    nftId: string;
}

export interface QueryAuctionsByPriceDenomRequest {
    priceDenom: string;
    pagination: PageRequest | undefined;
}

export interface QueryBidsRequest {
    bidder: string;
    pagination: PageRequest | undefined;
}

export interface QueryBidsResponse {
    bids: Bid[];
    pagination: PageResponse | undefined;
}

export interface QueryBidRequest {
    id: number;
}

export interface QueryBidResponse {
    bid: Bid | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
    return {};
}

export const QueryParamsRequest = {
    encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(_: any): QueryParamsRequest {
        return {};
    },

    toJSON(_: QueryParamsRequest): unknown {
        const obj: any = {};
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
        return QueryParamsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
    return {params: undefined};
}

export const QueryParamsResponse = {
    encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryParamsResponse {
        return {params: isSet(object.params) ? Params.fromJSON(object.params) : undefined};
    },

    toJSON(message: QueryParamsResponse): unknown {
        const obj: any = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
        return QueryParamsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};

function createBaseQueryListingsRequest(): QueryListingsRequest {
    return {owner: "", priceDenom: "", pagination: undefined};
}

export const QueryListingsRequest = {
    encode(message: QueryListingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.priceDenom !== "") {
            writer.uint32(18).string(message.priceDenom);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.priceDenom = reader.string();
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

    fromJSON(object: any): QueryListingsRequest {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsRequest): unknown {
        const obj: any = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsRequest>, I>>(base?: I): QueryListingsRequest {
        return QueryListingsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsRequest>, I>>(object: I): QueryListingsRequest {
        const message = createBaseQueryListingsRequest();
        message.owner = object.owner ?? "";
        message.priceDenom = object.priceDenom ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryListingsResponse(): QueryListingsResponse {
    return {listings: [], pagination: undefined};
}

export const QueryListingsResponse = {
    encode(message: QueryListingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.listings) {
            Listing.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.listings.push(Listing.decode(reader, reader.uint32()));
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

    fromJSON(object: any): QueryListingsResponse {
        return {
            listings: Array.isArray(object?.listings) ? object.listings.map((e: any) => Listing.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsResponse): unknown {
        const obj: any = {};
        if (message.listings) {
            obj.listings = message.listings.map((e) => e ? Listing.toJSON(e) : undefined);
        } else {
            obj.listings = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsResponse>, I>>(base?: I): QueryListingsResponse {
        return QueryListingsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsResponse>, I>>(object: I): QueryListingsResponse {
        const message = createBaseQueryListingsResponse();
        message.listings = object.listings?.map((e) => Listing.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryListingRequest(): QueryListingRequest {
    return {id: ""};
}

export const QueryListingRequest = {
    encode(message: QueryListingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryListingRequest {
        return {id: isSet(object.id) ? String(object.id) : ""};
    },

    toJSON(message: QueryListingRequest): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingRequest>, I>>(base?: I): QueryListingRequest {
        return QueryListingRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingRequest>, I>>(object: I): QueryListingRequest {
        const message = createBaseQueryListingRequest();
        message.id = object.id ?? "";
        return message;
    },
};

function createBaseQueryListingResponse(): QueryListingResponse {
    return {listing: undefined};
}

export const QueryListingResponse = {
    encode(message: QueryListingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.listing !== undefined) {
            Listing.encode(message.listing, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.listing = Listing.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryListingResponse {
        return {listing: isSet(object.listing) ? Listing.fromJSON(object.listing) : undefined};
    },

    toJSON(message: QueryListingResponse): unknown {
        const obj: any = {};
        message.listing !== undefined && (obj.listing = message.listing ? Listing.toJSON(message.listing) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingResponse>, I>>(base?: I): QueryListingResponse {
        return QueryListingResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingResponse>, I>>(object: I): QueryListingResponse {
        const message = createBaseQueryListingResponse();
        message.listing = (object.listing !== undefined && object.listing !== null)
            ? Listing.fromPartial(object.listing)
            : undefined;
        return message;
    },
};

function createBaseQueryListingsByOwnerRequest(): QueryListingsByOwnerRequest {
    return {owner: "", pagination: undefined};
}

export const QueryListingsByOwnerRequest = {
    encode(message: QueryListingsByOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsByOwnerRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsByOwnerRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
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

    fromJSON(object: any): QueryListingsByOwnerRequest {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsByOwnerRequest): unknown {
        const obj: any = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsByOwnerRequest>, I>>(base?: I): QueryListingsByOwnerRequest {
        return QueryListingsByOwnerRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsByOwnerRequest>, I>>(object: I): QueryListingsByOwnerRequest {
        const message = createBaseQueryListingsByOwnerRequest();
        message.owner = object.owner ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryListingsByOwnerResponse(): QueryListingsByOwnerResponse {
    return {listings: [], pagination: undefined};
}

export const QueryListingsByOwnerResponse = {
    encode(message: QueryListingsByOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.listings) {
            Listing.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsByOwnerResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsByOwnerResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.listings.push(Listing.decode(reader, reader.uint32()));
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

    fromJSON(object: any): QueryListingsByOwnerResponse {
        return {
            listings: Array.isArray(object?.listings) ? object.listings.map((e: any) => Listing.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsByOwnerResponse): unknown {
        const obj: any = {};
        if (message.listings) {
            obj.listings = message.listings.map((e) => e ? Listing.toJSON(e) : undefined);
        } else {
            obj.listings = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsByOwnerResponse>, I>>(base?: I): QueryListingsByOwnerResponse {
        return QueryListingsByOwnerResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsByOwnerResponse>, I>>(object: I): QueryListingsByOwnerResponse {
        const message = createBaseQueryListingsByOwnerResponse();
        message.listings = object.listings?.map((e) => Listing.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryListingByNFTIDRequest(): QueryListingByNFTIDRequest {
    return {nftId: ""};
}

export const QueryListingByNFTIDRequest = {
    encode(message: QueryListingByNFTIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.nftId !== "") {
            writer.uint32(10).string(message.nftId);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingByNFTIDRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingByNFTIDRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nftId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryListingByNFTIDRequest {
        return {nftId: isSet(object.nftId) ? String(object.nftId) : ""};
    },

    toJSON(message: QueryListingByNFTIDRequest): unknown {
        const obj: any = {};
        message.nftId !== undefined && (obj.nftId = message.nftId);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingByNFTIDRequest>, I>>(base?: I): QueryListingByNFTIDRequest {
        return QueryListingByNFTIDRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingByNFTIDRequest>, I>>(object: I): QueryListingByNFTIDRequest {
        const message = createBaseQueryListingByNFTIDRequest();
        message.nftId = object.nftId ?? "";
        return message;
    },
};

function createBaseQueryListingsByPriceDenomRequest(): QueryListingsByPriceDenomRequest {
    return {priceDenom: "", pagination: undefined};
}

export const QueryListingsByPriceDenomRequest = {
    encode(message: QueryListingsByPriceDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.priceDenom !== "") {
            writer.uint32(10).string(message.priceDenom);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsByPriceDenomRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsByPriceDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.priceDenom = reader.string();
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

    fromJSON(object: any): QueryListingsByPriceDenomRequest {
        return {
            priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsByPriceDenomRequest): unknown {
        const obj: any = {};
        message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsByPriceDenomRequest>, I>>(
        base?: I,
    ): QueryListingsByPriceDenomRequest {
        return QueryListingsByPriceDenomRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsByPriceDenomRequest>, I>>(
        object: I,
    ): QueryListingsByPriceDenomRequest {
        const message = createBaseQueryListingsByPriceDenomRequest();
        message.priceDenom = object.priceDenom ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryListingsByPriceDenomResponse(): QueryListingsByPriceDenomResponse {
    return {listings: [], pagination: undefined};
}

export const QueryListingsByPriceDenomResponse = {
    encode(message: QueryListingsByPriceDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.listings) {
            Listing.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryListingsByPriceDenomResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryListingsByPriceDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.listings.push(Listing.decode(reader, reader.uint32()));
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

    fromJSON(object: any): QueryListingsByPriceDenomResponse {
        return {
            listings: Array.isArray(object?.listings) ? object.listings.map((e: any) => Listing.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryListingsByPriceDenomResponse): unknown {
        const obj: any = {};
        if (message.listings) {
            obj.listings = message.listings.map((e) => e ? Listing.toJSON(e) : undefined);
        } else {
            obj.listings = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryListingsByPriceDenomResponse>, I>>(
        base?: I,
    ): QueryListingsByPriceDenomResponse {
        return QueryListingsByPriceDenomResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryListingsByPriceDenomResponse>, I>>(
        object: I,
    ): QueryListingsByPriceDenomResponse {
        const message = createBaseQueryListingsByPriceDenomResponse();
        message.listings = object.listings?.map((e) => Listing.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryAuctionsRequest(): QueryAuctionsRequest {
    return {status: 0, owner: "", priceDenom: "", pagination: undefined};
}

export const QueryAuctionsRequest = {
    encode(message: QueryAuctionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.status !== 0) {
            writer.uint32(8).int32(message.status);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.priceDenom !== "") {
            writer.uint32(26).string(message.priceDenom);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32() as any;
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.priceDenom = reader.string();
                    break;
                case 4:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAuctionsRequest {
        return {
            status: isSet(object.status) ? auctionStatusFromJSON(object.status) : 0,
            owner: isSet(object.owner) ? String(object.owner) : "",
            priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryAuctionsRequest): unknown {
        const obj: any = {};
        message.status !== undefined && (obj.status = auctionStatusToJSON(message.status));
        message.owner !== undefined && (obj.owner = message.owner);
        message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionsRequest>, I>>(base?: I): QueryAuctionsRequest {
        return QueryAuctionsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionsRequest>, I>>(object: I): QueryAuctionsRequest {
        const message = createBaseQueryAuctionsRequest();
        message.status = object.status ?? 0;
        message.owner = object.owner ?? "";
        message.priceDenom = object.priceDenom ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryAuctionsResponse(): QueryAuctionsResponse {
    return {auctions: [], pagination: undefined};
}

export const QueryAuctionsResponse = {
    encode(message: QueryAuctionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.auctions) {
            AuctionListing.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auctions.push(AuctionListing.decode(reader, reader.uint32()));
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

    fromJSON(object: any): QueryAuctionsResponse {
        return {
            auctions: Array.isArray(object?.auctions) ? object.auctions.map((e: any) => AuctionListing.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryAuctionsResponse): unknown {
        const obj: any = {};
        if (message.auctions) {
            obj.auctions = message.auctions.map((e) => e ? AuctionListing.toJSON(e) : undefined);
        } else {
            obj.auctions = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionsResponse>, I>>(base?: I): QueryAuctionsResponse {
        return QueryAuctionsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionsResponse>, I>>(object: I): QueryAuctionsResponse {
        const message = createBaseQueryAuctionsResponse();
        message.auctions = object.auctions?.map((e) => AuctionListing.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryAuctionRequest(): QueryAuctionRequest {
    return {id: 0};
}

export const QueryAuctionRequest = {
    encode(message: QueryAuctionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64() as Long);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAuctionRequest {
        return {id: isSet(object.id) ? Number(object.id) : 0};
    },

    toJSON(message: QueryAuctionRequest): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionRequest>, I>>(base?: I): QueryAuctionRequest {
        return QueryAuctionRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionRequest>, I>>(object: I): QueryAuctionRequest {
        const message = createBaseQueryAuctionRequest();
        message.id = object.id ?? 0;
        return message;
    },
};

function createBaseQueryAuctionResponse(): QueryAuctionResponse {
    return {auction: undefined};
}

export const QueryAuctionResponse = {
    encode(message: QueryAuctionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.auction !== undefined) {
            AuctionListing.encode(message.auction, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auction = AuctionListing.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAuctionResponse {
        return {auction: isSet(object.auction) ? AuctionListing.fromJSON(object.auction) : undefined};
    },

    toJSON(message: QueryAuctionResponse): unknown {
        const obj: any = {};
        message.auction !== undefined &&
        (obj.auction = message.auction ? AuctionListing.toJSON(message.auction) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionResponse>, I>>(base?: I): QueryAuctionResponse {
        return QueryAuctionResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionResponse>, I>>(object: I): QueryAuctionResponse {
        const message = createBaseQueryAuctionResponse();
        message.auction = (object.auction !== undefined && object.auction !== null)
            ? AuctionListing.fromPartial(object.auction)
            : undefined;
        return message;
    },
};

function createBaseQueryAuctionsByOwnerRequest(): QueryAuctionsByOwnerRequest {
    return {owner: "", pagination: undefined};
}

export const QueryAuctionsByOwnerRequest = {
    encode(message: QueryAuctionsByOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionsByOwnerRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionsByOwnerRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
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

    fromJSON(object: any): QueryAuctionsByOwnerRequest {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryAuctionsByOwnerRequest): unknown {
        const obj: any = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionsByOwnerRequest>, I>>(base?: I): QueryAuctionsByOwnerRequest {
        return QueryAuctionsByOwnerRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionsByOwnerRequest>, I>>(object: I): QueryAuctionsByOwnerRequest {
        const message = createBaseQueryAuctionsByOwnerRequest();
        message.owner = object.owner ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryAuctionByNFTIDRequest(): QueryAuctionByNFTIDRequest {
    return {nftId: ""};
}

export const QueryAuctionByNFTIDRequest = {
    encode(message: QueryAuctionByNFTIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.nftId !== "") {
            writer.uint32(10).string(message.nftId);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionByNFTIDRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionByNFTIDRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nftId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryAuctionByNFTIDRequest {
        return {nftId: isSet(object.nftId) ? String(object.nftId) : ""};
    },

    toJSON(message: QueryAuctionByNFTIDRequest): unknown {
        const obj: any = {};
        message.nftId !== undefined && (obj.nftId = message.nftId);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionByNFTIDRequest>, I>>(base?: I): QueryAuctionByNFTIDRequest {
        return QueryAuctionByNFTIDRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionByNFTIDRequest>, I>>(object: I): QueryAuctionByNFTIDRequest {
        const message = createBaseQueryAuctionByNFTIDRequest();
        message.nftId = object.nftId ?? "";
        return message;
    },
};

function createBaseQueryAuctionsByPriceDenomRequest(): QueryAuctionsByPriceDenomRequest {
    return {priceDenom: "", pagination: undefined};
}

export const QueryAuctionsByPriceDenomRequest = {
    encode(message: QueryAuctionsByPriceDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.priceDenom !== "") {
            writer.uint32(10).string(message.priceDenom);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionsByPriceDenomRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAuctionsByPriceDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.priceDenom = reader.string();
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

    fromJSON(object: any): QueryAuctionsByPriceDenomRequest {
        return {
            priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryAuctionsByPriceDenomRequest): unknown {
        const obj: any = {};
        message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryAuctionsByPriceDenomRequest>, I>>(
        base?: I,
    ): QueryAuctionsByPriceDenomRequest {
        return QueryAuctionsByPriceDenomRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryAuctionsByPriceDenomRequest>, I>>(
        object: I,
    ): QueryAuctionsByPriceDenomRequest {
        const message = createBaseQueryAuctionsByPriceDenomRequest();
        message.priceDenom = object.priceDenom ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryBidsRequest(): QueryBidsRequest {
    return {bidder: "", pagination: undefined};
}

export const QueryBidsRequest = {
    encode(message: QueryBidsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.bidder !== "") {
            writer.uint32(10).string(message.bidder);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bidder = reader.string();
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

    fromJSON(object: any): QueryBidsRequest {
        return {
            bidder: isSet(object.bidder) ? String(object.bidder) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryBidsRequest): unknown {
        const obj: any = {};
        message.bidder !== undefined && (obj.bidder = message.bidder);
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryBidsRequest>, I>>(base?: I): QueryBidsRequest {
        return QueryBidsRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryBidsRequest>, I>>(object: I): QueryBidsRequest {
        const message = createBaseQueryBidsRequest();
        message.bidder = object.bidder ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryBidsResponse(): QueryBidsResponse {
    return {bids: [], pagination: undefined};
}

export const QueryBidsResponse = {
    encode(message: QueryBidsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.bids) {
            Bid.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bids.push(Bid.decode(reader, reader.uint32()));
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

    fromJSON(object: any): QueryBidsResponse {
        return {
            bids: Array.isArray(object?.bids) ? object.bids.map((e: any) => Bid.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },

    toJSON(message: QueryBidsResponse): unknown {
        const obj: any = {};
        if (message.bids) {
            obj.bids = message.bids.map((e) => e ? Bid.toJSON(e) : undefined);
        } else {
            obj.bids = [];
        }
        message.pagination !== undefined &&
        (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryBidsResponse>, I>>(base?: I): QueryBidsResponse {
        return QueryBidsResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryBidsResponse>, I>>(object: I): QueryBidsResponse {
        const message = createBaseQueryBidsResponse();
        message.bids = object.bids?.map((e) => Bid.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};

function createBaseQueryBidRequest(): QueryBidRequest {
    return {id: 0};
}

export const QueryBidRequest = {
    encode(message: QueryBidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64() as Long);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryBidRequest {
        return {id: isSet(object.id) ? Number(object.id) : 0};
    },

    toJSON(message: QueryBidRequest): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryBidRequest>, I>>(base?: I): QueryBidRequest {
        return QueryBidRequest.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryBidRequest>, I>>(object: I): QueryBidRequest {
        const message = createBaseQueryBidRequest();
        message.id = object.id ?? 0;
        return message;
    },
};

function createBaseQueryBidResponse(): QueryBidResponse {
    return {bid: undefined};
}

export const QueryBidResponse = {
    encode(message: QueryBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.bid !== undefined) {
            Bid.encode(message.bid, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bid = Bid.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryBidResponse {
        return {bid: isSet(object.bid) ? Bid.fromJSON(object.bid) : undefined};
    },

    toJSON(message: QueryBidResponse): unknown {
        const obj: any = {};
        message.bid !== undefined && (obj.bid = message.bid ? Bid.toJSON(message.bid) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<QueryBidResponse>, I>>(base?: I): QueryBidResponse {
        return QueryBidResponse.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<QueryBidResponse>, I>>(object: I): QueryBidResponse {
        const message = createBaseQueryBidResponse();
        message.bid = (object.bid !== undefined && object.bid !== null) ? Bid.fromPartial(object.bid) : undefined;
        return message;
    },
};

export interface Query {
    /** Params queries params of the marketplace module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;

    Listings(request: QueryListingsRequest): Promise<QueryListingsResponse>;

    Listing(request: QueryListingRequest): Promise<QueryListingResponse>;

    ListingsByOwner(request: QueryListingsByOwnerRequest): Promise<QueryListingsByOwnerResponse>;

    ListingsByPriceDenom(request: QueryListingsByPriceDenomRequest): Promise<QueryListingsByPriceDenomResponse>;

    ListingByNftId(request: QueryListingByNFTIDRequest): Promise<QueryListingResponse>;

    /** auction queries */
    Auctions(request: QueryAuctionsRequest): Promise<QueryAuctionsResponse>;

    Auction(request: QueryAuctionRequest): Promise<QueryAuctionResponse>;

    AuctionsByOwner(request: QueryAuctionsByOwnerRequest): Promise<QueryAuctionsResponse>;

    AuctionsByPriceDenom(request: QueryAuctionsByPriceDenomRequest): Promise<QueryAuctionsResponse>;

    AuctionByNftId(request: QueryAuctionByNFTIDRequest): Promise<QueryAuctionResponse>;

    Bids(request: QueryBidsRequest): Promise<QueryBidsResponse>;

    Bid(request: QueryBidRequest): Promise<QueryBidResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    private readonly service: string;

    constructor(rpc: Rpc, opts?: { service?: string }) {
        this.service = opts?.service || "OmniFlix.marketplace.v1beta1.Query";
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.Listings = this.Listings.bind(this);
        this.Listing = this.Listing.bind(this);
        this.ListingsByOwner = this.ListingsByOwner.bind(this);
        this.ListingsByPriceDenom = this.ListingsByPriceDenom.bind(this);
        this.ListingByNftId = this.ListingByNftId.bind(this);
        this.Auctions = this.Auctions.bind(this);
        this.Auction = this.Auction.bind(this);
        this.AuctionsByOwner = this.AuctionsByOwner.bind(this);
        this.AuctionsByPriceDenom = this.AuctionsByPriceDenom.bind(this);
        this.AuctionByNftId = this.AuctionByNftId.bind(this);
        this.Bids = this.Bids.bind(this);
        this.Bid = this.Bid.bind(this);
    }

    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }

    Listings(request: QueryListingsRequest): Promise<QueryListingsResponse> {
        const data = QueryListingsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Listings", data);
        return promise.then((data) => QueryListingsResponse.decode(new _m0.Reader(data)));
    }

    Listing(request: QueryListingRequest): Promise<QueryListingResponse> {
        const data = QueryListingRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Listing", data);
        return promise.then((data) => QueryListingResponse.decode(new _m0.Reader(data)));
    }

    ListingsByOwner(request: QueryListingsByOwnerRequest): Promise<QueryListingsByOwnerResponse> {
        const data = QueryListingsByOwnerRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ListingsByOwner", data);
        return promise.then((data) => QueryListingsByOwnerResponse.decode(new _m0.Reader(data)));
    }

    ListingsByPriceDenom(request: QueryListingsByPriceDenomRequest): Promise<QueryListingsByPriceDenomResponse> {
        const data = QueryListingsByPriceDenomRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ListingsByPriceDenom", data);
        return promise.then((data) => QueryListingsByPriceDenomResponse.decode(new _m0.Reader(data)));
    }

    ListingByNftId(request: QueryListingByNFTIDRequest): Promise<QueryListingResponse> {
        const data = QueryListingByNFTIDRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ListingByNftId", data);
        return promise.then((data) => QueryListingResponse.decode(new _m0.Reader(data)));
    }

    Auctions(request: QueryAuctionsRequest): Promise<QueryAuctionsResponse> {
        const data = QueryAuctionsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Auctions", data);
        return promise.then((data) => QueryAuctionsResponse.decode(new _m0.Reader(data)));
    }

    Auction(request: QueryAuctionRequest): Promise<QueryAuctionResponse> {
        const data = QueryAuctionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Auction", data);
        return promise.then((data) => QueryAuctionResponse.decode(new _m0.Reader(data)));
    }

    AuctionsByOwner(request: QueryAuctionsByOwnerRequest): Promise<QueryAuctionsResponse> {
        const data = QueryAuctionsByOwnerRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AuctionsByOwner", data);
        return promise.then((data) => QueryAuctionsResponse.decode(new _m0.Reader(data)));
    }

    AuctionsByPriceDenom(request: QueryAuctionsByPriceDenomRequest): Promise<QueryAuctionsResponse> {
        const data = QueryAuctionsByPriceDenomRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AuctionsByPriceDenom", data);
        return promise.then((data) => QueryAuctionsResponse.decode(new _m0.Reader(data)));
    }

    AuctionByNftId(request: QueryAuctionByNFTIDRequest): Promise<QueryAuctionResponse> {
        const data = QueryAuctionByNFTIDRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AuctionByNftId", data);
        return promise.then((data) => QueryAuctionResponse.decode(new _m0.Reader(data)));
    }

    Bids(request: QueryBidsRequest): Promise<QueryBidsResponse> {
        const data = QueryBidsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Bids", data);
        return promise.then((data) => QueryBidsResponse.decode(new _m0.Reader(data)));
    }

    Bid(request: QueryBidRequest): Promise<QueryBidResponse> {
        const data = QueryBidRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Bid", data);
        return promise.then((data) => QueryBidResponse.decode(new _m0.Reader(data)));
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
