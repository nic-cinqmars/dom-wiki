import {Link} from "react-router-dom";
import itemLibraryInstance from "../ItemLibrary";

export interface RowItemProps
{
    itemName: string;
    imageLink: string;
    rarity : string;
    tier? : string;
}

function RowItem({itemName, imageLink, rarity, tier} : RowItemProps)
{
    const getRarityText = () =>
    {
        let rarityText = "";
        let tierText = "";
        let textColor = "";

        switch(rarity)
        {
            case "Tiered":
                rarityText = "T";
                if (tier !== undefined)
                    tierText = tier;
                textColor = "rgba(255,255,255)";
                break;
            case "Untiered":
                rarityText = "UT";
                textColor = "rgba(138, 43, 226)";
                break;
            case "Hunter Orange":
                rarityText = "HO";
                textColor = "rgba(255,110,0)";
                break;
            case "Hunter Blue":
                rarityText = "HB";
                textColor = "rgba(81,211,255)";
                break;
            case "Halloween Legendary":
                rarityText = "LG";
                textColor = "rgb(255, 107, 0)";
                break;
            case "Christmas Legendary":
                rarityText = "LG";
                textColor = "rgba(152, 184, 209)";
                break;
            case "Easter Legendary":
                rarityText = "LG";
                textColor = "rgb(255, 191, 246)";
                break;
            case "Legendary":
                rarityText = "LG";
                textColor = "rgba(255, 205, 71)";
                break;
            case "Demonic":
                rarityText = "DC";
                textColor = "rgba(158, 25, 43)";
                break;
            case "Angelic":
                rarityText = "AG";
                textColor = "rgba(80, 152, 229)";
            case "Cosmic":
                rarityText = "CS";
                textColor = "rgba(243, 56, 140)";
                break;
            default:
                rarityText = "??";
                textColor = "rgba(255, 255, 255)";
        }
        return <span className={"rarity-text"} style={{color: textColor}}>{rarityText}{tierText}</span>;
    }

    return (
        <Link to={itemLibraryInstance.getItemLink(itemName)} className="row-item">
            {itemName}
            <div className="row-image-rarity">
                <img src={imageLink} alt="ItemImage"/>
                {getRarityText()}
            </div>
        </Link>
    );
}

export default RowItem;