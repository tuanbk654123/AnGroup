// import { SelectBox } from '~/components/common'
import { TextInputSearch } from '~/components/common/form-control'

export const ActionFormLeft = () => {
  return (
    <div className="flex">
      <TextInputSearch className="mr-3 m-w-[250px]" height="small" placeholder="Search" />
      {/* <SelectBox
        defaultValue="002"
        className="mr-3"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      />
      <SelectBox
        className="mr-3"
        defaultValue="002"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      /> */}
    </div>
  )
}
