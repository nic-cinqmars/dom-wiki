import React, {ReactNode, useRef, useState} from "react";
import RecursiveCategory, {RecursiveCategoryProps} from "./RecursiveCategory";


function Header()
{
    return (
            <button className="side-bar-header">
                <img className="dom-logo" src="/domLogo2.png" alt="DOM"/>
                Domain of Magica
            </button>
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
        <div className="side-bar-container">
            <Header/>
            <div className="side-bar-category-container">
                {categories.map(({category, rowItems, rowItemsType}, index) => {
                    return <RecursiveCategory key={index} category={category} rowItems={rowItems} rowItemsType={rowItemsType}/>;
                })}
            </div>
        </div>
    );
}

export default SideBar;