import { DiglogTaggerEnum } from './diglog_tagger_enum';
export interface DialogInterface {
    readonly id: number;
    readonly content: string;
    readonly button1: string;
    readonly button2: string;
    readonly type_trigger1: DiglogTaggerEnum;
    readonly type_trigger2: DiglogTaggerEnum;
    readonly parameter1: string;
    readonly parameter2: string;
}
