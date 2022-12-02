import { SelectBox } from '~/components/common'
import { TextInputSearch } from '~/components/common'

export const ActionFormLeft = () => {
  return (
    <div className="flex">
      <TextInputSearch className="mr-3" height="small" />
      <SelectBox
        defaultValue="002"
        className="mr-3"
        size="large"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      />
      <SelectBox
        className="mr-3"
        defaultValue="002"
        size="large"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      />
    </div>
  )
}
