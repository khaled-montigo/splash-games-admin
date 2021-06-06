import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {Component} from "react";
import { withForm, FormGroup, EasyField, SwitchGroup} from 'react-bootstrap-formutil';
import { FormControl, Card, InputGroup,Form } from 'react-bootstrap';
import ValidationForm from "../components/validation/ValidationForm";
import ValidationFormConst from "../components/validation/ValidationFormConst";
import InstagramOverview from "../components/InstagramOverview";

export default class Home extends Component {

    submit = () => {
        const { $invalid, $getFirstError, $params } = this.props.$formutil;

        if ($invalid) {
           console.log("inValid");
        } else {
            console.log("Valid");
        }
    };

    render() {
        return (
            <>

                <div id="main">
                    <Card className={'custom-card'}>
                        <Card.Header >
                            <Card.Title>Welcome</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          Welcome To Splash Game Admin Panel
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </div>

            </>
        )
    }

}
