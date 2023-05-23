import {useParams} from "react-router-dom";

function ArmorView()
{
    const { '*': id } = useParams();
    return <div>This is an armor : {id}</div>
}

export default ArmorView;