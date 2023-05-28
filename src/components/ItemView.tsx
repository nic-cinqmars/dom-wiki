import {useParams, Navigate} from "react-router-dom";
import itemLibraryInstance, {DOMItem} from "../ItemLibrary";
import React from "react";
import {DOM} from "@fortawesome/fontawesome-svg-core";
import ItemViewHeader from "./ItemViewHeader";

function ItemView()
{
    const { '*': id } = useParams();

    if (id != null)
    {
        let idSplit = id.split("/");
        let itemName = idSplit[idSplit.length - 1];
        const item = itemLibraryInstance.getItem(itemName);
        if (item)
        {
            return (
                <>
                    <ItemViewHeader itemName={item.itemName} rarity={item.rarity} itemImage={item.image} bagImage={item.bagImage}/>
                </>
            );
        }
        else
        {
            return <Navigate to="/"/>;
        }
    }

    return <Navigate to="/"/>;
}

export default ItemView;