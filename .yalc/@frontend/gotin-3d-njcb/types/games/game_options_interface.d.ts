import type { Emitter, EventType } from 'mitt';
declare type GameConfig = {
    [key: string]: any;
};
export interface GameOptionsInterface<T extends Record<EventType, unknown>> {
    config?: GameConfig;
    emitter?: Emitter<T>;
}
export {};
