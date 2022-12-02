import { Button } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { ChangeLanguage } from '~/components/common'
import { HeaderUserInfo } from './user-info'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './style.scss'
import BadgeContainer from './badge'

export const AppHeader = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
    props.parentCallback(!collapsed)
  }

  return (
    <Header className={collapsed ? 'header-wrapper fixed t-0 r-0 w-full h-16 py-2.5 pl-[90px] z-30 shadow-md h-[68px]' : 'header-wrapper fixed t-0 r-0 w-full h-16 h-[68px] py-2.5 pl-[254px] z-30 shadow-md'} >
      {/* <Row className="h-full" justify="space-between" align="middle">
        <Row>
          <Button
            className="border-0 flex items-center text-[#fff] bg-[#182E89] hover:bg-[#182E89]"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Row>

        <Row align="middle">
          <BellFilled className="text-2xl text-white mr-4" />
          <SelectBox size='large' rounded="small" value={'en'} options={[{ label: 'English', value: 'en' }]} />
          <div className="ml-4">
            <HeaderUserInfo />
          </div>
        </Row>
      </Row> */}
      <div className="h-full flex justify-between items-center">
        <div className="flex">
          <Button
            className="border-0 flex items-center text-[#fff] bg-[#182E89] hover:bg-[#182E89]"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>

        <div className="flex justify-end items-center">
          <BadgeContainer />

          <ChangeLanguage className="ml-8" />

          {/* <SelectBox
            className="ml-8"
            rounded="small"
            value={currentLanguage}
            options={languageOptions}
            onChange={handleChangeLanguage}
          /> */}
          <div className="ml-4">
            <HeaderUserInfo />
          </div>
        </div>
      </div>
    </Header>
  )
}
