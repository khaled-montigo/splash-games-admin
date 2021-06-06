import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import {Editor} from "@craftjs/core";
import React, {useEffect} from "react";
import {SettingsPanel} from "./SettingsPanel";
import {useCookies} from "react-cookie";
import { useRouter } from 'next/router'



const Layout = ({children}) => {
    const [cookie, setCookie] = useCookies(["login"])
    const router = useRouter()
   useEffect(()=>{
       if(!cookie.login){
           router.push('/login')
       }
   },[])

    return (
        <>
            <Sidebar/>
            <TopNav/>

            <div className={'page-content'}>
                {children}
            </div>
        </>
    );
}
export default Layout;