/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {ClassTrace} from "./transfer";

export const protobufPackage = "ibc.applications.nft_transfer.v1";

/** GenesisState defines the ibc-nft-transfer genesis state */
export interface GenesisState {
    portId: string;
    traces: ClassTrace[];
}

function createBaseGenesisState(): GenesisState {
    return {portId: "", traces: []};
}

export const GenesisState = {
    encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        for (const v of message.traces) {
            ClassTrace.encode(v!, writer.uint32(18).fork()).ldelim();
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
                    message.portId = reader.string();
                    break;
                case 2:
                    message.traces.push(ClassTrace.decode(reader, reader.uint32()));
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            traces: Array.isArray(object?.traces) ? object.traces.map((e: any) => ClassTrace.fromJSON(e)) : [],
        };
    },

    toJSON(message: GenesisState): unknown {
        const obj: any = {};
        message.portId !== undefined && (obj.portId = message.portId);
        if (message.traces) {
            obj.traces = message.traces.map((e) => e ? ClassTrace.toJSON(e) : undefined);
        } else {
            obj.traces = [];
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
        return GenesisState.fromPartial(base ?? {});
    },

    fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
        const message = createBaseGenesisState();
        message.portId = object.portId ?? "";
        message.traces = object.traces?.map((e) => ClassTrace.fromPartial(e)) || [];
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
