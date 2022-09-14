/// <reference types="node" />
import * as fs from 'fs-extra';
export declare function ReadInt32Sync(file: string, offset: number): Promise<number>;
export declare function ReadStringSync(file: string, offset: number, length: number): Promise<string>;
export declare function PipeCopy(file: string, offset: number, length: number, writeStream: fs.WriteStream): Promise<boolean>;
