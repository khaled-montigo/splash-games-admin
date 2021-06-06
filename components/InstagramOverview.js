import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SetCodingView, setEditingView } from "../reducers/Coding/actionCreator";
import { useEditor } from '@craftjs/core';
import {Row, Col, Button, ButtonToolbar, Modal} from 'react-bootstrap';
import copy from 'copy-to-clipboard';


const InstagramOverview = () => {
  const dispatch = useDispatch();
  const { Coding, FunctionsData } = useSelector(state => {
    return {
      Coding: state.IsCoding,
      FunctionsData: state.CodeFunctions
    };
  });

  const [modalShow, setModalShow] = useState(false);
  const [builderCode, setBuilderCode] = useState("");

  const modalHandleClose = () => setModalShow(false);
  const modalHandleShow = () => setModalShow(true);

  const { actions, query, enabled, canUndo, canRedo } = useEditor(
      (state, query) => ({
        enabled: state.options.enabled,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
      })
  );



  const ShowCode = () => {
    dispatch(SetCodingView());

  }

  const HideCode = () => {
    dispatch(setEditingView());
  }

  const CopyBuilderJson = () => {
    const stringJson = query.serialize();
    copy(stringJson);
    const jsonObj = JSON.parse(stringJson);

    console.log(jsonObj);
  }
  const GetFunctions = () => {

  }



  return (
  <>
  <Row>
    <Col xs={12}>
       <span className="pr-4 pt-5">
        {Coding  &&
        <Button className={'mt-2'} variant={'secondary'} onClick={HideCode}>HideCode </Button>
        }
        {!Coding  &&
        <Button  className={'mt-2'}  variant={'primary'} onClick={ShowCode}>ShowCode </Button>
        }
      </span>
      <span  className="pr-4 pt-5">
        <Button  className={'mt-2'}  variant={'primary'} onClick={CopyBuilderJson}>Copy Builder Json </Button>
      </span>
      <span  className="pr-4 pt-5">
        <Button  className={'mt-2'}  variant={'primary'} onClick={modalHandleShow}>Add Builder Json </Button>
      </span>

    </Col>
  </Row>

    <Modal show={modalShow} onHide={modalHandleClose}   size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="jsonCodeInput">Json Code</label>
          <input type="text" className="form-control" id="jsonCodeInput" aria-describedby="jsonCodeHelp"
                 placeholder="Enter json code" value={builderCode} onChange={(e)=> {
                   setBuilderCode(e.target.value);
          }}/>
            <small id="jsonCodeHelp" className="form-text text-muted"> </small>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalHandleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>{
          actions.deserialize(builderCode);
        }}>
          Load Data
        </Button>
      </Modal.Footer>
    </Modal>


  </>
  );
};

export default InstagramOverview;
