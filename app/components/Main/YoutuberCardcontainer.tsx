export default function YoutuberCardContainer({n} : {n :number}){
    return(
        new Array(n).fill('temp').map((t, i) => {
            return <div className="card pt-3 pb-3" key={i} ></div>
        })
    )
}