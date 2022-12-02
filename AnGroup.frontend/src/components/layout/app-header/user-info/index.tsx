import { useCallback } from 'react'
import { Avatar, Menu, Row } from 'antd'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { LogoutOutlined, ProfileOutlined, EditOutlined } from '@ant-design/icons'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { RouterHelper } from '~/utils'
import { useAppDispatch } from '~/redux/hooks'
import { logoutRequest } from '~/redux/slices/auth/middleware'
import { deleteAllDataStorage } from '~/utils/storage.utils'
import { useEffect, useState } from 'react'
import { getImageBlob } from '~/utils/helper'
import './style.scss'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { deleteAllDataCookie } from '~/utils/cookie.utils'
import { signoutRedirect } from '~/services/auth/loginService'

export const HeaderUserInfo = () => {
  const currentUser = useCurrentUser()
  const [avatarObj, setAvatarObj] = useState()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()

  const fullName = localStorage.getItem('fullName')

  const handleProfile = () => {
    navigate({
      pathname: RouterHelper.user_profile,
      // pathname: RouterHelper.user_profile_ref(currentUser.Id),
      search: createSearchParams({ name: currentUser.Username, type: currentUser.Usertype }).toString(),
    })
  }

  const handleLogout = () => {
    // dispatch(
    //   logoutRequest({
    //     data: {},
    //     onSuccess: () => {
    //       deleteAllDataStorage()
    //       deleteAllDataCookie()
    //       navigate({
    //         pathname: RouterHelper.login,
    //       })
    //     },
    //   }),
    // )

    navigate({
      pathname: RouterHelper.login,
    });
    // await signoutRedirect();

  }
  const handleChangePassword = () => {
    navigate({
      pathname: RouterHelper.change_password,
    })
  }

  const callImg = useCallback(async () => {
    const res = await getImageBlob(currentUser?.ProfileImageUrl)
    if (res) {
      setAvatarObj(res as any)
    }
  }, [currentUser?.ProfileImageUrl])

  useEffect(() => {
    setTimeout(() => {
      const imgAvt = localStorage.getItem('imgAvt')
      if (imgAvt) {
        setAvatarObj(imgAvt as any)
      }
    }, 1000)
  }, [currentParams])

  useEffect(() => {
    callImg()
  }, [callImg])

  return (
    <Row align="middle" className="text-white font-body-bold">
      {
        avatarObj ? (
          <Avatar src={avatarObj} size={40} />
        ) : (
          <Avatar src={avatarObj} size={40}>
            {currentUser?.Fullname?.charAt(0)}
          </Avatar>
        )
        // <div className="w-10 h-10 rounded-large bg-gray-300 mr-2"></div>
      }

      <Menu mode="horizontal" className="wrapper-menu">
        <Menu.SubMenu key="SubMenu" title={`${t('sidebar.hi')}, ${fullName}`}>
          <Menu.Item className="flex items-center" key="one" icon={<ProfileOutlined />} onClick={handleProfile}>
            User profile
          </Menu.Item>
          <Menu.Item className="flex items-center" key="two" icon={<EditOutlined />} onClick={handleChangePassword}>
            Change password
          </Menu.Item>
          <Menu.Item className="flex items-center" key="three" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Row>
  )
}
