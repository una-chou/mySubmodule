export interface NpcConfigInterface {
    readonly id: string;
    readonly resource_path: string;
    readonly resource_name: string;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly orientation: number;
    /**
       * npc类型
         11-人型静态npc，默认播放待机动作
         12-人型动态npc，默认播放跑步动作
         21-非人型静态npc，不播放任何待机动作
       * **/
    readonly type: number;
    /**
       * npc头顶名称
         位于头顶图标下方
         1-不填不显示不占UI位置
       * **/
    readonly npc_name: string;
    readonly bubble: string;
    readonly npc_bubble1: string;
    readonly npc_bubble2: string;
    /**
       * npc行为树
         1-静止
         2-巡逻
       * **/
    readonly ai: number;
    /***
       * 热区范围类型
        1-以npc模型底部为中心的圆
        2-以某一坐标为中心的圆
      */
    readonly type_hot: number;
    /**
       * 热区范围
         1-对应类型1时，填r半径值
         2-对应类型2时，填中心坐标和半径值，中间用分号隔开
       * **/
    readonly range_hot: string;
    readonly if_interactive: boolean;
    /**
       * 交互类型
        1-点击后对话
        2-点击后跳转
       * **/
    readonly interactive_type: number;
    readonly dialogue_id: number;
    readonly skip_to: string;
    readonly path_data: Array<number[]>;
}
