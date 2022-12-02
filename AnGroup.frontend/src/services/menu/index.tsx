import { ObjectRespone } from '~/types/common'
import { Menu } from '~/types/menu'
import { httpService } from '../http'
import axiosInstance from '../http'
// import { MenuFilterTypes } from './index.type'

export const menuServices = {
  getTree: async () => {
    const response = await httpService.get('/api/docs/menus/trees', {
      // headers: {
      //   'Content-type': 'application/x-www-form-urlencoded',
      // },
    })
    return response
  },
  create: async (data) => {
    const response = await httpService.post('/api/docs/menus/create', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  getById: async (id: number | string) => {
    const response = await httpService.get(`/api/docs/menus/get/${id}`)
    return response
  },
  // getAll(menuFilter: MenuFilterTypes): Promise<ListResponse<Menu>> {
  //   const url = 'api/docs/menus/search'
  //   return axiosInstance.post(url, menuFilter)
  // },
  getAll: async (forSelect) => {
    const url = forSelect ? '/api/docs/menus/getall/forSelect'  : '/api/docs/menus/getall'
    const response = await httpService.get(url, {
      // headers: {
      //   'Content-type': 'application/x-www-form-urlencoded',
      // },
    })
    return response
  },
  edit(menuId: number, menu: Menu): Promise<ObjectRespone<Menu>> {
    const url = `api/docs/menus/update/${menuId}`
    return axiosInstance.put(url, menu)
  },

  getPageRouterConfig: async () => {
    const response = await httpService.get('/api/docs/menus/page-router-config', {})
    return response
  },

  getAllMenuDataAction: async () => {
    const response = await httpService.get('/api/docs/menus/getAll-dataAction', {
        headers: {
          'searchForSelect': true,
        },
    })
    return response
  },
}
