import defaultAvatar from '@/assets/images/default-avatar.png'
import type {UserPropertyType} from '@/types/user'


function nameFilter(props: any, name = '', nickname = '') {
  if (props?.firstName || props?.lastName) {
    if (new RegExp('^[\u4e00-\u9fa5]').test(props.firstName + props.lastName)) {
      return `${props.lastName}${props.firstName}`
    } else {
      return `${props.firstName} ${props.lastName}`
    }
  } else if (props?.first_name || props?.last_name) {
    if (new RegExp('^[\u4e00-\u9fa5]').test(props.first_name + props.last_name)) {
      return `${props.last_name}${props.first_name}`
    } else {
      return `${props.first_name} ${props.last_name}`
    }
  } else {
    return (name && props?.name) || (nickname && props?.nickname) || 'somebody'
  }
}

function avatarFilter(url?: string): string {
  if (url == '0') {
    return 'https://mwcthrive-website-assets-prod.oss-cn-hangzhou.aliyuncs.com/assets/images/avatar/avatar1.svg'
  } else if (url == '1') {
    return 'https://mwcthrive-website-assets-prod.oss-cn-hangzhou.aliyuncs.com/assets/images/avatar/avatar2.svg'
  } else if (url == '2') {
    return 'https://mwcthrive-website-assets-prod.oss-cn-hangzhou.aliyuncs.com/assets/images/avatar/avatar3.svg'
  } else if (url == '3') {
    return 'https://mwcthrive-website-assets-prod.oss-cn-hangzhou.aliyuncs.com/assets/images/avatar/avatar4.svg'
  }
  const baseUrl: string = process.env.VUE_APP_OSS_BASE_URL as string

  return url
    ? url.indexOf('data:image/png;base64,') > -1
      ? url
      : url.indexOf('http') > -1
      ? url
      : baseUrl + url
    : defaultAvatar
}

function descFilter(jobTitle: string, company: string) {
  if (company && jobTitle) {
    return jobTitle + '-' + company
  } else {
    return jobTitle || company
  }
}

function roleFilter(role: string): any {
  if (role === 'org') {
    return {cn: '主办方', en: 'ORGANIZER'}
  } else if (role === 'host') {
    return {cn: '主持人', en: 'HOST'}
  } else if (role === 'guest') {
    return {cn: '嘉宾', en: 'SPEAKER'}
  } else {
    return {cn: '', en: ''}
  }
}

const jobFilter = (data: UserPropertyType) => {
  return data?.jobTitle || data?.job_title
}

const introductionFilter = (data: UserPropertyType) => {
  return data?.biography || data?.introduction || data?.about
}


export {nameFilter, avatarFilter, descFilter, roleFilter, jobFilter, introductionFilter}
