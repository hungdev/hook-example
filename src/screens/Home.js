import React, { useEffect, useState, useRef, useCallback } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import axios from 'axios'
import TableView from './Table'
import ModalView from './Modal'

function Home({ form }) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState();
  const { getFieldDecorator } = form;

  const handleSubmit = (value) => {
    value.preventDefault();
    form.validateFields(async (err, values) => {
      await axios.post(
        'http://localhost:8000/movies', values,
      );
      getData()
    });
  }

  const getData = async () => {
    const result = await axios.get(
      'http://localhost:8000/movies',
    );
    setData(result.data.map((e, ind) => ({ ...e, key: ind })));
  }

  const onDelete = async (record) => {
    await axios.delete(
      `http://localhost:8000/movies/${record.id}`,
    );
    getData()
  }
  const onUpdate = async (values) => {
    await axios.put(
      `http://localhost:8000/movies/${values.id}`,
      values
    );
    getData()
  }
  const onEdit = async (record) => {
    console.log(record)
    setEditData(record)
    setVisible(true)
  }

  useEffect(() => {
    getData()
  }, []);

  const handleOk = (values) => {
    onUpdate(values)
    getData()
    setVisible(false)

  }
  const handleCancel = () => {
    setVisible(false)
  }


  return (
    <div style={{ height: '100%', width: '100%', }}>
      <Row>
        <Col xl={22}>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Release year">
              {getFieldDecorator('releaseYear', {
                rules: [{ required: true, message: 'Please input your releaseYear!' }],
              })(<Input />)}
            </Form.Item>

          </Form>
        </Col>
        <Col xl={2}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Add
        </Button>
        </Col>
      </Row>
      <Row>
        <TableView
          onDelete={onDelete}
          onEdit={onEdit}
          data={data}
        />
      </Row>
      <ModalView
        // ref={nameRef}
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={editData}
      />
    </div>
  )
}
const WrappedApp = Form.create({ name: 'coordinated' })(Home);
export default WrappedApp
