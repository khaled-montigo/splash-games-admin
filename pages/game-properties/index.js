import Router from 'next/router'
import Link from 'next/link'

import {Container, Row, Col,    Card} from "react-bootstrap";
import React from "react";
import GetApiUrl from '/utility/Config'
import DataTable from 'react-data-table-component';
import {BiEdit} from 'react-icons/bi';
import {MdDeleteForever} from 'react-icons/md';


export default function GameDetails({GamesPropertiesList}){

    const columns = [
        {
            name: 'Icon',
            selector: 'icon',
            cell: row => <div><img className={'table-list-icon'} src={row.icon}/></div>
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'description',
            selector: 'description',
            sortable: true,
            right: true,

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
                <a href={`/game-properties/edit/${row.id}`} className="btn btn-sm btn-clean btn-icon">
                    <BiEdit/>
                </a>
                <button onClick={DeleteRow(row.id)} className="datatable-delete-button btn btn-sm btn-clean btn-icon">
                    <MdDeleteForever/>
                </button>
            </>
        )
    }

    const DeleteRow = (ID) =>{

    }




    return(
        <>
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
        </>

    )
}



export async function getServerSideProps({params}){
    let url = GetApiUrl("game-properties");
    const request = await fetch(url)
    const GamesPropertiesList = await request.json()

    return{
        props:{
            GamesPropertiesList,
        }
    }
}