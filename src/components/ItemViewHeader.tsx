interface ItemViewHeaderProps
{
    itemName : string,
    rarity: string,
    itemImage: string,
    bagImage: string
}

function ItemViewHeader({itemName, rarity, itemImage, bagImage}: ItemViewHeaderProps)
{
    return (
        <div>{rarity}</div>
    );
}

export default ItemViewHeader;