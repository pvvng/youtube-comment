interface PropsType {
    heartList : {
        length: number;
        name: string;
    }[];
}

export default function StatsContainer(
    {heartList} : PropsType
){

    return (
        <div className="stats mt-3 mb-2 mb-md-0">
            {
                heartList.map(item => 
                    <p className="flex" key={item.name}>
                        {item.name}
                        <span>{item.length}</span>
                    </p>
                )
            }
        </div>
    )
}