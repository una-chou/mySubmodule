export interface BasicsNodeList extends Array<string> {
    [index: number]: string;
}
export interface ConflictNodeMap {
    [key: string]: string[];
}
export interface ChoiceGroupObj {
    [key: string]: {
        current?: number;
        choices: Choice[];
    };
}
export interface Choice {
    nodeId: string;
    texture?: {
        u?: number;
        v?: number;
    };
    childrenTexture?: [
        {
            meshId: string;
            u?: number;
            v?: number;
        }
    ];
}
