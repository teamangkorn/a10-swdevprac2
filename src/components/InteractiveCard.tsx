'use client';

export default function InteractiveCard({children, contentName} : {children: React.ReactNode, contentName: string}) {

    function onCardSelect() {   
        // alert("You selected " + contentName);
    }
    function onCardMouseAction(event: React.SyntheticEvent) {
        if(event.type === "mouseover") {
            event.currentTarget.classList.remove('shadow-lg','rounded-lg', 'bg-white');
            //remove class shadow-lg rounded-lg bg-white
            event.currentTarget.classList.add('shadow-2xl', 'rounded-lg', 'bg-neutral-200');
        } else{
            event.currentTarget.classList.remove('shadow-2xl', 'rounded-lg', 'bg-neutral-200');
            event.currentTarget.classList.add('shadow-lg','rounded-lg', 'bg-white');
        }
    }

    return(
        // <div className={styles.card}>
        <div className="w-full h-[300px] rounded-lg shadow-lg bg-white"
            onMouseOver={ (e) => onCardMouseAction(e) } 
            onMouseOut={ (e) => onCardMouseAction(e) }>
            { children }
        </div>

    );
}