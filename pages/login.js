import React, {Component, useEffect, useState} from "react";
import GetApiUrl from "../utility/Config";
import axios from "axios";
import { useCookies } from "react-cookie"
import {useRouter} from "next/router";

export default function Login(){
    const [cookie, setCookie] = useCookies(["login"])
    const router = useRouter()
    const [formState, setFormState] = useState({
        email : "",
        password : ""
    })

    useEffect(()=>{
        if(cookie.login){
            router.replace('/')
        }
    },[])


   const  LoginSubmit = (e) =>{
       e.preventDefault();
       if(formState.email == "test@admin.com" && formState.password == "Monty@1234"){
           setCookie("login", true, {
               path: "/",
               maxAge: 3600, // Expires after 1hr
               sameSite: true,
           })
           router.replace('/')
       }
    }

    return (
        <>

            <div className="login-page">
                <div className="login-auth-wrapper">
                    <div className="login-auth-inner">
                        <form onSubmit={LoginSubmit}>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email"
                                onChange={(e)=>{
                                    setFormState({
                                        ...formState,
                                        email: e.target.value,

                                    })
                                }}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                       onChange={(e)=>{
                                           setFormState({
                                               ...formState,
                                               password: e.target.value,
                                           })
                                       }}/>
                            </div>



                            <button type="submit" className="btn btn-primary btn-block">Submit</button>

                        </form>
                    </div>
                </div>


            </div>


        </>
    )

}
