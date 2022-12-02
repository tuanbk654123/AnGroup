import { RcFile } from 'antd/lib/upload'
import moment, { Moment } from 'moment'
import { storageKeys } from '~/constants/storageKeys'
import { httpService } from '~/services'
import { RecusiveType } from '~/types/common'
import { getDataFromCookie } from './cookie.utils'

export const recusiveAddLevelForEachItem = ({
  data = [],
  keyDependOn = 'id',
  titleKey = 'title',
  valueKey = 'value',
  addValueSuffixByLevel,
}: {
  data: RecusiveType[]
  keyDependOn?: string
  titleKey?: string
  valueKey?: string
  addValueSuffixByLevel?: boolean
}) => {
  // start with level 1
  const level = 1
  const addKey = (obj, _level: number) => {
    let children = []

    const _value = addValueSuffixByLevel ? `${obj[valueKey]}-${_level}` : obj[valueKey]

    if (obj.children) {
      children = obj.children.map((child) => addKey(child, _level + 1))
    }
    if (children.length > 0) {
      return {
        ...obj,
        title: obj[titleKey],
        value: _value,
        level: _level,
        key: obj[keyDependOn],
        children,
      }
    }
    return {
      ...obj,
      title: obj[titleKey],
      value: _value,
      level: _level,
      key: obj[keyDependOn],
      children: null,
    }
  }

  return data.map((item) => addKey(item, level))
}

export const getImageBlob = (url: string) => {
  return new Promise(async (resolve, reject) => {
    const response = await httpService.get(url, {
      responseType: 'blob',
    })
    const imgBase64 = (await blobToBase64(response.data)) as string
    const b64 = imgBase64.replace('data:application/octet-stream;base64,', '')
    resolve(b64)
  })
}

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined || value === '' || value === 'NaN') {
    return true
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0
  } else if (Array.isArray(value)) {
    return value.length === 0
  } else {
    return value.length === 0
  }
}

export const listToTree = (list, parentIdValue = null) => {
  const map = {}
  let node: any = {}
  const roots = []

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i
    list[i].children = []
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node?.parentId !== parentIdValue) {
      list[map[node.parentId]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

export const addKeyForEachItemInRecusive = (data: RecusiveType[], keyDependOn = 'id') => {
  const handleFunc = (item: RecusiveType) => {
    if (item.children) {
      return {
        ...item,
        key: item[keyDependOn],
        children: item.children.map((child) => handleFunc(child)),
      }
    }
    return { ...item, key: item[keyDependOn] }
  }
  return data.map((item) => handleFunc(item))
}

export const flatten = (data: any) => {
  return data.reduce((r, { children, ...rest }) => {
    r.push(rest)
    if (children) r.push(...flatten(children))
    return r
  }, [])
}

export const getImageUrlWithToken = (urlPath) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  const token = getDataFromCookie(storageKeys.TOKEN)
  return `${baseUrl}/${urlPath}&token=${token}`
}

export const getProcessEnv = () => {
  return process.env
}

export const recusiveTreeSelect = ({
  data = [],
  keyDependOn = 'id',
  titleKey = 'title',
  valueKey = 'value',
  addValueSuffixByLevel,
}: {
  data: any[]
  keyDependOn?: string
  titleKey?: string
  valueKey?: string
  addValueSuffixByLevel?: boolean
}) => {
  // start with level 1
  const level = 1
  const addKey = (obj, _level: number) => {
    let children = []

    const _value = addValueSuffixByLevel ? `${obj[valueKey]}-${_level}` : obj[valueKey]

    if (obj.children) {
      children = obj.children.map((child) => addKey(child, _level + 1))
    }
    if (children.length > 0) {
      return {
        ...obj,
        title: obj[titleKey],
        value: _value,
        level: _level,
        key: obj[keyDependOn],
        children,
      }
    }
    return {
      ...obj,
      title: obj[titleKey],
      value: _value,
      level: _level,
      key: obj[keyDependOn],
      children: null,
    }
  }

  return data.map((item) => addKey(item, level))
}

export const minusDate = (
  numDay: number,
  typeDate: moment.unitOfTime.DurationConstructor,
  type: moment.unitOfTime.DurationConstructor,
  dateStart?: string,
): Moment => {
  return moment().endOf(typeDate).subtract(numDay, type)
}

export const getTreeLevel = (level: number, treeData: any) => {
  const dataTree = []
  if (level === 1) {
    for (const item1 of treeData) {
      if (item1?.children) {
        for (const item2 of item1.children) {
          if (item2?.children) {
            for (const item3 of item2?.children) {
              dataTree.push(item3)
            }
          }
        }
      }
    }
  }
  if (level === 2) {
    for (const item1 of treeData) {
      if (item1?.children) {
        for (const item2 of item1.children) {
          dataTree.push(item2)
        }
      }
    }
  }
  if (level === 3) {
    for (const item1 of treeData) {
      if (item1?.children) {
        dataTree.push(item1)
      }
    }
  }
  return dataTree?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
}

export const IS_TEST_ENVIROMENT = () => process.env.REACT_APP_BASE_API_URL?.includes('vnpplapitst')

export const recusiveAddLevelItemProduct = ({
  data = [],
  titleKey = 'title',
  valueKey = 'value',
  addValueSuffixByLevel,
}: {
  data: RecusiveType[]
  titleKey?: string
  valueKey?: string
  addValueSuffixByLevel?: boolean
}) => {
  // start with level 1
  const level = 1
  const addKey = (obj, _level: number) => {
    let children = []

    const _value = addValueSuffixByLevel ? `${obj[valueKey]}-${_level}` : obj[valueKey]

    if (obj.children) {
      children = obj.children.map((child) => addKey(child, _level + 1))
    }
    if (children.length > 0) {
      return {
        ...obj,
        title: obj[titleKey],
        value: _value,
        level: _level,
        children,
      }
    }
    return {
      ...obj,
      title: obj[titleKey],
      value: _value,
      level: _level,
      children: null,
    }
  }

  return data.map((item) => addKey(item, level))
}

export const recusiveTreeSelectReport = ({
  data = [],
  // keyDependOn = 'id',
  titleKey = 'title',
  valueKey = 'value',
  addValueSuffixByLevel,
}: {
  data: any[]
  // keyDependOn?: string
  titleKey?: string
  valueKey?: string
  addValueSuffixByLevel?: boolean
}) => {
  // start with level 1
  const level = 1
  const addKey = (obj, _level: number) => {
    let children = []

    const _value = addValueSuffixByLevel ? `${obj[valueKey]}-${_level}` : obj[valueKey]

    if (obj.children) {
      children = obj.children.map((child) => addKey(child, _level + 1))
    }
    if (children.length > 0) {
      return {
        ...obj,
        title: obj[titleKey],
        value: _value,
        level: _level,
        key: `${obj[valueKey]}-${_level}`,
        children,
      }
    }
    return {
      ...obj,
      title: obj[titleKey],
      value: _value,
      level: _level,
      key: `${obj[valueKey]}-${_level}`,
      children: null,
    }
  }

  return data.map((item) => addKey(item, level))
}
