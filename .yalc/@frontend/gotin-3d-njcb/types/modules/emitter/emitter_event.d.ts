import { EmitterEventEnum } from './emitter_event_enum';
export declare type EmitterEvents = {
    [EmitterEventEnum.SHOW]: string;
    [EmitterEventEnum.ENTER_EXPO]: Record<string, number>;
    [EmitterEventEnum.ENTER_EVENT]: null;
    [EmitterEventEnum.ENTER_FORUM]: Record<string, number>;
    [EmitterEventEnum.USER_DOWNLOAD]: null;
    [EmitterEventEnum.ENTER_VIDEO]: Record<string, number>;
    [EmitterEventEnum.LOADING_DOWN]: null;
};
