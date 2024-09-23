// The entry file of your WebAssembly module.

import { Uint256 } from "./uint256";
import { uint8ArrayToHex, hexToUint8Array, fromUint8Array, uint8ArrayToString } from "./utils";

export function add(a: i32, b: i32): i32 {
  testUint256();
  testConvert();
  return a + b;
}

function testConvert(): void {
  const original = "0x0100";
  console.log("original:" + original);
  const data = hexToUint8Array(original);
  const hex = uint8ArrayToHex(data);
  console.log("hex:" + hex);

  const bytesvalue = fromUint8Array<Uint8Array>(data);
  console.log("bytesvalue:" + uint8ArrayToHex(bytesvalue));

  const u64value = fromUint8Array<u64>(data);
  console.log("u64value:" + u64value.toString());

  const u32value = fromUint8Array<u32>(data);
  console.log("u32value:" + u32value.toString());

  const u16value = fromUint8Array<u16>(data);
  console.log("u16value:" + u16value.toString());

  const u8value = fromUint8Array<u8>(data);
  console.log("u8value:" + u8value.toString());

  const boolvalue = fromUint8Array<bool>(data);
  console.log("boolvalue:" + boolvalue.toString());

  const u256Value = fromUint8Array<Uint256>(data);
  console.log("u256Value:" + u256Value.toHex());

  const strData = hexToUint8Array("68656c6c6f");
  const str = uint8ArrayToString(strData);
  console.log("str:" + str);
  const stringvalue = fromUint8Array<string>(strData);
  console.log("stringvalue:" + stringvalue);
}

function testUint256(): void {
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
}
