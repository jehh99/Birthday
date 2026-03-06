import { useEffect, useMemo, useState } from "react";
import "./App.css";

const noLines = [
  "Nahi 😒",
  "Soch lo na 🥺",
  "Please gussa mat ho 😭",
  "Ek chance aur 💖",
  "Pakka sudhar jaunga 🙏",
  "Are you sure? 😢",
];

const moodCards = [
  { emoji: "🐼", title: "Sorry meri jaan", subtitle: "Main genuinely sorry hoon." },
  { emoji: "🐱", title: "Dil se maafi", subtitle: "Tumhare bina sab adhoora lagta hai." },
  { emoji: "🧸", title: "Bas ek hug chahiye", subtitle: "Aur tumhari ek smile." },
  { emoji: "✨", title: "Promise", subtitle: "Aaj ke baad aur achha boyfriend banunga." },
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [accepted, setAccepted] = useState(false);

  const noText = useMemo(() => noLines[Math.min(noCount, noLines.length - 1)], [noCount]);
  const mood = useMemo(() => moodCards[Math.min(noCount, moodCards.length - 1)], [noCount]);

  useEffect(() => {
    setYesScale(1 + Math.min(noCount * 0.15, 0.9));
  }, [noCount]);

  const moveNoButton = () => {
    const x = Math.floor(Math.random() * 240) - 120;
    const y = Math.floor(Math.random() * 140) - 70;
    setNoStyle({ transform: `translate(${x}px, ${y}px)` });
    setNoCount((prev) => prev + 1);
  };

  return (
    <main className="sorry-page">
      <section className="card">
        <div className="emoji" aria-hidden="true">
          {mood.emoji}
        </div>
        <h1>{mood.title}</h1>
        <p>{mood.subtitle}</p>

        <h2>Sorry Please forgive me 💌</h2>

        <div className="actions">
          <button
            className="btn yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={() => setAccepted(true)}
          >
            Haan, maaf kiya 💚
          </button>
          <button className="btn no" style={noStyle} onMouseEnter={moveNoButton} onClick={moveNoButton}>
            {noText}
          </button>
        </div>
      </section>

      {accepted && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="popup">
            <h3>Thank you meri pyaari 💖</h3>
            <p>
              I love you so much. Tum mere liye duniya ho. Aaj se zyada care,
              zyada respect, aur sirf tumhari smile.
            </p>
            <button className="btn yes" onClick={() => setAccepted(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
