import SideBar from "./components/SideBar";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";
import RowItem, {RowItemProps} from "./components/RowItem";
import RecursiveCategory, {RecursiveCategoryProps} from "./components/RecursiveCategory";
import {dom} from "@fortawesome/fontawesome-svg-core";
import itemLibraryInstance, {DOMItem} from "./ItemLibrary";
import ItemView from "./components/ItemView";
import HomePage from "./components/HomePage";
import ArmorView from "./components/ArmorView";

function App()
{
    const [sideBarCategories, setSideBarCategories] = useState<RecursiveCategoryProps[]>([]);

    useEffect(() => {
        treatItemData(itemLibraryInstance.getItems());
    },[]);

    function recursiveArrayTravel(currentNesting: { [category: string]: DOMItem[] } | { [category: string]: {} }, categories: string[], index = 0) : DOMItem[]
    {
        if (index === categories.length - 1)
        {
            if (!(currentNesting[categories[index]] as DOMItem[]))
                (currentNesting[categories[index]] as DOMItem[]) = [];

            return currentNesting[categories[index]] as DOMItem[];
        }
        else
        {
            if (!currentNesting.hasOwnProperty(categories[index]))
                currentNesting[categories[index]] = {};

            return recursiveArrayTravel(currentNesting[categories[index]] as { [category: string]: {} }, categories, index + 1);
        }
    }

    function sortItems(array: DOMItem[]) : { [category: string]: DOMItem[] } | { [category: string]: {} }
    {
        let newObject = { }

        array.map((item) => {
            let categories = item.category.split("/");
            recursiveArrayTravel(newObject, categories).push(item);
        });

        return newObject;
    }

    function createCategories(items: { [category: string]: DOMItem[] } | { [category: string]: {} }, category: string) : RecursiveCategoryProps[]
    {
        if (Array.isArray(items[category]))
        {
            let domItems = (items[category] as DOMItem[]);

            //Sort
            const priority : string[] = ["Tiered", "Untiered", "Hunter Blue", "Hunter Orange", "Halloween Legendary", "Christmas Legendary", "Easter Legendary", "Legendary", "Demonic", "Angelic", "Cosmic"];
            domItems.sort((a, b) => priority.indexOf(a.rarity) - priority.indexOf(b.rarity));

            let rowItems: RowItemProps[] = [];
            domItems.map((item) =>
            {
                rowItems.push({itemName: item.itemName, imageLink: item.image, rarity: item.rarity, tier: item.tier});
            });

            return [{category: category, rowItems: rowItems, rowItemsType: "item"}];
        }
        else
        {
            //console.log(category);
            //console.log(items[category]);
            let categories: RecursiveCategoryProps[] = [];
            Object.keys(items[category]).map((subCategory) => {
                let subCategories = createCategories(items[category] as { [category: string]: {} }, subCategory);
                if (subCategories.length === 1)
                    categories.push(subCategories[0]);
                else
                    categories.push({category: subCategory, rowItems: subCategories, rowItemsType: "category"});
            });
            return categories;
        }
    }

    function treatItemData(items : DOMItem[])
    {
        let unsortedItems: DOMItem[] = [];
        items.map((item : DOMItem) =>
        {
            unsortedItems.push(item);
        });

        let domItems = sortItems(unsortedItems);
        let tempCategories = { items: domItems };
        let categories = createCategories(tempCategories, "items") as RecursiveCategoryProps[];
        setSideBarCategories(categories);
    }

    return (
        <>
            <SideBar categories={sideBarCategories}/>
            <div className="main-page">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="Item/*" element={<ItemView/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;