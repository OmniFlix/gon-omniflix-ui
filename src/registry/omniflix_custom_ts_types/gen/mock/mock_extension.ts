/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "mock";

/** ClassMetadata defines a struct for the class metadata */
export interface ClassMetadata {
    creator: string;
    schema: string;
    mintRestricted: boolean;
    updateRestricted: boolean;
    data: string;
}

/** TokenMetadata defines a struct for the nft metadata */
export interface TokenMetadata {
    name: string;
    data: string;
}

/**
 * Extension defines a data structure for storing data types that the system
 * cannot recognize
 */
export interface Extension {
    data: string;
}

function createBaseClassMetadata(): ClassMetadata {
    return {creator: "", schema: "", mintRestricted: false, updateRestricted: false, data: ""};
}

export const ClassMetadata = {
    encode(message: ClassMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.schema !== "") {
            writer.uint32(18).string(message.schema);
        }
        if (message.mintRestricted === true) {
            writer.uint32(24).bool(message.mintRestricted);
        }
        if (message.updateRestricted === true) {
            writer.uint32(32).bool(message.updateRestricted);
        }
        if (message.data !== "") {
            writer.uint32(42).string(message.data);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): ClassMetadata {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClassMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.schema = reader.string();
                    break;
                case 3:
                    message.mintRestricted = reader.bool();
                    break;
                case 4:
                    message.updateRestricted = reader.bool();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): ClassMetadata {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            schema: isSet(object.schema) ? String(object.schema) : "",
            mintRestricted: isSet(object.mintRestricted) ? Boolean(object.mintRestricted) : false,
            updateRestricted: isSet(object.updateRestricted) ? Boolean(object.updateRestricted) : false,
            data: isSet(object.data) ? String(object.data) : "",
        };
    },

    toJSON(message: ClassMetadata): unknown {
        const obj: any = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.schema !== undefined && (obj.schema = message.schema);
        message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted);
        message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted);
        message.data !== undefined && (obj.data = message.data);
        return obj;
    },

    create<I extends Exact<DeepPartial<ClassMetadata>, I>>(base?: I): ClassMetadata {
        return ClassMetadata.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<ClassMetadata>, I>>(object: I): ClassMetadata {
        const message = createBaseClassMetadata();
        message.creator = object.creator ?? "";
        message.schema = object.schema ?? "";
        message.mintRestricted = object.mintRestricted ?? false;
        message.updateRestricted = object.updateRestricted ?? false;
        message.data = object.data ?? "";
        return message;
    },
};

function createBaseTokenMetadata(): TokenMetadata {
    return {name: "", data: ""};
}

export const TokenMetadata = {
    encode(message: TokenMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.data !== "") {
            writer.uint32(18).string(message.data);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): TokenMetadata {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTokenMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): TokenMetadata {
        return {
            name: isSet(object.name) ? String(object.name) : "",
            data: isSet(object.data) ? String(object.data) : ""
        };
    },

    toJSON(message: TokenMetadata): unknown {
        const obj: any = {};
        message.name !== undefined && (obj.name = message.name);
        message.data !== undefined && (obj.data = message.data);
        return obj;
    },

    create<I extends Exact<DeepPartial<TokenMetadata>, I>>(base?: I): TokenMetadata {
        return TokenMetadata.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<TokenMetadata>, I>>(object: I): TokenMetadata {
        const message = createBaseTokenMetadata();
        message.name = object.name ?? "";
        message.data = object.data ?? "";
        return message;
    },
};

function createBaseExtension(): Extension {
    return {data: ""};
}

export const Extension = {
    encode(message: Extension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.data !== "") {
            writer.uint32(10).string(message.data);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Extension {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtension();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Extension {
        return {data: isSet(object.data) ? String(object.data) : ""};
    },

    toJSON(message: Extension): unknown {
        const obj: any = {};
        message.data !== undefined && (obj.data = message.data);
        return obj;
    },

    create<I extends Exact<DeepPartial<Extension>, I>>(base?: I): Extension {
        return Extension.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<Extension>, I>>(object: I): Extension {
        const message = createBaseExtension();
        message.data = object.data ?? "";
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
