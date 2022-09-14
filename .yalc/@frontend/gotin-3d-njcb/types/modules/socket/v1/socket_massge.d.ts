interface Serializable {
    readonly cmdid: number;
    encode(): ArrayBuffer;
    decode(buffer: ArrayBuffer): void;
}
export declare class TestMessage implements Serializable {
    cmdid: number;
    d: number;
    f: number;
    I: number;
    h: number;
    c: string;
    s: string;
    S: string;
    encode(): ArrayBuffer;
    decode(buffer: ArrayBuffer): void;
}
export declare const loginGame: {
    Code: number;
};
export declare const LeaveGame: {
    Code: number;
    PID: number;
};
export declare const PlayerMove: {
    Code: number;
    PID: number;
    TarPos: {
        x: number;
        Y: number;
        Z: number;
        V: number;
    };
};
export {};
