import { ReactElement, useState } from 'react'
import { Image, Layout, Menu } from 'antd'

// import { Logo } from '~/components/common'
import './style.scss'
import { SideBar } from '../sidebar'
import { AppHeader } from '../app-header'
import { useAppSelector } from '~/redux/hooks'
import { Logo } from '~/components/common'
// import { AppLoading } from '../app-loading'
import Env from '~/components/common/is-test-enviroment'

const { Content, Sider } = Layout
export interface AppLayoutProps {
  children?: ReactElement
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const onCollapse = (_collapsed: boolean) => {
    setCollapsed(_collapsed)
  }

  const callbackFunction = (childData) => {
    setCollapsed(childData)
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        width={254}
        collapsed={collapsed}
        onCollapse={onCollapse}
        className={collapsed ? 'sider-wrapper bg-[#041662] fixed z-40 h-screen' : 'sider-wrapper-hidden bg-[#041662] fixed z-40 h-screen'}
      >
        <Env color="white" />
        <div className="logo pl-2">
          {/* <Logo /> */}
          <Menu
            className="bg-[#041662] border-0 text-[#fff]"
            style={{ marginBottom: 10 }}
            items={[
              {
                key: '1',
                style: { textAlign: 'center' },
                icon: !collapsed ? (
                  <span className="img-hidden">
                    <Image preview={false} width={150} height={60} src={'/assets/login/logo.png'} />
                  </span>
                ) : (
                  <span className="img-hidden">
                    <Image preview={false} width={28} src={'/assets/login/logo.png'} />
                  </span>
                ),
                // label: !collapsed && <span className='mx-1.5 text-lg font-bold'>SHINHAN BANK</span>,
              },
            ]}
          />
        </div>

        {!isLoading && <SideBar />}
      </Sider>
      {/* <AppLoading /> */}
      <Layout className="site-layout">
        <AppHeader parentCallback={callbackFunction} />
        <Content className={collapsed ? 'bg-white pl-[90px] pt-14' : 'bg-white pl-[254px] pt-14'}>{children}</Content>
      </Layout>
    </Layout>
  )
}
