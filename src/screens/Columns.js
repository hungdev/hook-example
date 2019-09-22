import React from 'react'
import { Table, Divider, Tag, Row, Col } from 'antd';

const columns = (onEdit, onDelete) => {
  return (
    [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'id',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Release Year',
        dataIndex: 'releaseYear',
        key: 'releaseYear',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Row>
            <Col xl={3} onClick={() => onEdit(record)} className='cursor-pointer'>Edit</Col>
            <Divider xl={1} type="vertical" />
            <Col xl={3} onClick={() => onDelete(record)} className='cursor-pointer'>Delete</Col>
          </Row>
        ),
      },
    ]
  )
}

export default columns;