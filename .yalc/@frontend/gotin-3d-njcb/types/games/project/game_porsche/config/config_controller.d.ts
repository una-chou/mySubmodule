export declare const ConfigController: {
    /**
     * 角色行走速度,单位m/s
     */
    v1: number;
    /**
     * 角色跑步速度,单位m/s
     */
    v2: number;
    /**
     * 移动点和角色当前位置距离临界值,单位m
     */
    L0: number;
    /**
     * 俯角默认值
     */
    a_default: number;
    /**
     * 俯角最大值
     */
    a_max: number;
    /**
     * 仰角最大值
     */
    b_max: number;
    /**
     * 镜头和人中心的距离默认值,单位m
     */
    L_default: number;
    /**
     * 镜头和人中心的距离最大值,单位m
     */
    L_max: number;
    /**
     * 镜头和人中心的距离最小值,单位m
     */
    L_min: number;
    /**
     * 视角旋转速度，值越小速度越快
     */
    v3: number;
    /**
     * 镜头中心和人中心距离变化速度
     */
    v4: number;
    /**
     * 镜头中心和人中心y方向偏移值
     */
    y_offset: number;
    /**
     * 角色坐标
     */
    x: number;
    y: number;
    z: number;
    /**
     * 朝向
     */
    orientation: number;
    /**
     * 建筑遮挡，透明显示参数
     */
    houseOpacity: number;
    /**
     * 是否锁帧
     */
    lockStep: number;
    /**
     * 最大帧率30 ~ 60
     */
    maxSteps: number;
};
