import { Col, DatePicker, Form, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { FormItem, MultipleSelect, PappperButton, TextInput, TreeSelectBox } from '~/components/common'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getDepartments } from '~/redux/slices/department/middleware'
import { selectDepartmentTrees, selectUsers } from '~/redux/slices'
import { recusiveAddLevelForEachItem, recusiveTreeSelect } from '~/utils/helper'
import { productSearchRequest } from '~/redux/slices/product/middleware'
import { fetchUsers } from '~/redux/slices/user/middleware'
import { toast } from 'react-toastify'
import { SystemStatus } from '~/types'
import { systemServices } from '~/services/system'
import { message } from '~/constants/message'
import { useForm } from 'antd/lib/form/Form'
import { reportGetAllRequest, reportGetAlls } from '~/redux/slices/report/middleware'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentParams } from '~/hooks'
import { CSVLink } from 'react-csv'
import { formatTimeInTable } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const ActionFormFilter = () => {
  const [form] = useForm()
  const currentParams = useCurrentParams()
  const [data, setDataSource] = useState<SystemStatus[]>([])
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
  const dispatch = useAppDispatch()
  const dataUser = useAppSelector(selectUsers)
  // const dataReport = useAppSelector((state) => state.report.dataReport)
  const dataReportAll = useAppSelector((state) => state.report.dataReportAll)
  const departments = useAppSelector(selectDepartmentTrees)
  // const dataProductsAll = useAppSelector((state) => state.product.dataProductsAll)
  const dataProducts = useAppSelector((state) => state.product.dataProducts)
  const [loadingExport, setLoadingExport] = useState<boolean>(false)

  const dataS = []

  const { t } = useAppTranslation()

  if (dataProducts !== undefined && dataProducts.length !== 0) {
    for (const item of dataProducts) {
      const data2 = []

      for (const item1 of item.productGroups) {
        data2.push({ ...item1, children: item1.programs })
      }
      dataS.push({
        ...item,
        children: data2,
      })
    }
  }

  const AddKeyProduct = recusiveAddLevelForEachItem({
    data: dataS?.sort((a, b) => a?.status?.localeCompare(b?.status)),
    keyDependOn: 'key',
    titleKey: 'nameEn',
    valueKey: 'id',
    addValueSuffixByLevel: true,
  })
  const AddKeyDepartment = recusiveTreeSelect({
    data: departments,
    keyDependOn: 'key',
    titleKey: 'name',
    valueKey: 'id',
    addValueSuffixByLevel: true,
  })

  const dataFile = dataReportAll?.result?.map((e) => {
    const saleNew = () => {
      if (e?.userHandle) {
        return e?.userHandle?.username
      } else if (e?.user?.usertype === '0' && e?.userHandle === null) {
        return e?.user?.username
      } else if (e?.user?.usertype === '1' && e?.userHandle !== null) {
        return e?.userHandle
      } else if (e?.user?.usertype === '1' && e?.userHandle === null) {
        return e?.user?.username
      } else if (e?.user?.usertype === '2' && e?.userHandle !== null) {
        return e?.userHandle
      } else if (e?.user?.usertype === '2' && e?.userHandle === null) {
        return e?.user?.username
      } else {
        return
      }
    }

    const renderSaleCode = () => {
      if (e?.user?.usertype === '0') {
        return e?.user?.saleCode
      } else if (e?.user?.usertype === '1') {
        return e?.user?.employeeCode
      } else if (e?.user?.usertype === '2') {
        return e?.user?.employeeCode
      } else {
        return
      }
    }

    return {
      id: e?.id,
      ghpappid: e.ghpappid,
      clientName: e.clientName,
      idNumber: e.idCard,
      product: e?.program?.group?.product?.nameEn,
      programMapping: e?.program?.mapping,
      // groupProgram: e?.program?.group?.nameEn,
      // programName: e?.program?.nameEn,
      department: e?.department?.branchTree,
      branchCode: e?.department?.branchCode,
      sale: saleNew(),
      saleCode: renderSaleCode(),
      deviceName: e?.user?.deviceName,
      status: e?.status,
      fastPushStatus: e?.fastPushStatus,
      subStatus: e?.profileStatuses
        .slice()
        .sort((a, b) => a.id - b.id)
        .at(-1)?.subStatus,
      createdDate: formatTimeInTable(e.createdDate),
    }
  })

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Ghh_AppID', key: 'ghpappid' },
    { label: t('review.Customer'), key: 'clientName' },
    { label: 'idNumber', key: 'idNumber' },
    { label: t('report.product'), key: 'product' },
    { label: 'Program Mapping', key: 'programMapping' },
    // { label: t('product.groupProgram'), key: 'groupProgram' },
    // { label: t('product.programName'), key: 'programName' },
    { label: t('report.department'), key: 'department' },

    { label: 'Branch Code', key: 'branchCode' },
    { label: 'User name', key: 'sale' },
    { label: 'Sale Code', key: 'saleCode' },
    { label: 'Device Name', key: 'deviceName' },
    { label: t('report.status'), key: 'status' },
    { label: 'Fast_Push_Status', key: 'fastPushStatus' },
    { label: 'SubStatus', key: 'subStatus' },
    { label: t('table.column.createDate'), key: 'createdDate' },
  ]
  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: dataFile,
  }

  const handleSubmit = useCallback(
    (_params) => {
      setLoadingExport(true)
      const { pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
      const values = form.getFieldsValue()
      const EndDate = values?.endDate?.format?.('YYYY/MM/DD') || null
      const StartDate = values?.startDate?.format?.('YYYY/MM/DD') || null
      const ProductIds = []
      const GroupIds = []
      const ProgramIds = []
      const DepartmentIds = []
      const ChannelIds = []
      const TeamIds = []

      if (values.product) {
        values.product.forEach((el) => {
          const item = el.split('-')
          if (item[1] === '1') {
            ProductIds.push(Number(item[0]))
          }
          if (item[1] === '2') {
            GroupIds.push(Number(item[0]))
          }
          if (item[1] === '3') {
            ProgramIds.push(Number(item[0]))
          }
        })
      }

      if (values.department) {
        values.department.forEach((el) => {
          const item = el.split('-')
          if (item[1] === '1') {
            DepartmentIds.push(Number(item[0]))
          }
          if (item[1] === '2') {
            ChannelIds.push(Number(item[0]))
          }
          if (item[1] === '3') {
            TeamIds.push(Number(item[0]))
          }
        })
      }

      const dataSubmit = {
        // ...values,
        querySearch: '',
        name: values.input || '',
        Status: '',
        StartDate,
        EndDate,
        ProductIds,
        GroupIds,
        ProgramIds,
        DepartmentIds,
        ChannelIds,
        TeamIds,
        UserIds: values.person,
        StatusIds: values.status,
        // isAll: false,
      }

      dispatch(
        reportGetAllRequest({
          reportFilters: {
            pagination: {
              pageIndex: Number(pageIndex),
              pageSize: Number(pageSize),
              isAll: false,
            },
            filter: dataSubmit,
          },
          onSuccess(){
            dispatch(
              reportGetAlls({
                reportFilters: {
                  pagination: {
                    pageIndex: Number(pageIndex),
                    pageSize: Number(pageSize),
                    isAll: true,
                  },
                  filter: dataSubmit,
                },
                onSuccess(){
                  setLoadingExport(false)
                }
              }),
            )
          }
        }),
      )
      
    },
    [dispatch, form],
  )

  const fetchDepartmentTrees = useCallback(() => {
    dispatch(
      getDepartments({
        forSelect: true,
        departmentFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 50,
            isAll: true,
          },
          filter: {
            type: '0',
            querySearch: '',
          },
        },
      }),
    )
  }, [dispatch])

  const getData = useCallback(() => {
    // dispatch(productGetAllRequest({}))
    dispatch(
      productSearchRequest({
        forSelect: true,
        data: {
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            isAll: true,
          },
          filter: {
            querySearch: '',
            name: '',
          },
        },
      }),
    )
    dispatch(
      fetchUsers({
        forSelect: true,
        userFilters: {
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            isAll: true,
          },
          filter: {
            userType: '1',
          },
        },
      }),
    )
  }, [dispatch])
  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
  useEffect(() => {
    fetchDepartmentTrees()
  }, [fetchDepartmentTrees])

  const fetchAllSystemStatus = async () => {
    const forSelect = true
    try {
      const res = await systemServices.getAllStatus(forSelect)
      // format add them title va value
      // const format = res.data.data.map((item) => ({ ...item, children: item?.subStatus }))
      // const newData = recusiveAddLevelForEachItem(format, 'id', 'nameVn', 'id')
      // ====== end

      if (res.kind === 'ok' && res.data.data.length > 0) {
        setDataSource(res.data.data.map((item) => ({ ...item, key: item.id })))
      } else {
        setDataSource([])
      }
    } catch (error) {
      toast.error(message.errorApi)
    }
  }

  useEffect(() => {
    fetchAllSystemStatus()
    getData()
  }, [getData])

  useEffect(() => {
    handleSubmit(currentParams)
  }, [handleSubmit, currentParams])

  return (
    <div className="px-5">
      <Form layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('report.input')} name="input">
              <TextInput height="medium" rounded="medium" placeholder={t('report.inputPlaceholder')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('time.startDate')} name="startDate">
              <DatePicker
                placeholder={t('time.inputStartDate')}
                style={{ borderRadius: '12px' }}
                className="w-full h-8"
                // defaultValue={moment(new Date(), dateFormatList[0])}
                format={dateFormatList}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('time.endDate')} name="endDate">
              <DatePicker
                placeholder={t('time.inputEndDate')}
                style={{ borderRadius: '12px' }}
                className="w-full h-8"
                // defaultValue={moment(new Date(), dateFormatList[0])}
                format={dateFormatList}
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={16}>
            <FormItem label={t('report.department')} name="department">
              <TreeSelectBox
                placeholder={t('report.inputDepartment')}
                multiple
                treeData={AddKeyDepartment}
                filterTreeNode={(search, item) => {
                  return item.props.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('report.person')} name="person">
              <MultipleSelect
                placeholder={t('report.inputPerson')}
                maxTagCount="responsive"
                options={dataUser?.map((item) => ({
                  label: item.fullname,
                  value: item.id,
                }))}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0
                }
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={16}>
            <FormItem label={t('report.product')} name="product">
              <TreeSelectBox
                placeholder={t('report.inputProduct')}
                multiple
                treeData={AddKeyProduct}
                filterTreeNode={(search, item) => {
                  return item.props.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('report.status')} name="status">
              <MultipleSelect
                placeholder={t('report.inputStatus')}
                options={data.map((status) => ({
                  value: status?.code,
                  label: status?.nameEn,
                }))}
              />
            </FormItem>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <PappperButton variant="primary" rounded="large" htmlType="submit" onClick={handleSubmit}>
              {t('button.search')}
            </PappperButton>
          </Col>
        </Row>
      </Form>

      <Row className="justify-end">
        <PappperButton className="px-8 ml-4" variant="primary" rounded="button" loading={loadingExport} >
          <CSVLink {...csvReport}>{t('button.export')}</CSVLink>
        </PappperButton>
      </Row>
    </div>
  )
}
