import { useState, useEffect, useRef } from "react";
import music from './music.mp3'
import video from '../public/Img 4596.mp4'

//unused imports
import vid from '../public/1.mov';
import vid_1 from '../public/16.mov';
import pic_5 from '../public/5.jpg';
import pic_6 from '../public/6.jpg';
import pic_7 from '../public/7.jpg';
import pic_11 from '../public/11.jpg';
import pic_13 from '../public/12.jpg';
import pic_15 from '../public/14.jpg';
import pic_16 from '../public/15.jpg';
import pic_18 from '../public/17.jpg';
import pic_19 from '../public/18.jpg';
import pic_24 from '../public/23.jpg';
import vc from '../public/vc.png';
import vc_1 from '../public/vc_1.png';


import pic_2 from '../public/2.jpg';
import pic_3 from '../public/3.jpg';
import pic_4 from '../public/4.jpg';
import pic_8 from '../public/8.jpg';
import pic_9 from '../public/9.jpg';
import pic_14 from '../public/13.jpg';
import pic_21 from '../public/19.jpg';
import pic_22 from '../public/21.jpg';
import pic_23 from '../public/22.jpg';




export default function LoveApp() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [musicOn, setMusicOn] = useState(true);
  const [slide, setSlide] = useState(0);
  const [showLove, setShowLove] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noPos, setNoPos] = useState({ x: 90, y: 0 });
  const [clicked, setClicked] = useState(false);

  const [showNice, setShowNice] = useState(false);
  const [burst, setBurst] = useState(false);
  const [started, setStarted] = useState(false);


  const audioRef = useRef(null);

  const photos = [
    pic_2,
    pic_3,
    pic_4,
    pic_8,
    pic_9,
    pic_14,
    pic_21,
    pic_22,
    pic_23,
  ];

  const memories = [vc, vc_1]
  const questions = [
    "Will you always keep smiling for me? 😊",
    "Will you be my Valentine? ❤️",
    "Will you stay with me for a long long time? 💖"
  ];

  const moveNoButton = () => {
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 120 - 60;
    setNoPos({ x, y });
    setClicked(true)
  };
  const handleYes = () => {
    setShowNice(true);

    setTimeout(() => {
      setShowNice(false);
    }, 800);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((q) => q + 1);
    } else {
      setBurst(true);
      setTimeout(() => setStep(4), 700);
    }
  };

  const startExperience = () => {
    setStarted(true);

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;

      audio.play().catch(() => { });

      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        audio.volume = Math.min(v, 0.6);
        if (v >= 0.6) clearInterval(fade);
      }, 120);
    }
  };


  const finalMessage =
    "Happy Birthday Sanu ❤️\n\nThese 4 months with you, Sania, have been some of the happiest moments of my life. Even though we are miles apart, you make me feel understood, calm, and genuinely happy in a way I never expected.\n\nThank you for being you — caring, funny, stubborn sometimes, but always amazing.\n\nHappy Valentine’s Day, Sanu. I’m really glad I found you.";

  // autoplay music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => { });
    }
  }, []);
  const [memorySlide, setMemorySlide] = useState(0);


  useEffect(() => {
    if (!audioRef.current) return;
    musicOn ? audioRef.current.play().catch(() => { }) : audioRef.current.pause();
  }, [musicOn]);

  // slideshow
  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setSlide((s) => (s + 1) % photos.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // typing + final reveal
  useEffect(() => {
    if (step === 5) {
      setTypedText("");
      setShowLove(false);

      let i = 0;
      const interval = setInterval(() => {
        setTypedText(finalMessage.slice(0, i));
        i++;
        if (i > finalMessage.length) {
          clearInterval(interval);
          setTimeout(() => setShowLove(true), 800);
        }
      }, 28);

      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setMemorySlide((s) => (s + 1) % memories.length);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [step]);



  useEffect(() => {
    if (step === 3) {
      setNoPos({ x: 0, y: 0 });
    }
  }, [step]);


  const heartsRef = useRef(
    Array.from({ length: 35 }).map(() => {
      const size = Math.random() * 20 + 10;

      return {
        left: Math.random() * 100,
        size,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 6,
        drift: Math.random() * 20 - 10,
        rotate: Math.random() * 40 - 20,
        emoji: ["❤️", "💖", "💕", "💗"][Math.floor(Math.random() * 4)],
        opacity: size > 20 ? 0.9 : 0.6
      };
    })
  );


  const sparklesRef = useRef(
    Array.from({ length: 25 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  );



  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 w-[100vw]">

      {/* floating hearts */}
      {heartsRef.current.map((heart, i) => (
        <span
          key={i}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotate}deg)`
          }}
        >
          {heart.emoji}
        </span>
      ))}



      {/* sparkles */}
      {sparklesRef.current.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle text-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: "8px",
          }}
        >
          ✦
        </span>
      ))}


      <audio ref={audioRef} loop preload="auto">
        <source src={music} type="audio/mpeg" />
      </audio>
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 bg-white/70 backdrop-blur px-3 py-2 rounded-full shadow"
      >
        {musicOn ? "🔊" : "🔈"}
      </button>
      {!started && (
        <div
          onClick={startExperience}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-rose-300 to-red-300 text-center cursor-pointer"
        >
          <div className="text-4xl mb-4 animate-pop">❤️</div>

          <h1 className="text-2xl font-semibold">
            Tap anywhere to begin
          </h1>

          <p className="mt-3 text-sm opacity-70">
            I made something for you
          </p>
        </div>
      )}
      {started && <div className="backdrop-blur-lg bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 rounded-3xl shadow-xl p-6 w-[90%] max-w-sm text-center border border-white/40">

        {step === 0 && (
          <>
            <h1 className="text-3xl font-bold mb-4">Hey Sanu ❤️</h1>
            <p className="mb-6">
              I wish I could be there with you today,
              but until I can, this is my little way of celebrating you.
            </p>
            <button
              onClick={() => setStep(1)}
              className="text-white px-6 py-3 rounded-xl w-full bg-pink-500"
            >
              Open
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              The Smile I Fell For
            </h2>

            <img
              key={slide}
              src={photos[slide]}
              className="rounded-xl max-h-64 w-full object-contain mb-6 animate-fade bg-black/10"
            />
            <button
              onClick={() => setStep(2)}
              className="bg-red-500 text-white px-6 py-3 rounded-xl w-full"
            >
              One More Thing
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-pink-600">
              Our Lovely Memories 💞
            </h2>

            {/* MEMORY IMAGE */}
            <div className="mb-4">
              <img
                key={memorySlide}
                src={memories[memorySlide]}
                className="rounded-xl w-full max-h-60 object-contain shadow animate-fade bg-black/10"
              />
              <p>These moments may be small, but they mean everything to me.</p>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mb-4">
              {memories.map((_, i) => (
                <>
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === memorySlide ? "bg-pink-500" : "bg-gray-300"
                      }`}
                  />
                </>
              ))}
            </div>

            <p className="mb-6 text-gray-600">
              Our first magical moment together ❤️
            </p>

            <button
              onClick={() => setStep(3)}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl w-full"
            >
              One More Surprise ✨
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center relative">
            <h2 className="text-xl font-semibold mb-6">
              {questions[questionIndex]}
            </h2>

            {/* YES FEEDBACK */}
            {showNice && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-pink-600 animate-pop">
                Good choice 😌
              </div>
            )}

            {/* HEART BURST */}
            {burst && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="text-5xl animate-burst">💖💖💖</div>
              </div>
            )}

            <div className="h-40 w-full flex items-center justify-center gap-8">
              {/* YES BUTTON (grows each question) */}
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${1 + questionIndex * 0.12})`,
                  transition: "transform 0.2s ease"
                }}
                className="bg-pink-500 text-white px-6 py-3 rounded-xl"
              >
                Yes ❤️
              </button>

              {/* NO BUTTON (shrinks each question) */}
              <button
                onMouseEnter={moveNoButton}
                style={{
                  left: `calc(70% + ${noPos.x}px)`,
                  top: `calc(50% + ${noPos.y}px)`,
                  transform: `scale(${1 - questionIndex * 0.15})`,
                  transition: "all 0.25s ease"
                }}
                className={`bg-gray-300 px-6 py-3 rounded-xl ${clicked ? "absolute" : ""
                  }`}
              >
                No
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <>
            <div>
              <p>My favourite moments of you</p>
              <div className="flex flex-col gap-4">
                <video controls={true} src={vid} />
                <video controls={true} src={vid_1} />
              </div>
            </div>
            <button
              onClick={() => setStep(5)}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl w-full"
            >Thodi or Mehnat</button>
          </>
        )

        }


        {step === 5 && (
          <>
            <h1 className="text-3xl font-bold mb-2">
              Happy Birthday 🎂
            </h1>

            <h2 className="mb-4 text-lg">
              Happy Valentine’s Day ❤️
            </h2>

            <p className="whitespace-pre-line min-h-[120px]">
              {typedText}
            </p>

            {showLove && (
              <div className="mt-6 animate-pop">
                <div className="text-4xl font-bold text-pink-600">
                  I Love You Sanu ❤️
                </div>
                <div className="text-5xl mt-3">💖💖💖</div>
              </div>
            )}

            <p className="mt-6 font-semibold">— Aamir</p>

            <button
              onClick={() => setStep(6)}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl w-full"
            >Message for you</button>
          </>
        )}

        {step === 6 && (
          <div>
            <video controls="true" src={video} />
          </div>
        )}
      </div>}
      {/* glass card */}



      <style>
        {`
        @keyframes float {
  0% {
    transform: translateY(110vh) translateX(0px) rotate(0deg);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  50% {
    transform: translateY(40vh) translateX(12px) rotate(8deg);
  }

  100% {
    transform: translateY(-100vh) translateX(-12px) rotate(-8deg);
    opacity: 0;
  }
}



        @keyframes twinkle {
          0%,100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        @keyframes pop {
          0% { transform: scale(.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-float { animation: float linear infinite; }
        .animate-twinkle { animation: twinkle 2s infinite; }
        .animate-pop { animation: pop .6s ease-out; }

        @keyframes fade {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade {
  animation: fade 700ms ease-out;
}

@keyframes burst {
  0% { transform: scale(.5); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

.animate-burst {
  animation: burst .7s ease-out;
}

        `}
      </style>
    </div>
  );
}
