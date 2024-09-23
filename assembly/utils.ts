import {BigInt} from "./bigint"
import {Uint256} from "./uint256";

export function hexToUint8Array(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
        return new Uint8Array(0);
    }
    if (hex.startsWith('0x')) {
        hex = hex.substr(2);
    }
    const length = hex.length;
    const bytes = new Uint8Array(length / 2);

    for (let i: i32 = 0, j: i32 = 0; i < length; i += 2, j++) {
        bytes[j] = u8.parse(hex.substr(i, 2), 16);
    }

    return bytes;
}

export function uint8ArrayToHex(data: Uint8Array, prefix: string = ''): string {
    const hexChars = '0123456789abcdef';
    let result = prefix;

    for (let i = 0; i < data.length; i++) {
        const byte = data[i];
        result += hexChars.charAt(byte >> 4) + hexChars.charAt(byte & 0x0f);
    }

    return result;
}


export function uint8ArrayToString(arr: Uint8Array): string {
    return String.UTF8.decode(arr.buffer, false);
}

export function fromUint8Array<T>(value: Uint8Array): T {
    if (isInteger<T>()) {
        if (isSigned<T>()) {
            /*const isNegative = (value[0] & 0x80) != 0;
            // copy input to a new Uint8Array
            let unsigned = new Uint8Array(32);
            const length = Math.min(value.length, 32);
            unsigned.set(value.subarray(0, u32(length)), u32(32 - length));

            if (isNegative) {
                for (let i = 0; i < (32 - length); i++) {
                    unsigned[i] = 0xFF;
                }
            }
            const u256 = Uint256.fromUint8Array(unsigned);*/
            //TODO
            throw new Error("Value must be a positive integer");
        }

        const u256Value = Uint256.fromUint8Array(value);
        if (sizeof<T>() == 1) {
            return u256Value.toUInt8() as T;
        } else if (sizeof<T>() == 2) {
            return u256Value.toUInt16() as T;
        } else if (sizeof<T>() == 4) {
            return u256Value.toUInt32() as T;
        } else if (sizeof<T>() == 8) {
            return u256Value.toUInt64() as T;
        }
    } else if (isBoolean<T>()) {
        return changetype<T>(value.length > 0 && value[0] > 0);
    } else if (idof<T>() == idof<Uint256>()) {
        return changetype<T>(Uint256.fromUint8Array(value));
    } else if (idof<T>() == idof<string>()) {
        return changetype<T>(uint8ArrayToString(value));
    } else if (idof<T>() == idof<Uint8Array>()) {
        return value as T;
    }

    throw new Error("convert failed");
}
