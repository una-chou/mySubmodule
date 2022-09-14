export type UserPropertyType = {
  avatar: string
  created: string
  eventId: string
  firstName: string
  lastName: string
  modified: string
  registered: string
  rsvp: string
  nickname: string
  first_name: string
  last_name: string
  name: string
  email: string
  intId: number
  company: string
  position: string
  jobTitle?: string
  hash: string
  job_title?: string
  biography?: string
  about?: string
  introduction?: string
}

export type UserType = {
  bookmarkedUsers: Array<string>
  userId: string
  autoReply: boolean
  userType: string
  bBankUser: number
  bHaveNFT: number
  headImagId: number
  viewed: Array<string>
  properties: UserPropertyType
}

export type IMUserType = {
  name: string
  avatar: string
  job_title: string
  company: string
  about: string
  hash: string
  im: IMType
  linkedin_home: string
  content: string
}

export type IMType = {
  accid: string
  greetingRelation: number
}

export type AvatarType = {
  iconPath: string
  avatarFrame: string
  avatarNTF: string
}
