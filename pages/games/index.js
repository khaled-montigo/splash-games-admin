import Router from 'next/router'
import Link from 'next/link'

import {Container, Row, Col,    Card} from "react-bootstrap";
import React from "react";
import GetApiUrl from '/utility/Config'
import DataTable from 'react-data-table-component';
import {BiEdit} from 'react-icons/bi';
import {MdDeleteForever} from 'react-icons/md';
import {useCookies} from "react-cookie";
import axios from "axios";


export default function GameDetails({GamesPropertiesList}){
    const [myCookie, setCookie] = useCookies(["session"]);
    const [sweetAlertState, setSweetAlertState] = React.useState(0);
    const [errorAlertState, setErrorAlertState] = React.useState({
        serverError : 0,
        message : "",
        errors : ""
    });
    const columns = [
        {
            name: 'Image',
            selector: 'image',
            cell: row => <div><img className={'table-list-icon'} src={row.image}/></div>
        },
        {
            name: 'Logo',
            selector: 'logo',
            cell: row => <div><img className={'table-list-icon'} src={row.logo}/></div>
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },

        {
            name: 'action',
            sortable: true,
            right: true,
            cell: row => <div> {ActionRow(row)}</div>

        },
    ];



    const ActionRow = (row) =>{
        return(
            <>
                <a href={`/games/edit/${row.id}`} className="btn btn-sm btn-clean btn-icon">
                    <BiEdit/>
                </a>
                <button onClick={() => { DeleteRow(row.id) }} className="datatable-delete-button btn btn-sm btn-clean btn-icon">
                    <MdDeleteForever/>
                </button>
            </>
        )
    }


    const DeleteRow = (ID) =>{
        let url = GetApiUrl("games/" + ID);
        axios.delete(url, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + myCookie.session,
            }
        }).then(res => { // then print response status
            if(res.data.success){
                setSweetAlertState(1);
            }
        }).catch(error => {
            const ErrorData = GetErrorsFromResponse(error.response);
            setErrorAlertState({
                serverError: ErrorData.serverError,
                message: ErrorData.message,
                errors: ErrorData.errors
            });
            window.scrollTo(0, 0);
        });
    }




    return(
        <>
            {errorAlertState.serverError != 0 &&
            (
                <Alert variant="danger">
                    <Alert.Heading>Error : {errorAlertState.serverError}</Alert.Heading>
                    <p>{errorAlertState.message}</p>
                    <hr />
                    <p dangerouslySetInnerHTML={{__html: errorAlertState.errors}} className="mb-0"></p>
                </Alert>
            )
            }
            <Card className={'custom-card mt-3'}>
                <Card.Header>
                    <h4>Game properties </h4>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                noHeader
                                columns={columns}
                                data={GamesPropertiesList.data}
                                // selectableRows // add for checkbox selection
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {sweetAlertState === 1 &&
            <SweetAlert success title="The Model Deleted successfully " onConfirm={() => {
                window.location.reload();
            }} onCancel={() => {
                window.location.reload();
            }}>
                You clicked the button!
            </SweetAlert>
            }
        </>

    )
}



export async function getServerSideProps({params}){
    let url = GetApiUrl("games");
    const request = await fetch(url)
    const GamesPropertiesList = await request.json()

    return{
        props:{
            GamesPropertiesList,
        }
    }
}