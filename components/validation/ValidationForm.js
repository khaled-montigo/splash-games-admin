import React, { Component } from 'react';
import { withForm, FormGroup,  } from 'react-bootstrap-formutil';
import {Card, Form, FormControl} from 'react-bootstrap';
import Select from 'react-select'


@withForm
export default class ValidationForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const { $invalid, $errors, $batchDirty, $params } = this.props.$formutil;
        if ($invalid) {
            $batchDirty(true);


        } else {
            console.log("Valid");
        }
        return;
    }


    render() {
        return (
          <>
              <Form onSubmit={this.handleSubmit} >
                  <FormGroup
                      required
                      maxLength="5"
                      disableChar="z"
                      validMessage={{
                          required: '请输入用户名',
                      }}
                      name="agree"
                      label="Name"
                      wrapperCol={{
                          xs: 6,
                          md: 2
                      }}
                      labelCol={{
                          xs: 6,
                          md: 2
                      }}>
                      <FormControl type="text" />

                  </FormGroup>
                  <FormGroup
                      className={'select2-row'}
                      required
                      maxLength="5"
                      $validators={{
                          required: value => !!value || '该项必填',
                          maxLength: (value, len) => {
                              if(value.value){
                                  return value.value.length <= parseInt(len) || '最少长度：' + len
                              }
                              return 'asdfasdfasfs'

                          },
                      }}
                      name="selection"
                      label="Select"
                      wrapperCol={{
                          xs: 6,
                          md: 2
                      }}
                      labelCol={{
                          xs: 6,
                          md: 2
                      }}>
                      <Select    className={'select-2'}  options={[
                          { value: 'asd', label: 'asds' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' }
                      ]} />
                  </FormGroup>
                  <FormGroup>
                      <FormControl type="submit" />
                  </FormGroup>
              </Form>
          </>
        );
    }
}