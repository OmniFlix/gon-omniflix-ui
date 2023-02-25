/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "OmniFlix.marketplace.v1beta1";

/** EventListONFT is emitted on NFT Listing on market */
export interface EventListNFT {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
}

/** EventEditListing is emitted on edit Listing on market */
export interface EventEditListing {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
}

/** EventDeListONFT is emitted on NFT DeListing from market */
export interface EventDeListNFT {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
}

/** EventBuyONFT is emitted on NFT Buy */
export interface EventBuyNFT {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
    buyer: string;
}

/** EventCreateAuction is emitted on creating auction */
export interface EventCreateAuction {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
    minPrice: string;
}

/** EventCancelAuction is emitted on canceling auction */
export interface EventCancelAuction {
    id: string;
    nftId: string;
    denomId: string;
    owner: string;
}

/** EventPlaceBid is emitted on placing bid for an auction */
export interface EventPlaceBid {
    auctionId: string;
    nftId: string;
    denomId: string;
    bidder: string;
    amount: string;
}

function createBaseEventListNFT(): EventListNFT {
    return {id: "", nftId: "", denomId: "", owner: ""};
}

export const EventListNFT = {
    encode(message: EventListNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventListNFT {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventListNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventListNFT {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: EventListNFT): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventListNFT>, I>>(base?: I): EventListNFT {
        return EventListNFT.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventListNFT>, I>>(object: I): EventListNFT {
        const message = createBaseEventListNFT();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseEventEditListing(): EventEditListing {
    return {id: "", nftId: "", denomId: "", owner: ""};
}

export const EventEditListing = {
    encode(message: EventEditListing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventEditListing {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventEditListing();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventEditListing {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: EventEditListing): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventEditListing>, I>>(base?: I): EventEditListing {
        return EventEditListing.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventEditListing>, I>>(object: I): EventEditListing {
        const message = createBaseEventEditListing();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseEventDeListNFT(): EventDeListNFT {
    return {id: "", nftId: "", denomId: "", owner: ""};
}

export const EventDeListNFT = {
    encode(message: EventDeListNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventDeListNFT {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventDeListNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventDeListNFT {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: EventDeListNFT): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventDeListNFT>, I>>(base?: I): EventDeListNFT {
        return EventDeListNFT.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventDeListNFT>, I>>(object: I): EventDeListNFT {
        const message = createBaseEventDeListNFT();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseEventBuyNFT(): EventBuyNFT {
    return {id: "", nftId: "", denomId: "", owner: "", buyer: ""};
}

export const EventBuyNFT = {
    encode(message: EventBuyNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        if (message.buyer !== "") {
            writer.uint32(42).string(message.buyer);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventBuyNFT {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventBuyNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                case 5:
                    message.buyer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventBuyNFT {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            buyer: isSet(object.buyer) ? String(object.buyer) : "",
        };
    },

    toJSON(message: EventBuyNFT): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        message.buyer !== undefined && (obj.buyer = message.buyer);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventBuyNFT>, I>>(base?: I): EventBuyNFT {
        return EventBuyNFT.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventBuyNFT>, I>>(object: I): EventBuyNFT {
        const message = createBaseEventBuyNFT();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        message.buyer = object.buyer ?? "";
        return message;
    },
};

function createBaseEventCreateAuction(): EventCreateAuction {
    return {id: "", nftId: "", denomId: "", owner: "", minPrice: ""};
}

export const EventCreateAuction = {
    encode(message: EventCreateAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        if (message.minPrice !== "") {
            writer.uint32(42).string(message.minPrice);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateAuction {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateAuction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                case 5:
                    message.minPrice = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventCreateAuction {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            minPrice: isSet(object.minPrice) ? String(object.minPrice) : "",
        };
    },

    toJSON(message: EventCreateAuction): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        message.minPrice !== undefined && (obj.minPrice = message.minPrice);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventCreateAuction>, I>>(base?: I): EventCreateAuction {
        return EventCreateAuction.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventCreateAuction>, I>>(object: I): EventCreateAuction {
        const message = createBaseEventCreateAuction();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        message.minPrice = object.minPrice ?? "";
        return message;
    },
};

function createBaseEventCancelAuction(): EventCancelAuction {
    return {id: "", nftId: "", denomId: "", owner: ""};
}

export const EventCancelAuction = {
    encode(message: EventCancelAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventCancelAuction {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCancelAuction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventCancelAuction {
        return {
            id: isSet(object.id) ? String(object.id) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },

    toJSON(message: EventCancelAuction): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = message.id);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventCancelAuction>, I>>(base?: I): EventCancelAuction {
        return EventCancelAuction.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventCancelAuction>, I>>(object: I): EventCancelAuction {
        const message = createBaseEventCancelAuction();
        message.id = object.id ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.owner = object.owner ?? "";
        return message;
    },
};

function createBaseEventPlaceBid(): EventPlaceBid {
    return {auctionId: "", nftId: "", denomId: "", bidder: "", amount: ""};
}

export const EventPlaceBid = {
    encode(message: EventPlaceBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.auctionId !== "") {
            writer.uint32(10).string(message.auctionId);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        if (message.denomId !== "") {
            writer.uint32(26).string(message.denomId);
        }
        if (message.bidder !== "") {
            writer.uint32(34).string(message.bidder);
        }
        if (message.amount !== "") {
            writer.uint32(42).string(message.amount);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): EventPlaceBid {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventPlaceBid();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auctionId = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.bidder = reader.string();
                    break;
                case 5:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): EventPlaceBid {
        return {
            auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            denomId: isSet(object.denomId) ? String(object.denomId) : "",
            bidder: isSet(object.bidder) ? String(object.bidder) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
        };
    },

    toJSON(message: EventPlaceBid): unknown {
        const obj: any = {};
        message.auctionId !== undefined && (obj.auctionId = message.auctionId);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.bidder !== undefined && (obj.bidder = message.bidder);
        message.amount !== undefined && (obj.amount = message.amount);
        return obj;
    },

    create<I extends Exact<DeepPartial<EventPlaceBid>, I>>(base?: I): EventPlaceBid {
        return EventPlaceBid.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<EventPlaceBid>, I>>(object: I): EventPlaceBid {
        const message = createBaseEventPlaceBid();
        message.auctionId = object.auctionId ?? "";
        message.nftId = object.nftId ?? "";
        message.denomId = object.denomId ?? "";
        message.bidder = object.bidder ?? "";
        message.amount = object.amount ?? "";
        return message;
    },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
    : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
        : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
            : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
    : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
    return value !== null && value !== undefined;
}
