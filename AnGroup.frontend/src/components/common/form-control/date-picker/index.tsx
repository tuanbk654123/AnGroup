import { useCallback, forwardRef, useImperativeHandle, useRef } from 'react'
import { DatePickerProps, DatePicker } from 'antd'
import moment, { Moment } from 'moment'

export interface PapperDatePickerProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: string
  format?: string
  onChange?: (value: string) => void
}

export const PapperDatePicker = forwardRef(
  ({ value, format = 'DD/MM/YYYY', onChange, disabled, onBlur, onFocus, className }: PapperDatePickerProps, ref) => {
    const datePickerRef = useRef<any>()

    useImperativeHandle(ref, () => ({
      blur: () => {
        datePickerRef.current?.blur?.()
      },
    }))

    const convertStringToMoment = useCallback((dateString: string, _format: string) => {
      return dateString && moment(dateString, _format)
    }, [])

    const handleChange = (date: Moment) => {
      const dateString = date.format(format)
      onChange?.(dateString)
    }

    return (
      <DatePicker
        ref={datePickerRef}
        value={convertStringToMoment(value, format)}
        format={format}
        className={`custom-picker ${className || ''}`}
        onChange={handleChange}
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    )
  },
)
