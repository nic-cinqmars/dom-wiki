
import domItemsJSON from "./assets/json/domItems.json";

export interface DOMItem
{
    "itemName": string,
    "rarity": string,
    "tier"?: string,
    "image": string,
    "bagImage": string,
    "category": string,
    "description": string,
    "rateOfFire"?: number,
    "numProjectiles"?: number,
    "arcGap": number,
    "equipStats":
        {
            "hp"?: number,
            "mp"?: number,
            "spd"?: number,
            "vit"?: number,
            "wis"?: number,
            "atk"?: number,
            "dex"?: number,
            "def"?: number
        },
    "fameBonus": number,
    "itemEffect"?: string
}

let domItems: DOMItem[];
let domItemsWithNames: { [itemName: string]: DOMItem };

class ItemLibrary
{
    constructor()
    {
        domItems = [];
        domItemsWithNames = {};
        (domItemsJSON as DOMItem[]).map((item) => {
            domItems.push(item);
            domItemsWithNames[item.itemName] = item;
        });
    }

    getItemLink(itemName:string) : string
    {
        if (!domItemsWithNames[itemName])
            return "";
        else
            return "Item/" + domItemsWithNames[itemName].category + "/" + encodeURI( domItemsWithNames[itemName].itemName);
    }

    getItem(itemName:string) : DOMItem | undefined
    {
        if (domItemsWithNames[itemName])
            return domItemsWithNames[itemName];
        return undefined;
    }

    getItems() : DOMItem[]
    {
        return domItems;
    }
}

let itemLibraryInstance = Object.freeze(new ItemLibrary());

export default itemLibraryInstance;