import { Form, Row } from 'antd'
import { FormItem, ImageCountSelect, PappperButton } from '~/components/common'
import { DeleteFilled } from '@ant-design/icons'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { ESubmissionDetailTabLabel } from '~/containers/submission-management/index.types'

export const OtherPageConfig = () => {
  const { t } = useAppTranslation()

  const countDuplicated = (valueCheck: string, arrCheck: string[]) => {
    return arrCheck.reduce((result, current) => {
      if (current === valueCheck) {
        return result + 1
      }
      return result
    }, 0)
  }

  return (
    <Form.List name="optionDocuments">
      {(fields, { add, remove }) => {
        const handleAddDocument = () => {
          if (fields.length === 0) {
            add({ label: `New document` })
          } else {
            const key = fields[fields.length - 1].key + 1
            add({ label: `New document ${key}` })
          }
        }

        return (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key}>
                <div className="w-32">
                  <FormItem
                    {...restField}
                    className="mb-0"
                    name={[name, 'label']}
                    rules={[
                      ({ getFieldsValue }) => ({
                        validator(_, value) {
                          const optionDocumentsValue = getFieldsValue(
                            fields.map((f) => ['optionDocuments', f.name]),
                          ).optionDocuments
                          const optionDocumentLabels = optionDocumentsValue.map((item) => item.label.trim())
                          const defaultTabLabels = [
                            ESubmissionDetailTabLabel.indentification,
                            ESubmissionDetailTabLabel.application,
                            ESubmissionDetailTabLabel.residence,
                            ESubmissionDetailTabLabel.customer,
                            ESubmissionDetailTabLabel.employment,
                            ESubmissionDetailTabLabel.other,
                          ]
                          const isDuplicated =
                            countDuplicated(value.trim(), [...optionDocumentLabels, ...defaultTabLabels]) >= 2
                          if (isDuplicated) {
                            return Promise.reject(new Error('Label must be unique'))
                          }
                          return Promise.resolve()
                        },
                      }),
                    ]}
                  >
                    <input className="font-bold w-full" placeholder="text input" />
                  </FormItem>
                  <button type="button" onClick={() => remove(name)}>
                    <DeleteFilled />
                  </button>
                </div>
                <FormItem className="grow" name={[name, 'items']}>
                  <ImageCountSelect showAddbutton={true} />
                </FormItem>
              </Row>
            ))}
            <PappperButton variant="primary" className="mr-2" rounded="button" onClick={handleAddDocument}>
              {t('product.newDocuments')}
            </PappperButton>
          </>
        )
      }}
    </Form.List>
  )
}
