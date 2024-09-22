import CardContainer from "./CardContainer";

export default function ListContainer(
    {type} : {type : string}
){
    return (
        <div className="bg-secondary p-2" style={{minHeight : '200px'}}>
            <h4>{type}</h4>
            <CardContainer n={5} />
        </div>
    )
}