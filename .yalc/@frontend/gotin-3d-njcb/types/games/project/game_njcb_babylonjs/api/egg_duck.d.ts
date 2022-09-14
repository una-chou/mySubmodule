interface egg {
    name: string;
    pos: Array<number>;
}
interface eggDuck {
    eggs: egg[];
}
export declare function loginApi(): Promise<eggDuck>;
export {};
