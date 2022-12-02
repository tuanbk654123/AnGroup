import { useSearchParams } from 'react-router-dom'
import { EProductListType } from '~/containers/product-management/index.types'
import { useAppDispatch } from '~/redux/hooks'
import { ProductModalBody } from './product'
import { ProductGroupModalBody } from './product-group'
import { ProductNameModalBody } from './product-name'
import { useEffect } from 'react'
import { productGetAllRequest } from '~/redux/slices/product/middleware'
import { useCurrentParams } from '~/hooks'

const modalBody = {
  [EProductListType.product]: ProductModalBody,
  [EProductListType.productGroup]: ProductGroupModalBody,
  [EProductListType.productName]: ProductNameModalBody,
}

export const CreateProductManagementBody = (props) => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || EProductListType.product

  const CurrentModalBody = modalBody[type]
  const dispatch = useAppDispatch()
  const currentParams = useCurrentParams()

  useEffect(() => {
    dispatch(productGetAllRequest({
      forSelect: true
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams])

  // const dataForm = () => {
  //   const formValues = formRef.current.getFieldsValue()

  //   let newEndDate = ''
  //   let newStartDate = ''
  //   if (formValues.groupId) {
  //     newEndDate = moment(formValues.endDate).format('YYYY/MM/DD, HH:mm')
  //     newStartDate = moment(formValues.startDate).format('YYYY/MM/DD, HH:mm')
  //     props.parentCallback({ ...formValues, endDate: newEndDate, startDate: newStartDate })
  //   } else if (formValues.productId) {
  //     newEndDate = moment(formValues.endDate).format('YYYY/MM/DD, HH:mm')
  //     newStartDate = moment(formValues.startDate).format('YYYY/MM/DD, HH:mm')
  //     props.parentCallback({ ...formValues, endDate: newEndDate, startDate: newStartDate })
  //   } else {
  //     props.parentCallback(formValues)
  //   }
  // }

  return <CurrentModalBody />
}
