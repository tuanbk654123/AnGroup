import { Breadcrumb, BreadcrumbProps } from 'antd'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

export interface IPapperBreadCrumbProps extends BreadcrumbProps {}

export const PapperBreadCrumb = ({ routes, itemRender }: IPapperBreadCrumbProps) => {
  const defaultItemRender = (route: Route) => {
    return <Link to={route.path}>{route.breadcrumbName}</Link>
  }

  return <Breadcrumb routes={routes} itemRender={itemRender || defaultItemRender} />
}
