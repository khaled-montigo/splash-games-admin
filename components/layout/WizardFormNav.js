import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {IoIosArrowForward} from 'react-icons/io';
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'
import * as DiIcons from 'react-icons/di'
import * as FiIcons from 'react-icons/fi'
import * as FcIcons from 'react-icons/fc'
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
import * as GoIcons from 'react-icons/go'
import * as GrIcons from 'react-icons/gr'
import * as HiIcons from 'react-icons/hi'
import * as ImIcons from 'react-icons/im'
import * as IoIcons from 'react-icons/io'
import * as Io5Icons from 'react-icons/io5'
import * as mdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import * as SiIcons from 'react-icons/si'
import * as TiIcons from 'react-icons/ti'
import * as VscIcons from 'react-icons/vsc'
import * as WiIcons from 'react-icons/wi'
import * as CgIcons from 'react-icons/cg'




const WizardFormNav = (props) => {

    const StepTitle = (Step) => {

        if(Array.isArray(props.titles)){
            if(props.titles.length >= Step){
                if(props.titles[Step - 1]){
                   const  Title = props.titles[Step - 1].title;
                    return Title;
                }
            }
        }
        return "";
    }

    const StepIconName = (Step) => {
        if(Array.isArray(props.titles)){
            if(props.titles.length >= Step){
                if(props.titles[Step - 1]){
                    return props.titles[Step - 1].icon;
                }
            }
        }
        return "";
    }

    const DynamicFaIcon = ({IconName})  => {
        if(!IconName){
            return '';
        }
        let IconComponent = null;
        const IconType = IconName.substring(0, 2).toLowerCase();
        if(IconType == "ai"){
            IconComponent = AiIcons[IconName]
        }
        if(IconType == "bs"){
            IconComponent = BsIcons[IconName]
        }
        if(IconType == "bi"){
            IconComponent = BiIcons[IconName]
        }
        if(IconType == "di"){
            IconComponent = DiIcons[IconName]
        }
        if(IconType == "fi"){
            IconComponent = FiIcons[IconName]
        }
        if(IconType == "fc"){
            IconComponent = FcIcons[IconName]
        }
        if(IconType == "fa"){
            IconComponent = FaIcons[IconName]
        }
        if(IconType == "gi"){
            IconComponent = GiIcons[IconName]
        }
        if(IconType == "go"){
            IconComponent = GoIcons[IconName]
        }
        if(IconType == "gr"){
            IconComponent = GrIcons[IconName]
        }
        if(IconType == "hi"){
            IconComponent = HiIcons[IconName]
        }
        if(IconType == "im"){
            IconComponent = ImIcons[IconName]
        }
        if(IconType == "io"){
            IconComponent = IoIcons[IconName]
            if(!IconComponent){
                IconComponent = Io5Icons[IconName]
            }
        }
        if(IconType == "md"){
            IconComponent = mdIcons[IconName]
        }
        if(IconType == "ri"){
            IconComponent = RiIcons[IconName]
        }
        if(IconType == "si"){
            IconComponent = SiIcons[IconName]
        }
        if(IconType == "ti"){
            IconComponent = TiIcons[IconName]
        }
        if(IconType == "vs"){
            IconComponent = VscIcons[IconName]
        }
        if(IconType == "wi"){
            IconComponent = WiIcons[IconName]
        }
        if(IconType == "cg"){
            IconComponent = CgIcons[IconName]
        }
        if (!IconComponent) { // Return a default one
            return '';
        }
        return <IconComponent size={"40"} />;
    };


    const StepRender = (Step) => {
        const ActiveClass = (props.currentStep >= Step) ? 'active-nav-step' : '' ;
        return(
            <>
            <Row>
                <Col xs={12}>
                    <div className={`wizard-nav-step ${ActiveClass}`}>
                        <div className={'wizard-nav-label'}>
                            <DynamicFaIcon IconName={StepIconName(Step)}  />
                            <h3 className={'wizard-nav-title'}>{Step}. {StepTitle(Step)}</h3>
                        </div>
                        {Step < props.totalSteps &&
                       <span>
                            <IoIosArrowForward size={"20"}/>
                       </span>
                        }

                    </div>
                </Col>
            </Row>
            </>
        )
    }

    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        dots.push((
            StepRender(i)
        ));
    }

    return (
        <div className={'wizard-nav'}>
            <div className={'wizard-nav-steps'}>
                {dots}
            </div>
            <hr/>
        </div>
    );
};

export default WizardFormNav;