import { useEffect, useState } from 'react';

export default function Ranking({ clicks, name, highscores }) {
  let CPS = Math.round(clicks*100/15)/100;
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (highscores && name && CPS > 0) {
      const response = fetch('/api/post', {
        method: 'POST',
        body: name + "#" + CPS,
      })
    }
  }, [name]) // Whenever name changes (= when the user tries to save their score with a nickname) and the highscores are available, a POST request is sent to add the name and the score to the database

  if (!highscores) return (
    <div className="ranking">
      <h1>Classement</h1>
      <span className="loader"></span>
    </div>
  ); // if the highscores aren't fetched yet, a loader will be displayed

  highscores.sort((a, b) => {if (parseInt(a.score) < parseInt(b.score)) {return 1} else if (parseInt(a.score) > parseInt(b.score)) {return -1} else {return 0}}) // Sort the highscores from highest to lowest

  const loadMoreItems = () => {setCurrentIndex(currentIndex + itemsPerPage)};
  const goBackItems = () => {setCurrentIndex(currentIndex - itemsPerPage)} // Only 10 scores are showed per page (itemsPerPage variable), but two buttons let the user switch between the pages and see more highscores by loading more or going back

return (
  <div className="ranking">
    <h1>Classement</h1>
    <ul>{highscores.slice(currentIndex, currentIndex + itemsPerPage).map((highscore, index) => (
        <li key={highscore._id}>{currentIndex + 1 + index} - {highscore.name} : {highscore.score} CPS</li>
      ))} {/* The highscores are shown in a list using the map() function. The ranking position is also shown */}
    </ul>
    <button onClick={goBackItems} className={(currentIndex === 0) ? "hidden" : "visible"}><span>{`<-`}</span></button>
    <button onClick={loadMoreItems} className={(currentIndex + itemsPerPage >= highscores.length) ? "hidden" : "visible"}><span>{`->`}</span></button> {/* The buttons will only appear if there is another page to show*/}
  </div>
);
}
