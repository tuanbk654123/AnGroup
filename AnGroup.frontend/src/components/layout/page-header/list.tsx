import { IPapperTabsProps, PapperTabs } from '~/components/common/tabs'

export interface IPageHeaderForListProps extends Pick<IPapperTabsProps, 'tabs' | 'defaultActiveKey'> {
  title?: string
  onTabChange?: IPapperTabsProps['onChange']
}

export const PaperPageHeaderForList = ({ title, defaultActiveKey, onTabChange, tabs }: IPageHeaderForListProps) => {
  return (
    <div className="bg-white pt-5 px-4 mb-6">
      <p className="page-title my-2">{title}</p>
      <PapperTabs tabs={tabs} defaultActiveKey={defaultActiveKey} onChange={onTabChange} />
    </div>
  )
}
