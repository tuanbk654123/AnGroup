import { EApplicationListType, EApplicationTabLabel, EResidenceListType, EResidenceTabLabel } from '../../index.types'

export const defaultResidenceTabs = {
  host: [
    // {
    //   key: EResidenceListType.page_of_host,
    //   label: EResidenceTabLabel.page_of_host,
    // },
    // {
    //   key: EResidenceListType.optional_page,
    //   label: EResidenceTabLabel.optional_page,
    // },
    {
      key: EResidenceListType.page_of_cover,
      label: EResidenceTabLabel.page_of_cover,
    },
    {
      key: EResidenceListType.page_of_host,
      label: EResidenceTabLabel.page_of_customer,
    },
    {
      key: EResidenceListType.optional_page,
      label: EResidenceTabLabel.optional_page,
    },
  ],
  customer: [
    {
      key: EResidenceListType.page_of_cover,
      label: EResidenceTabLabel.page_of_cover,
    },
    {
      key: EResidenceListType.page_of_customer,
      label: EResidenceTabLabel.page_of_customer,
    },
    {
      key: EResidenceListType.optional_page,
      label: EResidenceTabLabel.optional_page,
    },
  ],
}

export const defaultApplicationTabs = {
  loan: [
    {
      key: EApplicationListType.page_1,
      label: EApplicationTabLabel.page_1,
    },
    {
      key: EApplicationListType.page_2,
      label: EApplicationTabLabel.page_2,
    },
    {
      key: EApplicationListType.page_3,
      label: EApplicationTabLabel.page_3,
    },
    {
      key: EApplicationListType.page_4,
      label: EApplicationTabLabel.page_4,
    },
    {
      key: EApplicationListType.page_11,
      label: EApplicationTabLabel.page_11,
    },
  ],
  credit: [
    {
      key: EApplicationListType.page_1,
      label: EApplicationTabLabel.page_1,
    },
    {
      key: EApplicationListType.page_2,
      label: EApplicationTabLabel.page_2,
    },
    {
      key: EApplicationListType.page_3,
      label: EApplicationTabLabel.page_3,
    },
    {
      key: EApplicationListType.page_4,
      label: EApplicationTabLabel.page_4,
    },
  ],
}
