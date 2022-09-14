import { Emitter as MittEmitter } from 'mitt';
export declare class Emitter<T extends string | symbol, K extends Record<T, unknown>> {
    private _listeners;
    private _emitter;
    private _isOnwer;
    constructor(emitter?: MittEmitter<K>);
    on(event: T, listener: (event: K[T]) => void): void;
    emit(event: T, data: K[T]): void;
    off(event: T, listener: (event: K[T]) => void): void;
    dispose(): void;
}
