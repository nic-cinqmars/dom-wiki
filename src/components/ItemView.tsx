import {useParams, Navigate} from "react-router-dom";
import itemLibraryInstance, {DOMItem} from "../ItemLibrary";
import React from "react";
import {DOM} from "@fortawesome/fontawesome-svg-core";

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
            let divsText: string[]  = [];
            Object.keys(item).map((property: string) => {
                let propertyValue = item[property as keyof DOMItem];
                let extraStats: string[] = [];
                if (typeof propertyValue === "object")
                {
                    Object.keys(propertyValue).map((prop) => {
                        if (propertyValue != null) {
                            extraStats.push(prop + ":" + propertyValue[prop as keyof typeof propertyValue])
                        }
                    });
                }

                divsText.push(property + ":" + propertyValue + extraStats.toString());
            });
            return (
                divsText.map((divText) => <div>{divText}</div>)
            );
        }
        else
        {
            return <Navigate  to="/"/>;
        }
    }

    return <Navigate  to="/"/>;
}

export default ItemView;