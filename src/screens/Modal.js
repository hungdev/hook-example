import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Row, Col, Form, Input } from 'antd';

function ModalView(props) {
  const { form: { getFieldDecorator }, form, data } = props;
  const handleOkPres = (value) => {
    value.preventDefault();
    form.validateFields(async (err, values) => {
      props.handleOk({ ...data, ...values })
    });
  }

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
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                  initialValue: data && data.name
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Release year">
                {getFieldDecorator('releaseYear', {
                  rules: [{ required: true, message: 'Please input your releaseYear!' }],
                  initialValue: data && data.releaseYear
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
