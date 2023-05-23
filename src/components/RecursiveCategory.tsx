import React, {ReactNode, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RowItem, {RowItemProps} from "./RowItem";

export interface RecursiveCategoryProps
{
    category: string;
    rowItems: RecursiveCategoryProps[] | RowItemProps[];
    rowItemsType: "category" | "item";
}

function RecursiveCategory({category, rowItems, rowItemsType} : RecursiveCategoryProps)
{
    const [open, setOpen] = useState(false);
    const rowsContainerRef = useRef<HTMLDivElement>(null);

    let parentRowsContainers : HTMLElement[] = [];
    let checkedForParents = false;

    function handleClick()
    {
        setOpen(!open);
        if (rowsContainerRef.current != null)
        {
            if (rowsContainerRef.current.style.maxHeight)
            {
                handleParentMaxHeight(false);
                rowsContainerRef.current.style.maxHeight = "";
            }
            else
            {
                rowsContainerRef.current.style.maxHeight = rowsContainerRef.current.scrollHeight + "px";
                handleParentMaxHeight(true);
            }
        }
    }

    function handleParentMaxHeight(open : Boolean)
    {
        if (parentRowsContainers.length === 0 && checkedForParents)
            return;

        if (rowsContainerRef.current === null)
            return;

        if (parentRowsContainers.length === 0)
        {
            checkedForParents = true;

            let firstParent = rowsContainerRef.current.parentElement;
            let foundParent = false;

            do
            {
                foundParent = false;

                if (firstParent !== null)
                {
                    let secondParent: HTMLElement | null = firstParent.parentElement;
                    if (secondParent !== null)
                    {
                        if (secondParent.classList.contains("row-item-container"))
                        {
                            parentRowsContainers.push(secondParent);
                            firstParent = secondParent.parentElement;
                            foundParent = true;
                        }
                    }
                }
            } while (foundParent);
        }

        let newSize;

        parentRowsContainers.map((parentRowsContainer) => {
            if (rowsContainerRef.current === null)
                return;

            if (open)
                newSize = parseInt(parentRowsContainer.style.maxHeight, 10) + parseInt(rowsContainerRef.current.style.maxHeight, 10);
            else
                newSize = parseInt(parentRowsContainer.style.maxHeight, 10) - parseInt(rowsContainerRef.current.style.maxHeight, 10);

            parentRowsContainer.style.maxHeight = newSize + "px";
        });

    }

    const getCategories = (rowItems : RecursiveCategoryProps[]) => {
        let categories : ReactNode[] = [];
        rowItems.map((rowItem, index) => {
            categories.push(<RecursiveCategory key={index} category={rowItem.category} rowItems={rowItem.rowItems} rowItemsType={rowItem.rowItemsType}/>);
        });
        return categories;
    }

    const getRowItems = (rowItems : RowItemProps[]) => {
        let items : ReactNode[] = [];
        rowItems.map((rowItem, index) => {
            items.push(<RowItem key={index} itemName={rowItem.itemName} imageLink={rowItem.imageLink} rarity={rowItem.rarity} tier={rowItem.tier}/>);
        });
        return items;
    }

    return (
        <div className="side-bar-category">
            <button onClick={handleClick} className="side-bar-category-header">
                <FontAwesomeIcon icon="caret-right" className={open ? "category-caret down" : "category-caret"}/>
                {category}
            </button>
            <div ref={rowsContainerRef} className="row-item-container">
                {rowItemsType === "category" ?
                    getCategories(rowItems as RecursiveCategoryProps[]).map((rowItem) => rowItem) :
                    getRowItems(rowItems as RowItemProps[]).map((rowItem) => rowItem)
                }
            </div>
        </div>
    );
}

export default RecursiveCategory;