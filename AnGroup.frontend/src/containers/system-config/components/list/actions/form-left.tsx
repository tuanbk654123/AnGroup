import { SelectBox } from '~/components/common'
// import { TextInputSearch } from '~/components/common'

export const ActionFormLeft = () => {
  return (
    <div className="flex">
      {/* <TextInputSearch className="mr-3" height="small" /> */}
      {/* <SelectBox
        placeholder='Active/Inactive'
        className="mr-3"
        height="small"
        options={[
          { label: 'Active', value: 'A' },
          { label: 'Inactive', value: 'I' },
        ]}
      /> */}
      <SelectBox
        showSearch
        placeholder="Search to Select"
        // optionFilterProp="children"
        size="large"
        className="mr-3 w-6/12"
        options={[
          { label: 'Active', value: 'A' },
          { label: 'Inactive', value: 'I' },
        ]}
      ></SelectBox>
    </div>
  )
}
