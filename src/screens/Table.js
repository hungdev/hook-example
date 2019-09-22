import React from 'react'
import { Table } from 'antd';
import columns from './Columns'

function TableView(props) {
  const { data, onDelete, onEdit } = props
  return (
    <div>
      <Table columns={columns(onEdit, onDelete)} dataSource={data} />
    </div>
  )
}

export default TableView
