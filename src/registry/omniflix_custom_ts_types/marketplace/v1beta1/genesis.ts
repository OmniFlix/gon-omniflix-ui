/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {AuctionListing, Bid} from "./auction";
import {Listing} from "./listing";
import {Params} from "./params";

export const protobufPackage = "OmniFlix.marketplace.v1beta1";

export interface GenesisState {
    /** NFTs that are listed in marketplace */
    listings: Listing[];
    ListingCount: number;
    params: Params | undefined;
    auctions: AuctionListing[];
    bids: Bid[];
    nextAuctionNumber: number;
}

function createBaseGenesisState(): GenesisState {
    return {listings: [], ListingCount: 0, params: undefined, auctions: [], bids: [], nextAuctionNumber: 0};
}

export const GenesisState = {
    encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.listings) {
            Listing.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        if (message.ListingCount !== 0) {
            writer.uint32(16).uint64(message.ListingCount);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.auctions) {
            AuctionListing.encode(v!, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.bids) {
            Bid.encode(v!, writer.uint32(42).fork()).ldelim();
        }
        if (message.nextAuctionNumber !== 0) {
            writer.uint32(48).uint64(message.nextAuctionNumber);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.listings.push(Listing.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.ListingCount = longToNumber(reader.uint64() as Long);
                    break;
                case 3:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.auctions.push(AuctionListing.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.bids.push(Bid.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.nextAuctionNumber = longToNumber(reader.uint64() as Long);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): GenesisState {
        return {
            listings: Array.isArray(object?.listings) ? object.listings.map((e: any) => Listing.fromJSON(e)) : [],
            ListingCount: isSet(object.ListingCount) ? Number(object.ListingCount) : 0,
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            auctions: Array.isArray(object?.auctions) ? object.auctions.map((e: any) => AuctionListing.fromJSON(e)) : [],
            bids: Array.isArray(object?.bids) ? object.bids.map((e: any) => Bid.fromJSON(e)) : [],
            nextAuctionNumber: isSet(object.nextAuctionNumber) ? Number(object.nextAuctionNumber) : 0,
        };
    },

    toJSON(message: GenesisState): unknown {
        const obj: any = {};
        if (message.listings) {
            obj.listings = message.listings.map((e) => e ? Listing.toJSON(e) : undefined);
        } else {
            obj.listings = [];
        }
        message.ListingCount !== undefined && (obj.ListingCount = Math.round(message.ListingCount));
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        if (message.auctions) {
            obj.auctions = message.auctions.map((e) => e ? AuctionListing.toJSON(e) : undefined);
        } else {
            obj.auctions = [];
        }
        if (message.bids) {
            obj.bids = message.bids.map((e) => e ? Bid.toJSON(e) : undefined);
        } else {
            obj.bids = [];
        }
        message.nextAuctionNumber !== undefined && (obj.nextAuctionNumber = Math.round(message.nextAuctionNumber));
        return obj;
    },

    create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
        return GenesisState.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
        const message = createBaseGenesisState();
        message.listings = object.listings?.map((e) => Listing.fromPartial(e)) || [];
        message.ListingCount = object.ListingCount ?? 0;
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.auctions = object.auctions?.map((e) => AuctionListing.fromPartial(e)) || [];
        message.bids = object.bids?.map((e) => Bid.fromPartial(e)) || [];
        message.nextAuctionNumber = object.nextAuctionNumber ?? 0;
        return message;
    },
};

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
