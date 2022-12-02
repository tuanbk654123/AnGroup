import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCurrentPath } from '~/hooks'
import './style.scss'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { IPageSettings } from '~/redux/slices/auth/index.types'
import { pageActiveRequest } from '~/redux/slices/page/middleware'
import { useCallback, useEffect } from 'react'
import { layoutMenu } from './config'
import {
  MenuUnfoldOutlined, MenuOutlined, UserOutlined, UsergroupAddOutlined,
  UploadOutlined, DownloadOutlined, FundViewOutlined, OrderedListOutlined,
  CodeOutlined
} from '@ant-design/icons';

export type MenuItem = Required<MenuProps>['items'][number]

function flattenMenuSettings(pages: IPageSettings[]) {
  const result = []
  const flatten = (pages: IPageSettings[]) => {
    pages?.forEach((element: any) => {
      result.push({
        Code: element.Code,
        Id: element.Id,
        Key: element.Key,
        Label: element.Label,
        Text: element.Text,
        ShowOnMenu: element.Data.ShowOnMenu,
        icon: element.icon,
      })
      if (element.Children) {
        flatten(element.Children)
      }
    })
  }
  flatten(pages)
  return result
}


export const SideBar = () => {
  const navigate = useNavigate()
  const currentPath = useCurrentPath()
  const dispatch = useAppDispatch()
  const pageSettings = layoutMenu;
  //useAppSelector((state) => state.auth.pageSettings)
  const menuFlatten = flattenMenuSettings(pageSettings)
  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)
  const pageActive = menuFlatten?.find((x) => x.Key === currentPath)

  const fetchPageActive = useCallback(() => {
    dispatch(
      pageActiveRequest({
        pageActive: pageActive,
      }),
    )
  }, [dispatch, pageActive])

  useEffect(() => {
    fetchPageActive()
  }, [fetchPageActive])

  function getIcon(icon) {
    switch (icon) {
      case "MenuUnfoldOutlined":
        return <MenuUnfoldOutlined />;
      case "UserOutlined":
        return <UserOutlined />;
      case "UsergroupAddOutlined":
        return <UsergroupAddOutlined />;
      case "UploadOutlined":
        return <UploadOutlined />;
      case "DownloadOutlined":
        return <DownloadOutlined />;
      case "FundViewOutlined":
        return <FundViewOutlined />;
      case "OrderedListOutlined":
        return <OrderedListOutlined />;
      case "CodeOutlined":
        return <CodeOutlined />;
      default:
        return <MenuOutlined />;
        break;
    }
  }

  function getPage(menuItem: IPageSettings): MenuItem {
    const key = menuItem.Key
    let label
    if (currentLanguage === 'En') {
      label = menuItem.Data?.NameEn
      // label = (
      //   <a href={menuItem.Data?.Url ? menuItem.Data?.Url : ''}>
      //     {menuItem.Data?.NameEn}
      //   </a>
      // )
    } else {
      label = menuItem.Data?.Name
      // label = (
      //   <a href={menuItem.Data?.Url ? menuItem.Data?.Url : ''}>
      //     {menuItem.Data?.Name}
      //   </a>
      // )
    }
    const children =
      menuItem?.Children?.length &&
      (menuItem.Children as Array<any>)?.filter((item) => !!item?.Data?.ShowOnMenu)?.map((item) => getPage(item))
    const icon = getIcon(menuItem.Icon);
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }


  const allPage = (pageSettings as Array<any>)?.filter((item) => !!item?.Data?.ShowOnMenu)?.map((item) => getPage(item))
  const handleClick = ({ item, key, keyPath, domEvent }) => {
    const pageActive = menuFlatten?.find((x) => x.Key === key)
    dispatch(
      pageActiveRequest({
        pageActive: pageActive,
      }),
    )
    navigate(key)
  }
  return (
    <Menu
      theme="dark"
      className="menu-wrapper overflow-hidden hover:overflow-auto"
      activeKey="1"
      defaultSelectedKeys={[currentPath]}
      items={allPage}
      mode="inline"
      onClick={handleClick}
    // inlineCollapsed={collapsed}
    />
  )
}
