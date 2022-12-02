import { FormInstance } from 'antd'
import { useWatch } from 'antd/lib/form/Form'
import { FocusEventHandler, useEffect, useRef, useState, useCallback } from 'react'

import { IDataFields, IDetailsFormProps } from '~/containers/submission-management/index.types'
import { FormItem, PapperDatePicker, SelectBox, TextInput } from '~/components/common'
import { useAppTranslation } from '~/hooks'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionGetAddressCityRequest, submissionGetAddressDistrictRequest, submissionGetAddressWardRequest } from '~/redux/slices/submission/middleware'
import { Input } from "antd";
export interface IFormElementProps {
  disabled?: boolean
  field: IDataFields
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
  className?: string
  formInstance: FormInstance
  applicationFormType?: number
  dataKey: IDetailsFormProps['dataKey']
}

export const FormElement = ({
  disabled,
  field,
  onFocus,
  onBlur,
  className,
  formInstance,
  applicationFormType,
  dataKey,
}: IFormElementProps) => {
  const { t } = useAppTranslation()
  const submissionSource = useAppSelector((state) => state.submission.submissionSource)
  const dispatch = useAppDispatch()
  const currentFieldValue = useWatch(field.name, formInstance)
  // console.log("currentFieldValue", currentFieldValue)
  const elementRef = useRef(null)

  const [addressOptions, setAddressOptions] = useState([])

  const getAddressOptions = useCallback(() => {
    const { level, dependOnFieldName } = field.addressOptionConfig
    // console.log({ level, dependOnFieldName })
    const code = dependOnFieldName && formInstance?.getFieldValue(dependOnFieldName)

    if (level === 3 && !dependOnFieldName) {
      dispatch(
        submissionGetAddressCityRequest({
          data: { level, code },
          onSuccess(data?) {
            const options = data.map((item) => ({
              value: item.value,
              label: item.name,
            }))
            if (data.length > 0) {
              setAddressOptions(options)
            }
            else {
              console.log("Đã xảy ra lỗi")
            }

          },
          onError() {
            dispatch(
              submissionGetAddressCityRequest({
                data: { level, code },
                onSuccess(data?) {
                  const options = data.map((item) => ({
                    value: item.value,
                    label: item.name,
                  }))
                  setAddressOptions(options)
                }
              }),
            )

          },
          requestWithLoading: false,
        }),
      )
    } else if (level === 3 && dependOnFieldName) {
      dispatch(
        submissionGetAddressDistrictRequest({
          data: { level, code },
          onSuccess(data?) {
            const options = data.map((item) => ({
              value: item.value,
              label: item.name,
            }))
            if (data.length > 0) {
              setAddressOptions(options)
            }
            else {
              console.log("Đã xảy ra lỗi")
            }
          },
          onError() {
            dispatch(
              submissionGetAddressDistrictRequest({
                data: { level, code },
                onSuccess(data?) {
                  const options = data.map((item) => ({
                    value: item.value,
                    label: item.name,
                  }))
                  setAddressOptions(options)
                }
              }),
            )
          },
          requestWithLoading: false,
        }),
      )
    }
    else if (level === 4) {
      dispatch(
        submissionGetAddressWardRequest({
          data: { level, code },
          onSuccess(data?) {
            const options = data.map((item) => ({
              value: item.value,
              label: item.name,
            }))
            if (data.length > 0) {
              setAddressOptions(options)
            }
            else {
              console.log("Đã xảy ra lỗi")
            }
          },
          onError() {
            dispatch(
              submissionGetAddressWardRequest({
                data: { level, code },
                onSuccess(data?) {
                  const options = data.map((item) => ({
                    value: item.value,
                    label: item.name,
                  }))
                  setAddressOptions(options)
                }
              }),
            )

          },
          // requestWithLoading: false,
        }),
      )
    }
    // if (dependOnFieldName && !code) return

    // dispatch(
    //   submissionGetAddressRequest({
    //     data: { level, code },
    //     onSuccess(data?) {
    //       const options = data.map((item) => ({
    //         value: item.value,
    //         label: item.name,
    //       }))
    //       setAddressOptions(options)
    //     },
    //     onError() {
    //       dispatch(
    //         submissionGetAddressRequest({
    //           data: { level, code },
    //           onSuccess(data?) {
    //             const options = data.map((item) => ({
    //               value: item.value,
    //               label: item.name,
    //             }))
    //             setAddressOptions(options)
    //           }
    //         }),
    //       )

    //     },
    //     requestWithLoading: false,
    //   }),
    // )
  }, [dispatch, setAddressOptions, field.addressOptionConfig, formInstance])

  useEffect(() => {
    const formElement = document.getElementById('submission-form')
    const handleScroll = () => {
      elementRef.current?.blur?.()
    }

    formElement.addEventListener('scroll', handleScroll)
    return () => {
      formElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (field.type === 'address' && currentFieldValue && addressOptions.length === 0) {
      getAddressOptions()
    }
  }, [currentFieldValue, addressOptions, field, getAddressOptions, setAddressOptions])

  const getFieldOptions = (fieldname: string) => {
    let sourceOptions = submissionSource.filter((item) => item?.apiField === fieldname)

    if (dataKey === 'application') {
      sourceOptions = sourceOptions.filter((item) => item.typeForm === applicationFormType)
    }

    return sourceOptions.map((item) => ({
      label: `${item.value}-${item.name}`,
      value: item.value,
    }))
  }

  const handleFocusAddress = (e) => {
    getAddressOptions()
    onFocus?.(e)
  }
  const a: any = [
    {
      name: "Bản gốc giấy thanh toán lương gần nhất",
      value: "2"
    }, {
      name: "Sao kê tài khoản ngân hàng",
      value: "3"
    }]
  const renderElement = () => {
    switch (field.type) {
      case 'selectbox':
        return (
          <SelectBox
            ref={elementRef}
            disabled={disabled}
            size="middle"
            onFocus={onFocus}
            onBlur={onBlur}
            options={getFieldOptions(field.name)}
          />
        )
      case 'address':
        return (
          <SelectBox
            ref={elementRef}
            disabled={disabled}
            size="middle"
            onFocus={handleFocusAddress}
            onBlur={onBlur}
            options={addressOptions}
          />
        )
      case 'date':
        return (
          <PapperDatePicker
            ref={elementRef}
            disabled={disabled}
            className={`${className} w-full rounded-select`}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'datejoining':
        return (
          <PapperDatePicker
            ref={elementRef}
            disabled={disabled}
            className={`${className} w-full rounded-select`}
            onFocus={onFocus}
            onBlur={onBlur}
            format="YYYYMM"
          />
        )
      case 'formlist':
        return (
          <>
            {a.map((item) => (
              <Input value={item.value} name={item.name} placeholder="name" />
            ))}
          </>
        )
      default:
        return <TextInput disabled={disabled} className={className} height="small" onFocus={onFocus} onBlur={onBlur} />
    }
  }

  return (
    <FormItem
      label={field.label}
      name={field.name}
      rules={field.require && [{ required: true, message: t('validation.required') }]}
    >
      {renderElement()}
    </FormItem>
  )
}
