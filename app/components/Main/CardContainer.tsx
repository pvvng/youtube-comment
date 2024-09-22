export default function CardContainer({n} : {n :number}){
    return(
        new Array(n).fill('temp').map((t, i) => {
            return <div className="card pt-3 pb-3" key={i} ></div>
        })
    )
}