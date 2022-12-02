import { Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
// import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { creativePostGetByIdRequest, creativePostUpdateIdRequest } from '~/redux/slices/creativepost/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { getCheckData } from '~/redux/slices/categorycrawl/middleware'
import { PaperPageHeaderForList } from '~/components/layout'
import { ECategoryCrawlType } from '~/containers/category-crawl/search/index.types'
import { EditConfigCategotyCrawlModal } from './config-category'
import { EditConfigPageCrawlModal } from './config-page'
import { EditConfigDetailPageCrawlModal } from './config-detail-page'

const modalByTypeParams = {
  [ECategoryCrawlType.category]: EditConfigCategotyCrawlModal,
  [ECategoryCrawlType.page]: EditConfigPageCrawlModal,
  [ECategoryCrawlType.detailpage]: EditConfigDetailPageCrawlModal,
}
export const EditCategotyCrawlModal = (props) => {
  const { showEdit, hideEdit, loadPage, setLoadPage, id } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [showCheckData, setShowCheckData] = useState(null)
  const [profile, setProfile] = useState(null)
  const [checkConfigCategory, setCheckConfigCategory] = useState(false)


  const getCheck = () => {
    dispatch(
      getCheckData({
        data: { id },
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
          } else {
            console.log(data)
            setShowCheckData(data)
            setCheckConfigCategory(!checkConfigCategory)
          }
        },
        onError({ message }) {
          toast.error(t('message.error'))
        },
      }),
    )
    // if(dataCategorysAll !=null){
    //   console.log(dataCategorysAll)
    //   const _dataRole =
    //   dataCategorysAll.map?.((item) => {
    //       return {
    //         label: item.name, value: item.id
    //       }
    //     }) || []
    //     setDataCategory(_dataRole)
    // }
  }
  useEffect(() => {
    if (showEdit == true) {
      getCheck()

    }
    else {
      form.setFieldsValue({
        title: null,
        name: null,
        parentId: null,
        description: null,
        position: 0,
        order: 0,
        status: null
      })
    }

  }, [showEdit])

  const save = () => {
    hideEdit(true)

  }
  const defaultActiveKey = currentParams['type'] || ECategoryCrawlType.category
  const CurrentModal = modalByTypeParams[defaultActiveKey]

  return (
    <Modal title={t("creativepost.view")} style={{ textAlign: "center" }}
      visible={showEdit} width={770}
      // onOk={() => {
      //   save();
      // }}
      onCancel={() => {
        hideEdit(false);
      }}
      footer={null}
    >
      <div>
        <CreativePostTabList showCheckData={showCheckData}  setCheckConfigCategory={setCheckConfigCategory}/>
        <CurrentModal id={id} showEdit={showEdit} hideView={hideEdit} showCheckDataAdd={showCheckData} setShowCheckDataAdd={setShowCheckData}
        setCheckConfigCategory={setCheckConfigCategory}  checkConfigCategory={checkConfigCategory}/>
        {/* <EditConfigCategotyCrawlModal/>
        <EditConfigPageCrawlModal />
        
        <EditConfigDetailPageCrawlModal visible={true}/> */}
      </div>
    </Modal>
  )
}
export interface ICategoryCrawlActionsProps {
  showCheckData
  setCheckConfigCategory
}
export const CreativePostTabList = ({ showCheckData,setCheckConfigCategory }: ICategoryCrawlActionsProps) => {
  const navigate = useNavigate()
  const currentParams = useCurrentParams()

  const defaultActiveKey = currentParams['type'] || ECategoryCrawlType.category
  //const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()
  const tabs = [
    {
      key: ECategoryCrawlType.category,
      label: t('categorycrawl.category'),

    },
    {
      key: ECategoryCrawlType.page,
      label: t('categorycrawl.page'),
      disabled: showCheckData?.checkPage
    },
    {
      key: ECategoryCrawlType.detailpage,
      label: t('categorycrawl.detailPage'),
      disabled: showCheckData?.checkDetailPage
    },
  ]
  //const defaultActiveKey = searchParams.get('type') || tabs[0].key

  const handleChangeTab = (key: string) => {
    setCheckConfigCategory(true)
    navigate({
      pathname: RouterHelper.categorycrawl,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }
  return (

    <PaperPageHeaderForList
      // title={t('creativepost.web_title')}
      tabs={tabs}
      defaultActiveKey={defaultActiveKey}
      onTabChange={handleChangeTab}
    />
  )
}
