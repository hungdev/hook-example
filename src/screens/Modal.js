import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Row, Col, Form, Input } from 'antd';

function ModalView(props) {
  const { form: { getFieldDecorator }, handleSubmit, form, data } = props;
  // const [visible, setVisible] = useState(props.visible || false);
  const handleOkPres = (value) => {
    value.preventDefault();
    form.validateFields(async (err, values) => {
      props.handleOk(values)
    });
  }
  const setField = () => {
    const field = {
      name: {
        value: data && data.name
      },
      releaseYear: {
        value: data && data.releaseYear,
      },
    };
    form.setFields(field);
  }

  useEffect(() => {
    // setField()
  }, [data]);

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={handleOkPres}
        onCancel={props.handleCancel}
      >
        <Row>
          <Col >
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
        </Row>
      </Modal>
    </div>
  )
}
const WrappedApp = Form.create({ name: 'modal' })(ModalView);
export default WrappedApp
