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
  }, [name])

  if (!highscores) return (
    <div className="ranking">
      <h1>Classement</h1>
      <span className="loader"></span>
    </div>
  );

  highscores.sort((a, b) => {if (parseInt(a.score) < parseInt(b.score)) {return 1} else if (parseInt(a.score) > parseInt(b.score)) {return -1} else {return 0}})

  const loadMoreItems = () => {setCurrentIndex(currentIndex + itemsPerPage)};
  const goBackItems = () => {setCurrentIndex(currentIndex - itemsPerPage)}

return (
  <div className="ranking">
    <h1>Classement</h1>
    <ul>{highscores.slice(currentIndex, currentIndex + itemsPerPage).map((highscore, index) => (
        <li key={highscore._id}>{currentIndex + 1 + index} - {highscore.name} : {highscore.score} CPS</li>
      ))}
    </ul>
    <button onClick={goBackItems} className={(currentIndex === 0) ? "hidden" : "visible"}><span>{`<-`}</span></button>
    <button onClick={loadMoreItems} className={(currentIndex + itemsPerPage >= highscores.length) ? "hidden" : "visible"}><span>{`->`}</span></button>
  </div>
);
}
