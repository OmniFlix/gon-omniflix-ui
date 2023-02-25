/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {Duration} from "../../google/protobuf/duration";

export const protobufPackage = "OmniFlix.marketplace.v1beta1";

export interface Params {
    saleCommission: string;
    distribution: Distribution | undefined;
    bidCloseDuration: Duration | undefined;
}

export interface Distribution {
    staking: string;
    communityPool: string;
}

function createBaseParams(): Params {
    return {saleCommission: "", distribution: undefined, bidCloseDuration: undefined};
}

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.saleCommission !== "") {
            writer.uint32(10).string(message.saleCommission);
        }
        if (message.distribution !== undefined) {
            Distribution.encode(message.distribution, writer.uint32(18).fork()).ldelim();
        }
        if (message.bidCloseDuration !== undefined) {
            Duration.encode(message.bidCloseDuration, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.saleCommission = reader.string();
                    break;
                case 2:
                    message.distribution = Distribution.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.bidCloseDuration = Duration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Params {
        return {
            saleCommission: isSet(object.saleCommission) ? String(object.saleCommission) : "",
            distribution: isSet(object.distribution) ? Distribution.fromJSON(object.distribution) : undefined,
            bidCloseDuration: isSet(object.bidCloseDuration) ? Duration.fromJSON(object.bidCloseDuration) : undefined,
        };
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        message.saleCommission !== undefined && (obj.saleCommission = message.saleCommission);
        message.distribution !== undefined &&
        (obj.distribution = message.distribution ? Distribution.toJSON(message.distribution) : undefined);
        message.bidCloseDuration !== undefined &&
        (obj.bidCloseDuration = message.bidCloseDuration ? Duration.toJSON(message.bidCloseDuration) : undefined);
        return obj;
    },

    create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
        return Params.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
        const message = createBaseParams();
        message.saleCommission = object.saleCommission ?? "";
        message.distribution = (object.distribution !== undefined && object.distribution !== null)
            ? Distribution.fromPartial(object.distribution)
            : undefined;
        message.bidCloseDuration = (object.bidCloseDuration !== undefined && object.bidCloseDuration !== null)
            ? Duration.fromPartial(object.bidCloseDuration)
            : undefined;
        return message;
    },
};

function createBaseDistribution(): Distribution {
    return {staking: "", communityPool: ""};
}

export const Distribution = {
    encode(message: Distribution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.staking !== "") {
            writer.uint32(10).string(message.staking);
        }
        if (message.communityPool !== "") {
            writer.uint32(18).string(message.communityPool);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Distribution {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDistribution();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.staking = reader.string();
                    break;
                case 2:
                    message.communityPool = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Distribution {
        return {
            staking: isSet(object.staking) ? String(object.staking) : "",
            communityPool: isSet(object.communityPool) ? String(object.communityPool) : "",
        };
    },

    toJSON(message: Distribution): unknown {
        const obj: any = {};
        message.staking !== undefined && (obj.staking = message.staking);
        message.communityPool !== undefined && (obj.communityPool = message.communityPool);
        return obj;
    },

    create<I extends Exact<DeepPartial<Distribution>, I>>(base?: I): Distribution {
        return Distribution.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<Distribution>, I>>(object: I): Distribution {
        const message = createBaseDistribution();
        message.staking = object.staking ?? "";
        message.communityPool = object.communityPool ?? "";
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
