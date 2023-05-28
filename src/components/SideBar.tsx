import React, {ReactNode, useRef, useState} from "react";
import RecursiveCategory, {RecursiveCategoryProps} from "./RecursiveCategory";
import {Link} from "react-router-dom";


function Header()
{
    return (
            <Link className="decoration-inherit text-inherit border-b-2 mb-2.5 p-2.5 border-cyan-300 text-xl font-bold flex items-center justify-around gap-2.5 object-contain" to={"/"}>
                <img className="w-10 object-contain" src="/domLogo2.png" alt="DOM"/>
                Domain of Magica
            </Link>
    );
}

interface SideBarProps
{
    categories : RecursiveCategoryProps[];
}

function SideBar({categories} : SideBarProps)
{
    console.log(categories);
    return (
        <div className="fixed top-0 bg-[#1f1c23] w-96 h-screen flex flex-col p-5">
            <Header/>
            <div className="side-bar-category-container gutter-stable overflow-auto">
                {categories.map(({category, rowItems, rowItemsType}, index) => {
                    return <RecursiveCategory key={index} category={category} rowItems={rowItems} rowItemsType={rowItemsType}/>;
                })}
            </div>
        </div>
    );
}

export default SideBar;