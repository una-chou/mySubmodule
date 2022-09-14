/**
 * 将除了string的其他类型写到二进制buffer里
 * @param dv
 * @param type
 * @param value
 * @param offset
 * @param littleEndian
 * @returns
 */
export declare function serialize(dv: DataView, type: string, value: number, offset: number, littleEndian?: boolean): number;
/**
 * 将除了string类型写到二进制buffer里
 * @param dv
 * @param buffer
 * @param arr
 * @param type
 * @param offset
 * @returns
 */
export declare function serializeString(dv: DataView, buffer: ArrayBuffer, arr: Uint8Array, type: string, offset: number): number;
/**
 * 获取二进制buffer里的除了string的其他类型
 * @param dv
 * @param type
 * @param offset
 * @param littleEndian
 * @returns
 */
export declare function deserialize(dv: DataView, type: string, offset: number, littleEndian?: boolean): [number, number];
/**
 * 获取二进制buffer里的string类型
 * @param dv
 * @param buffer
 * @param type
 * @param offset
 * @returns
 */
export declare function deserializeString(dv: DataView, buffer: ArrayBuffer, type: string, offset: number): [string, number];
