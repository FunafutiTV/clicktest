import { useEffect, useState } from 'react';

export default function DisplayCPS({ clicks, setRefresh }) {
    let [CPS, setCPS] = useState(null)

    useEffect(() => {
        clicks ? setCPS(<p>Vous cliquez à une vitesse de <strong>{Math.round(clicks*100/15)/100} CPS.</strong></p>) : setCPS(null)
    }, [clicks]) // If clicks isn't equal to 0, CPS will be set to a string which includes the calculation of the user's clicks per second (CPS)

    function handleRefreshClick() {
        setRefresh(true);
    } // Click on the refresh button sets refresh to true which will restart the game

    return (
        <section>
            <div>{CPS}</div>
            <div>{CPS ? <button onClick={handleRefreshClick}><span>Recommencer</span></button> : null}</div>
        </section>
    )
}