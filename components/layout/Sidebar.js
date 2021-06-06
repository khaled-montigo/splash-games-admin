import React, { useState, useEffect } from 'react';
import {  ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent, } from 'react-pro-sidebar';

import { FaGem, FaHeart} from 'react-icons/fa';
import Link from 'next/link'
import {Image} from "react-bootstrap";
import { useRouter } from 'next/router'



const Sidebar = () => {
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState('');
    const FirstTime = 'FirstTime';

    useEffect(() => {
        console.log("FF");
        const Path = router.asPath;
        const pathStrSplit = Path.split('/')
        setOpenMenu(pathStrSplit[1]);
    },[FirstTime]);

    const CheckOpen = (MenuName) => {
        if(openMenu === MenuName) {
            return true;
        }
        return false;
    }

    const ChangeOpenName = (Open, MenuName) => {
        if(Open){
            setOpenMenu(MenuName);
        }
    }


    const collapsed = false;
    return (
        <>
            <div className="main-sidebar sidebar-style-2">
                <ProSidebar collapsed={collapsed}>
                    <SidebarHeader>
                        <Image src={'/logo.png'}/>
                    </SidebarHeader>
                    <Menu iconShape="square" >
                        <SubMenu   onOpenChange={(open) =>  ChangeOpenName(open, 'game-properties')}  open={CheckOpen('game-properties')} title="Game Properties" icon={<FaGem />} >
                            <MenuItem icon={<FaGem/>}><Link href="/game-properties/add"> Add </Link> </MenuItem>
                            <MenuItem icon={<FaGem/>}><Link href="/game-properties"> List </Link> </MenuItem>
                        </SubMenu>
                        <SubMenu   onOpenChange={(open) =>  ChangeOpenName(open, 'engaging-social')}  open={CheckOpen('engaging-social')} onOpenChange={(open) =>  ChangeOpenName(open, 'engaging-social')}  title="Engaging & Social" icon={<FaHeart />}>
                            <MenuItem icon={<FaGem/>}><Link href="/engaging-social/add"> Add </Link> </MenuItem>
                            <MenuItem icon={<FaGem/>}><Link href="/engaging-social"> List </Link> </MenuItem>
                        </SubMenu>
                        <SubMenu   onOpenChange={(open) =>  ChangeOpenName(open, 'promo-tools')}  open={CheckOpen('promo-tools')} onOpenChange={(open) =>  ChangeOpenName(open, 'promo-tools')}  title="Promo Tools" icon={<FaHeart />}>
                            <MenuItem icon={<FaGem/>}><Link href="/promo-tools/add"> Add </Link> </MenuItem>
                            <MenuItem icon={<FaGem/>}><Link href="/promo-tools"> List </Link> </MenuItem>
                        </SubMenu>
                        <SubMenu   onOpenChange={(open) =>  ChangeOpenName(open, 'games')}  open={CheckOpen('games')} onOpenChange={(open) =>  ChangeOpenName(open, 'games')}  title="Games" icon={<FaHeart />}>
                            <MenuItem icon={<FaGem/>}><Link href="/games/add"> Add </Link> </MenuItem>
                            <MenuItem icon={<FaGem/>}><Link href="/games"> List </Link> </MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>

        </>
    );
}

export default Sidebar;
