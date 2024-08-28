// The entry file of your WebAssembly module.

import {Uint256} from "./uint256";

export function add(a: i32, b: i32): i32 {
  let a1 = new Uint256(17);
  let b1 = new Uint256(1717);
  console.log(a1.toHex());
  console.log(b1.toHex());

  let c = Uint256.fromHex("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2e");
  let d = Uint256.fromHex("1111111111111111111111111111111111111111111111111111111111111111")
  console.log(c.sub(d).toHex());
  console.log(c.toUInt64().toString())
  console.log(c.toHex());
  console.log(d.toHex());

  let data = c.toUint8Array();
  console.log("uint8ArrayToHex: " + uint8ArrayToHex(data));

  // let array = hexToUint8Array("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2e")
  let array = hexToUint8Array("1234567890abcde1234567890abcde1234567890abcde1234567890abcde1234")
  let e = Uint256.fromUint8Array(array);
  console.log(e.toHex());
  let f = Uint256.fromHex("1234567890abcde1234567890abcde1234567890abcde1234567890abcde1234");
  console.log(f.toHex());
  // let str1 = a1.toUInt64();
  // let str2 = b1.toUInt64();
  
  return a + b;
}

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