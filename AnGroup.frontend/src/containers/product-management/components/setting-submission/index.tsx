import { Row } from 'antd'
import { FormItem, ImageCountSelect } from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import {
  // configApplicationLoan,
  // configIdCard,
  // configResidence,
  listDefaultConfig,
} from './constant'

export const SettingSubmission = () => {
  const { t } = useAppTranslation()

  return (
    <>
      <div className="text-xl font-bold mb-3">{t('product.settingSubmission')}</div>
      {listDefaultConfig.map((config, index) => {
        return (
          <Row key={index}>
            <div className="w-32">
              <label className="font-bold">{t(`product.${config.label}`)}</label>
              {/* <FormItem layout="horizontal" className="mb-0" label="Active" name={config.activeName}>
                <PapperSwitch />
              </FormItem> */}
            </div>
            <FormItem className="grow" name={config.documentsName}>
              <ImageCountSelect showAddbutton={config.showAddbutton} />
            </FormItem>
          </Row>
        )
      })}
    </>
  )
}
