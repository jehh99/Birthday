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
  const [shareStatus, setShareStatus] = useState("");

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

  const shareText = "Meri taraf se ek chhoti si maafi website 💖 Please dekhna.";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    if (!shareUrl) {
      setShareStatus("Link unavailable right now.");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("Link copy ho gaya ✅ Ab direct share kar do.");
    } catch {
      setShareStatus("Auto copy nahi hua, browser se URL manually copy kar lo.");
    }
  };

  const shareOnWhatsApp = () => {
    if (!shareUrl) {
      setShareStatus("Link unavailable right now.");
      return;
    }

    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
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

        <div className="share-box">
          <h3>GF ko kaise share karna hai?</h3>
          <p className="share-help">
            1) Site deploy karo (Vercel/Netlify) <br />
            2) Niche se link copy ya WhatsApp se direct bhejo.
          </p>
          <div className="share-actions">
            <button className="btn share" onClick={copyLink}>
              Link Copy
            </button>
            <button className="btn share" onClick={shareOnWhatsApp}>
              WhatsApp Share
            </button>
          </div>
          {shareStatus && <p className="share-status">{shareStatus}</p>}
        </div>
      </section>

      {accepted && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="popup">
            <h3>Thank you meri pyaari 💖</h3>
            <p>
              I love you so much. Tum mere liye duniya ho. Aaj se zyada care, zyada respect, aur
              sirf tumhari smile.
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
