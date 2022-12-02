import { Row, Switch } from 'antd'
import { EditRecordIcon, AddRecordIcon, TrashIcon } from '~/components/common/icons'
import { DownloadRecordIcon } from '~/components/common/icons/download-record-icon'
import { SendApprovalIcon } from '~/components/common/icons/send-approval'
import { ShowRecordIcon } from '~/components/common/icons/show-icon'
import { ApprovalIcon } from '~/components/common/icons/approval'

import './styles.scss'
import { RepayIcon } from '~/components/common/icons/repay'
import { CalendarIcon } from '~/components/common/icons/calendar'
import { CancelCalendarIcon } from '~/components/common/icons/cancelcalendar'
import { UnPublishIcon } from '~/components/common/icons/unpublish'
import { HidePostIcon } from '~/components/common/icons/hidepost'

export enum EActionsType {
  edit = 'edit',
  switch = 'switch',
  add = 'add',
  show = 'show',
  delete = 'delete',
  download = 'download',
  send_approval="send_approval",
  approval="approval",
  repay='repay',
  calendar='calendar',
  cancel_calendar='cancel_calendar',
  unpublish='unpublish',
  hidepost='hidepost',
}

export type TActionsType = keyof typeof EActionsType

export interface ITableActionsProps {
  onAction?: (actionType: TActionsType, value?: any) => void
  defaultChecked?: boolean
  allowActions?: Array<TActionsType>
  switchLoading?: boolean
}

export const TableActions = ({
  onAction,
  defaultChecked,
  allowActions = ['add', 'edit', 'switch', 'show', 'download', 'delete','send_approval','approval'],
  switchLoading = false,
}: ITableActionsProps) => {
  const handleAction: ITableActionsProps['onAction'] = (actionType: TActionsType, value?: any) => {
    onAction?.(actionType, value)
  }

  return (
    <Row align="middle">
      {allowActions.includes('show') && (
        <button className="mr-4" onClick={(value) => handleAction(EActionsType.show, value)}>
          <ShowRecordIcon className="fill-[#041662] hover:fill-cyan-700" />
        </button>
      )}
      {allowActions.includes('edit') && (
        <button className="mr-4" onClick={(value) => handleAction(EActionsType.edit, value)}>
          <EditRecordIcon className="fill-[#041662] hover:fill-cyan-700" />
        </button>
      )}
      {allowActions.includes('switch') && (
        <Switch
          loading={switchLoading}
          size="small"
          checked={defaultChecked}
          defaultChecked={defaultChecked}
          className="custom-switch mr-4"
          onChange={(value) => handleAction(EActionsType.switch, value)}
        />
      )}
      {allowActions.includes('add') && (
        <button onClick={(value) => handleAction(EActionsType.add, value)}>
          <AddRecordIcon className="fill-[#041662] hover:fill-cyan-700 mr-4" />
        </button>
      )}
      
      {allowActions.includes('delete') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.delete, value)}>
          <TrashIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
      {allowActions.includes('download') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.download, value)}>
          <DownloadRecordIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
      {allowActions.includes('send_approval') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.send_approval, value)} title="Gửi duyệt">
          <SendApprovalIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
      {allowActions.includes('approval') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.approval, value)} title="Duyệt">
          <ApprovalIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
      {allowActions.includes('repay') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.repay, value)} title="Trả lại">
          <RepayIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
        {allowActions.includes('calendar') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.calendar, value)} title="Đặt lịch">
          <CalendarIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
        {allowActions.includes('cancel_calendar') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.cancel_calendar, value)} title="Hủy đặt lịch">
          <CancelCalendarIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
        {allowActions.includes('unpublish') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.unpublish, value)} title="Hủy xuất bản">
          <UnPublishIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
        {allowActions.includes('hidepost') && (
        <span className="mr-4" onClick={(value) => handleAction(EActionsType.hidepost, value)} title="Ẩn bài viết">
          <HidePostIcon className="fill-[#041662] hover:fill-cyan-700" />
        </span>
      )}
    </Row>
  )
}
