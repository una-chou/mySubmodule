export type DialogueConfigType = {
  id: number | string
  content: string
  type: number
  pathImage: string
  nameImage: string
  button1: string
  button2: string
  typeTrigger1: number
  typeTrigger2: number
  parameter1: number | string
  parameter2: number | string
}
export type ExchangeConfig = {
  id: number | string
  award: number
  numAward: number
  numLimit: number
  numOwn: number
  order: number
  own: number
  surplus: number
}
export type GoodsConfigType = {
  id: number | string
  describe: string
  gain: string
  luckName: string
  luckPath: string
  name: string
  resourceName: string
  resourcePath: string
  sceneModel: string
  showBag: number
  showDuckbag: number
  stacking: number
  story: string
  type: number
}
export type NPCConfig = {
  id: number | string
  ai: number
  bubble: string
  dialogueId: string
  iconName: string
  iconPath: string
  ifInteractive: number
  imageName: string
  imagePath: string
  interactiveType: string
  model: number
  npcBubble1: string
  npcBubble2: string
  npcName: string
  orientation: number
  rangeHot: string
  skipTo: string
  type: number
  typeHot: string
  x: number
  y: number
  z: number
}
export type PopupConfig = {
  id: number | string
  button1: string
  button2: string
  content: string
  title: string
  titlePath: string
  type: number
}
export type RandomConfig = {
  id: number | string
  awards: string
  limitnums: string
  nums: string
  weights: string
}
export type ShopConfig = {
  id: number | string
  goods: number
  needValue: number
  numLimit: number
  order: number
  surplus: number
}
export type HomeConfig = {
  id: number | string
  display: number
  order: number
  resourceName: string
  resourcePath: string
  type: number
}
export type AvatarConfig = {
  id: number | string
  display: number
  iconName: string
  iconPath: string
  order: number
  part: number
  resourceName: string
  resourcePath: string
}
export type ModelConfig = {
  id: number | string
  bareMold: string
  bareMoldName: string
  head: number
  lowerBody: number
  typeHead: number
  typeLowerBody: number
  typeModel: number
  typeUpperBody: number
  upperBody: number
}
export type DiaryConfig = {
  id: number | string
  day: number
  reward1: string
}
export type TaskConfig = {
  id: number | string
  award: string
  desTask: string
  parameter1: string
  triggertype: number
  typeTask: number
}

export type TipConfig = {
  id: number | string
  content: string
  style: number
}
export type ScatteredConfig = {
  id: number | string
  key: string
  value: string
}
// LuckConfig,