import { Tabs, TabsProps, TabPaneProps } from 'antd'
import { ReactNode } from 'react'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { LanguageKey } from '~/types'
import './styles.scss'

const { TabPane } = Tabs

export interface TabPaneItem extends TabPaneProps {
  label: ReactNode
  key: string
  disabled?: boolean
  value?: number | string
}

export interface IPapperTabsProps extends TabsProps {
  tabs?: TabPaneItem[]
}

export const PapperTabs = ({ defaultActiveKey, onChange, tabs = [], ...props }: IPapperTabsProps) => {
  const { t } = useAppTranslation()

  const _tabs = tabs.map((item) => ({
    ...item,
    label: typeof item.label === 'string' ? t(item.label as LanguageKey) : item.label,
  }))

  return (
    <Tabs className="paper-tabs" defaultActiveKey={defaultActiveKey} onChange={onChange} {...props}>
      {_tabs.map((tab) => (
        <TabPane tab={tab.label} key={tab.key} disabled={tab.disabled} />
      ))}
    </Tabs>
  )
}
