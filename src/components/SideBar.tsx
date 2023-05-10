import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRef, useState} from "react";
import {Link} from "react-router-dom";

interface RowItemProps
{
    itemName: string;
    imageLink: string;
}

function RowItem({itemName, imageLink} : RowItemProps)
{
    return (
        <div className="row-item">
            <Link to={'/item/' + {itemName}}>
                click
            </Link>
            {itemName}
            <img src={imageLink} alt="ItemImage"/>
        </div>
    );
}

interface CategoryProps
{
    category: string;
    rowItems: RowItemProps[];
}

function Category({category, rowItems} : CategoryProps)
{
    const [open, setOpen] = useState(false);
    const rowsContainerRef = useRef<HTMLDivElement>(null);

    function handleClick()
    {
        setOpen(!open);
        if (rowsContainerRef.current != null)
        {
            if (rowsContainerRef.current.style.maxHeight)
                rowsContainerRef.current.style.maxHeight = "";
            else
                rowsContainerRef.current.style.maxHeight = rowsContainerRef.current.scrollHeight + "px";
        }
    }

    return (
        <div className="side-bar-category">
            <button onClick={handleClick} className="side-bar-category-header">
                <FontAwesomeIcon icon="caret-right" className={open ? "category-caret down" : "category-caret"}/>
                {category}
            </button>
            <div ref={rowsContainerRef} className="row-item-container">
                {rowItems.map(rowItemProps => <RowItem itemName={rowItemProps.itemName} imageLink={rowItemProps.imageLink}/>)}
            </div>
        </div>
    );
}

function Header()
{
    return (
            <button className="side-bar-header">
                <img className="dom-logo" src="/domLogo2.png" alt="DOM"/>
                Domain of Magica
            </button>
    );
}

const staffRow = [ {itemName: "AAA", imageLink: "/test.png"},
    {itemName: "BBB", imageLink: "/test.png"},
    {itemName: "CCC", imageLink: "/test.png"} ]

function SideBar()
{
    return (
        <div className="side-bar-container">
            <Header/>
            <div className="side-bar-category-container">
                <Category category="Staff" rowItems={staffRow}/>
                <Category category="Sword" rowItems={staffRow}/>
                <Category category="Dagger" rowItems={staffRow}/>
                <Category category="Cloak" rowItems={staffRow}/>
            </div>
        </div>
    );
}

export default SideBar;