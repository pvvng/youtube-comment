import '@/app/css/loading.css';

export default function SideLoadingSpinner(){
    const arr = new Array(5).fill(0);
    return(
        <section className="loader">
            {
                arr.map((_, i) => 
                    <div 
                        key={i} 
                        style={{ '--i': 0 } as React.CSSProperties} 
                        className="slider"
                    />
                )
            }
        </section>
    )
}