/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.applications.nft_transfer.v1";

/**
 * NonFungibleTokenPacketData defines a struct for the packet payload
 * See NonFungibleTokenPacketData spec:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-721-nft-transfer#data-structures
 */
export interface NonFungibleTokenPacketData {
    /** the class_id of class to be transferred */
    classId: string;
    /** the class_uri of class to be transferred */
    classUri: string;
    /** the class_data of class to be transferred */
    classData: string;
    /** the non fungible tokens to be transferred */
    tokenIds: string[];
    /** the non fungible tokens's uri to be transferred */
    tokenUris: string[];
    /** the non fungible tokens's data to be transferred */
    tokenData: string[];
    /** the sender address */
    sender: string;
    /** the recipient address on the destination chain */
    receiver: string;
    /** optional memo */
    memo: string;
}

function createBaseNonFungibleTokenPacketData(): NonFungibleTokenPacketData {
    return {
        classId: "",
        classUri: "",
        classData: "",
        tokenIds: [],
        tokenUris: [],
        tokenData: [],
        sender: "",
        receiver: "",
        memo: "",
    };
}

export const NonFungibleTokenPacketData = {
    encode(message: NonFungibleTokenPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.classId !== "") {
            writer.uint32(10).string(message.classId);
        }
        if (message.classUri !== "") {
            writer.uint32(18).string(message.classUri);
        }
        if (message.classData !== "") {
            writer.uint32(26).string(message.classData);
        }
        for (const v of message.tokenIds) {
            writer.uint32(34).string(v!);
        }
        for (const v of message.tokenUris) {
            writer.uint32(42).string(v!);
        }
        for (const v of message.tokenData) {
            writer.uint32(50).string(v!);
        }
        if (message.sender !== "") {
            writer.uint32(58).string(message.sender);
        }
        if (message.receiver !== "") {
            writer.uint32(66).string(message.receiver);
        }
        if (message.memo !== "") {
            writer.uint32(74).string(message.memo);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): NonFungibleTokenPacketData {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNonFungibleTokenPacketData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.classId = reader.string();
                    break;
                case 2:
                    message.classUri = reader.string();
                    break;
                case 3:
                    message.classData = reader.string();
                    break;
                case 4:
                    message.tokenIds.push(reader.string());
                    break;
                case 5:
                    message.tokenUris.push(reader.string());
                    break;
                case 6:
                    message.tokenData.push(reader.string());
                    break;
                case 7:
                    message.sender = reader.string();
                    break;
                case 8:
                    message.receiver = reader.string();
                    break;
                case 9:
                    message.memo = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): NonFungibleTokenPacketData {
        return {
            classId: isSet(object.classId) ? String(object.classId) : "",
            classUri: isSet(object.classUri) ? String(object.classUri) : "",
            classData: isSet(object.classData) ? String(object.classData) : "",
            tokenIds: Array.isArray(object?.tokenIds) ? object.tokenIds.map((e: any) => String(e)) : [],
            tokenUris: Array.isArray(object?.tokenUris) ? object.tokenUris.map((e: any) => String(e)) : [],
            tokenData: Array.isArray(object?.tokenData) ? object.tokenData.map((e: any) => String(e)) : [],
            sender: isSet(object.sender) ? String(object.sender) : "",
            receiver: isSet(object.receiver) ? String(object.receiver) : "",
            memo: isSet(object.memo) ? String(object.memo) : "",
        };
    },

    toJSON(message: NonFungibleTokenPacketData): unknown {
        const obj: any = {};
        message.classId !== undefined && (obj.classId = message.classId);
        message.classUri !== undefined && (obj.classUri = message.classUri);
        message.classData !== undefined && (obj.classData = message.classData);
        if (message.tokenIds) {
            obj.tokenIds = message.tokenIds.map((e) => e);
        } else {
            obj.tokenIds = [];
        }
        if (message.tokenUris) {
            obj.tokenUris = message.tokenUris.map((e) => e);
        } else {
            obj.tokenUris = [];
        }
        if (message.tokenData) {
            obj.tokenData = message.tokenData.map((e) => e);
        } else {
            obj.tokenData = [];
        }
        message.sender !== undefined && (obj.sender = message.sender);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.memo !== undefined && (obj.memo = message.memo);
        return obj;
    },

    create<I extends Exact<DeepPartial<NonFungibleTokenPacketData>, I>>(base?: I): NonFungibleTokenPacketData {
        return NonFungibleTokenPacketData.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<NonFungibleTokenPacketData>, I>>(object: I): NonFungibleTokenPacketData {
        const message = createBaseNonFungibleTokenPacketData();
        message.classId = object.classId ?? "";
        message.classUri = object.classUri ?? "";
        message.classData = object.classData ?? "";
        message.tokenIds = object.tokenIds?.map((e) => e) || [];
        message.tokenUris = object.tokenUris?.map((e) => e) || [];
        message.tokenData = object.tokenData?.map((e) => e) || [];
        message.sender = object.sender ?? "";
        message.receiver = object.receiver ?? "";
        message.memo = object.memo ?? "";
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
