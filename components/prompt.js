import { useState } from 'react';

export default function Prompt({ setPseudo, timerZero }) {
    let [input, setInput] = useState("");

    function handleClick() {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 _@-]+$/;
        if (input.length > 20 || input.length < 2) {
            alert("Le pseudo doit contenir entre 2 et 20 caractères")
        } else if (!regex.test(input)) {
            alert("Le pseudo contient des caractères invalides")
        } else {
        setPseudo(input);
        setInput(""); // The score will only be saved if the user chooses a valid nickname, which will be saved as pseudo and input will be empty again
        }
    }

    return (
        <div className="prompt">{timerZero ? <>
            <input value={input} onChange={(evt) => setInput(evt.target.value)} type="text"/>
            <button onClick={handleClick}><span>Sauvegarder</span></button>
            <p>Satisfait de votre score ? Entrez votre pseudo pour le sauvegarder dans le classement.</p>
            </> : null } {/* When the timer reaches zero, the prompt component is displayed to let the user save their score */}
        </div>
    )
}