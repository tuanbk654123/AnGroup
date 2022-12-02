import { Row } from 'antd'
import { ReactNode } from 'react'
import { IPapperBreadCrumbProps, IPapperTabsProps, PapperBreadCrumb, PapperTabs } from '~/components/common'

export interface IPageHeaderForDetailsProps extends Pick<IPapperTabsProps, 'tabs' | 'defaultActiveKey'> {
  title?: string
  breadCrumbRoutes?: IPapperBreadCrumbProps['routes']
  breadCrumbItemRender?: IPapperBreadCrumbProps['itemRender']
  onTabChange?: IPapperTabsProps['onChange']
  displayTabs?: boolean
  headerRightElement?: ReactNode
}

export const PaperPageHeaderForDetails = ({
  title,
  breadCrumbRoutes,
  breadCrumbItemRender,
  onTabChange,
  defaultActiveKey,
  tabs,
  headerRightElement,
  displayTabs = false,
}: IPageHeaderForDetailsProps) => {
  return (
    <div className="bg-white pt-5 px-4 mb-6 header-for-detail">
      <PapperBreadCrumb routes={breadCrumbRoutes} itemRender={breadCrumbItemRender} />
      <Row justify="space-between" align="middle">
        <p className="page-title my-2">{title}</p>
        {headerRightElement}
      </Row>
      {displayTabs && (
        <PapperTabs
          tabs={tabs}
          defaultActiveKey={defaultActiveKey}
          activeKey={defaultActiveKey}
          onChange={onTabChange}
        />
      )}
    </div>
  )
}
