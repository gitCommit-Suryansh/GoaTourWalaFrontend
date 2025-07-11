import React, { useState, useEffect } from "react";
import adventurevideo from "../assets/adventure.mp4";
import Header from "./Header";
import { Check } from "lucide-react";
import { ReactTyped } from "react-typed";
import planeImg from "../assets/plane.png";

const slideOptions = ["Wildlife", "Heritage", "Spirituality", "Nature"];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0); // 0 = "Welcome to", 1 = "Goa Tour Wala"
  const [hideIntro, setHideIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false); // page is fully loaded
    };

    if (document.readyState === "complete") {
      // Already loaded
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Slide auto-switch
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideOptions.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Intro animation control
  useEffect(() => {
    if (!loading) {
      const timers = [
        setTimeout(() => setStep(1), 1500),
        setTimeout(() => setHideIntro(true), 2800),
        setTimeout(() => setShowIntro(false), 3800),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [loading]);

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* INTRO OVERLAY */}
      {showIntro && (
        <div
          className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
            hideIntro ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Animated Plane (Always Rendered While Intro Is On) */}
          <img
            src={planeImg}
            alt="Flying Plane"
            className="absolute top-[30%] w-24 md:w-36 animate-plane z-40"
            style={{
              animationDelay: "0.2s",
              animationDuration: "6s",
            }}
          />

          {/* Intro Text */}
          <h1 className="text-4xl md:text-6xl text-black text-center fade-text z-50">
            <ReactTyped
              strings={[step === 0 ? "Welcome to" : "Goa Tour Wala"]}
              typeSpeed={55}
              showCursor={false}
              style={{ fontFamily: '"Edu NSW ACT Cursive", cursive' }}
            />
          </h1>
        </div>
      )}

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={adventurevideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Navbar */}
      <Header />

      {/* Main Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
        <div
          className="max-w-3xl mx-auto space-y-8 bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 px-6 py-10 mt-16 md:mt-0 flex flex-col items-center"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Discount Badge */}
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-2">
            Get up to 40% OFF on
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
            <span
              className=""
              style={{ color: "#FFBA0A", fontWeight: "bolder" }}
            >
              GOA
            </span>
            <span>{" "}</span>
            {/* <span className="text-white"> Tour Packages!</span> */}
            <ReactTyped
              strings={["Tour Packages..", "Cruise Packages..", "is Callin...!"]}
              typeSpeed={65}
              backSpeed={50}
              loop={true}
              delay={500}
              cursorChar="_"
              cursorBlink={true}
              onComplete={() => console.log("Typing complete!")}
              pauseOnHover={true}
              style={{ color: 'white' }}
            />
          </h1>

          {/* Pricing Section */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-white text-lg md:text-xl">Starting at</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-bold text-white">
                INR 5,299
              </span>
              <span className="text-lg md:text-xl text-gray-300 line-through">
                INR 10,598
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-6">
            <button
              className="bg-[#F37002] text-white font-bold px-7 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300/40 text-lg tracking-wide"
              style={{ backgroundColor: "#F37002" }}
            >
              Connect With An Expert
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-400" />
              <span className="text-lg text-white/90 font-medium">
                Only Trusted & Verified Agents
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-400" />
              <span className="text-lg text-white/90 font-medium">
                24/7 Online Support
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-400" />
              <span className="text-lg text-white/90 font-medium">
                100% Trusted Tour Agency
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Buttons (bottom left) */}
      <div className="absolute bottom-0 left-0 w-full z-20 flex justify-center md:justify-start space-x-4 bg-black bg-opacity-30 px-8 py-4">
        {slideOptions.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`px-4 py-2 uppercase text-sm tracking-wider ${
              idx === activeSlide ? "bg-white text-black" : "text-white"
            }`}
          >
            {slide}
          </button>
        ))}
      </div>

      {/* FADE TEXT ANIMATION CSS */}
      <style>{`
  .fade-text {
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

@keyframes flyAcross {
  0% {
    transform: translate(100vw, 60vh) rotate(-120deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(-100vw, -60vh) rotate(-120deg);
    opacity: 0;
  }
}



.animate-plane {
  animation: flyAcross 6s ease-in-out forwards;
}

`}</style>
    </section>
  );
};

export default Home;
