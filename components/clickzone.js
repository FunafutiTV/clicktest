import { useState, useEffect } from 'react';

export default function ClickZone({ timerZero, setFirstClick, setNbClicks }) {
    let [clicks, setClicks] = useState(0)

    function zoneClicked() {
        setFirstClick(true);
        if (!timerZero) {
            setClicks(clicks + 1);
        } // Whenever the user clicks on the zone, firstClick is set to true which will start the timer if it hasn't yet, and if there's still time left it will increase the number of clicks by one
    }

    useEffect(() => {
        if (timerZero) { 
            setNbClicks(clicks)
        } else {
            setNbClicks(null);
            setClicks(0);
        } // When the timer reaches zero, the number of clicks is stored in nbClicks. Later when timerZero is set back to false, the number of clicks goes back to 0 and the previous score scored in nbClicks is deleted
    }, [timerZero])

    return (
        <>
            <p className={clicks ? "rules-out" : "rules"}>Vous avez 15 secondes pour cliquer le plus de fois possibles dans la zone ci-dessous. Le timer se lance dès votre premier clic.</p>
            <div className={timerZero ? "click-zone-blocked" : "click-zone"} onClick={zoneClicked}>{`${clicks} clic${clicks > 1 ? "s" : ""}`}</div> {/* The number of clicks is displayed in real time*/}
        </>
    )
}