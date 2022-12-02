import { Row } from 'antd'

export interface ITableRoleProps {
  roles?: string[]
}

export const TableRole = ({ roles = [] }: ITableRoleProps) => {
  const isMoreRole = roles.length > 2
  return (
    <Row>
      {roles.slice(0, 2).map((item, index) => (
        <div key={index} className="column-role-item">
          {item}
        </div>
      ))}
      {isMoreRole && <div>....</div>}
    </Row>
  )
}
