import { useCallback, useEffect, useState } from 'react'
import { useDebounceValue } from '~/hooks'
import { userServices } from '~/services'
import { Sale } from '~/types'
import { ISelectBoxProps, Option, SelectBox } from '../select-box'

interface ISelectboxInfiniteProps extends ISelectBoxProps {
  onChangeSelect?: (value: any) => void
  searchOnlyActiveUser?: boolean
}

export const SelectboxInfinite = ({ onChangeSelect, searchOnlyActiveUser, ...props }: ISelectboxInfiniteProps) => {
  const [loadingFetchSale, setFecthSaleLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<Sale[]>([])
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<Sale>()
  const [isTouched, setIsTouched] = useState(false)

  const debouncedSearchTerm: string = useDebounceValue<string>(searchTerm, 1000)

  const handleChange = (value) => {
    const _selectedItem = options.find((item) => `${item.id}` === `${value}`)
    setSelectedItem(_selectedItem)
    if (onChangeSelect) {
      onChangeSelect(value)
    }
  }

  const fetchSales = useCallback(
    async (pageIndex, searchTerm) => {
      const filter = {
        email: searchTerm,
        userType: '1',
      }

      if (searchOnlyActiveUser) {
        filter['status'] = 'A'
      }

      const res = await userServices.getAll({
        forSelect: true,
        pagination: {
          pageIndex,
          pageSize: 10,
        },
        filter,
      })
      if (res.data) {
        const options = res.data.data.result
        setOptions((prev) => (pageIndex === 1 ? options : [...prev, ...options]))
        setPageCount(res.data.data.pagination?.pageCount)
        setTimeout(() => {
          setFecthSaleLoading(false)
        }, 1500)
      }
    },
    [searchOnlyActiveUser],
  )

  useEffect(() => {
    if (isTouched) {
      fetchSales(pageIndex, debouncedSearchTerm)
    }
  }, [fetchSales, pageIndex, debouncedSearchTerm, isTouched])

  const onScroll = (event) => {
    const target = event.target
    if (!loadingFetchSale && target.scrollTop + target.offsetHeight === target.scrollHeight && pageIndex < pageCount) {
      target.scrollTo(0, target.scrollHeight)
      setFecthSaleLoading(true)
      setPageIndex((prev) => prev + 1)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPageIndex(1)
  }

  return (
    <SelectBox
      onFocus={() => {
        if (isTouched) {
          fetchSales(1, selectedItem?.email)
        } else {
          setIsTouched(true)
        }
      }}
      onPopupScroll={onScroll}
      onSearch={handleSearch}
      onChange={handleChange}
      showSearch
      filterOption={false}
      optionLabelProp="label"
      {...props}
    >
      <>
        {options.map((option) => (
          <Option key={option.id} label={option.fullname} value={option.id}>
            <div className="flex flex-col">
              <span>{option.fullname}</span>
              <span>{option.email}</span>
            </div>
          </Option>
        ))}
        {loadingFetchSale && <Option key="loading">Loading...</Option>}
      </>
    </SelectBox>
  )
}
