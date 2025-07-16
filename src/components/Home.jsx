import React, { useState, useEffect } from "react";
import adventurevideo from "../assets/adventure.mp4";
import Header from "./Header";
import Footer from "./Footer"; // 👈 Add this import


import {
  Check,
  Clock,
  Star,
  Users,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";
import { ReactTyped } from "react-typed";
import planeImg from "../assets/plane.png";
import { Link } from "react-router-dom";

const slideOptions = ["Wildlife", "Heritage", "Spirituality", "Nature"];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);
  const [hideIntro, setHideIntro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [subcategoryStats, setSubcategoryStats] = useState({});
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState([]);
  const [categoryActiveSlide, setCategoryActiveSlide] = useState(0);

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") handleLoad();
    else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${REACT_APP_BACKEND_URL}/api/categories/all-with-subcategories`
        );
        const data = await res.json();
        const flatSubcategories = [];
        const stats = {};
        const validCategories = [];

        data.forEach((category) => {
          // Only include categories that have subcategories
          if (category.subcategories && category.subcategories.length > 0) {
            validCategories.push(category);

            category.subcategories.forEach((sub) => {
              flatSubcategories.push({ ...sub, categorySlug: category.slug });
              const discount = (Math.floor(Math.random() * 8) + 8) * 100;
              stats[sub._id] = {
                rating: (Math.random() * (4.8 - 4.1) + 4.1).toFixed(1),
                reviews: Math.floor(Math.random() * (2400 - 1100 + 1) + 1100),
                discount,
              };
            });
          }
        });

        setSubcategories(flatSubcategories);
        setSubcategoryStats(stats);
        setCategoriesWithSubcategories(validCategories);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []);

  // Add auto-carousel for categories
  useEffect(() => {
    if (categoriesWithSubcategories.length > 0) {
      const timer = setInterval(() => {
        setCategoryActiveSlide(
          (prev) => (prev + 1) % categoriesWithSubcategories.length
        );
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [categoriesWithSubcategories]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideOptions.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

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

  const displayedCategories = showAllCategories
    ? subcategories
    : subcategories.slice(0, 6);

  return (
    <div className="relative">
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
              <span> </span>
              <ReactTyped
                strings={[
                  "Tour Packages..",
                  "Cruise Packages..",
                  "is Callin...!",
                ]}
                typeSpeed={65}
                backSpeed={50}
                loop={true}
                delay={500}
                cursorChar="_"
                cursorBlink={true}
                onComplete={() => console.log("Typing complete!")}
                pauseOnHover={true}
                style={{ color: "white" }}
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
      </section>

      {/* SUBCATEGORIES SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className="text-center mb-16"
            style={{
              fontFamily: '"Play","Edu NSW ACT Cursive", cursive',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3"
                style={{ color: "#FFBA0A" }}
              >
                Destinations
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked collection of extraordinary travel
              experiences that will create memories to last a lifetime
            </p>
          </div>
          {/* Loading State */}
          {loadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-64 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCategories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/${category.categorySlug}/${category.slug}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                    style={{ scale: 0.9 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          category.image ||
                          category.bannerImage ||
                          "/api/placeholder/400/300"
                        }
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-sm text-gray-600 mb-2">
                        {category.duration || "6 days & 5 nights"}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                        {category.name}
                      </h3>
                      <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {category.route || "Srinagar • Pahalgam • Srinagar"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">
                            {subcategoryStats[category._id]?.rating || "4.5"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({subcategoryStats[category._id]?.reviews || "1200"}{" "}
                          reviews)
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg text-gray-400 line-through">
                            INR{" "}
                            {category.price +
                              (subcategoryStats[category._id]?.discount ||
                                1000)}
                          </span>
                          <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                            SAVE INR{" "}
                            {subcategoryStats[category._id]?.discount || 1000}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            INR {category.price}
                          </span>
                          <span className="text-sm text-gray-600">/Adult</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href="tel:+1234567890"
                          className="flex-1 bg-white border border-orange-500 text-orange-500 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          className="flex-1 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                          style={{ backgroundColor: "#F37002" }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/*Explore by category section*/}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className="text-center mb-16"
            style={{
              fontFamily: '"Play","Edu NSW ACT Cursive", cursive',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore by
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3"
                style={{ color: "#FFBA0A" }}
              >
                Categories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover different types of experiences tailored to your interests
            </p>
          </div>

          {/* Categories Carousel */}
          {categoriesWithSubcategories.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${categoryActiveSlide * 100}%)`,
                  }}
                >
                  {/* Render only categories that have subcategories */}
                  {categoriesWithSubcategories.map((category, index) => {
                    const displaySubcategories = category.subcategories.slice(
                      0,
                      2
                    );

                    return (
                      <div
                        key={category._id}
                        className="w-full flex-shrink-0 px-4"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Explore{" "}
                            <span style={{ color: "#FFBA0A" }}>
                              {category.name}
                            </span>{" "}
                            in Goa
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                          {displaySubcategories.map((subcat) => (
                            <Link
                              key={subcat._id}
                              state={{ categoryId: category._id }}
                              to={`/explore/${category.slug}`}
                              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 mb-4"
                            >
                              <div className="relative h-56 overflow-hidden">
                                <img
                                  src={
                                    subcat.bannerImage &&
                                    subcat.bannerImage.startsWith("http")
                                      ? subcat.bannerImage
                                      : "https://via.placeholder.com/400x300?text=No+Image"
                                  }
                                  alt={subcat.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/400x300?text=No+Image";
                                  }}
                                  loading="lazy"
                                />

                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
                                <div
                                  className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-2 z-20"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(5px)",
                                    WebkitBackdropFilter: "blur(5px)",
                                    border: "1px solid #F37002",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                                  }}
                                >
                                  <h4 className=" text-white text-xl font-bold text-center text-[#F37002]">
                                    {subcat.name}
                                  </h4>
                                </div>
                              </div>
                              <div
                                className="p-6"
                                style={{ borderBottom: "3px solid #F37002" }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                      {subcat.duration || "Full Day"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium text-gray-700">
                                      {subcategoryStats[subcat._id]?.rating ||
                                        "4.5"}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-2xl font-bold text-gray-900">
                                      INR {subcat.price}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      /Person
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-orange-500 font-medium">
                                    <span>Explore</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="text-center mb-8">
                          <h3 className="text-xs md:text-xs font-bold text-gray-800 mb-4 flex flex-row justify-center items-center">
                            <Link
                              to={`/explore/${category.slug}`}
                              state={{ categoryId: category._id }}
                              style={{ color: "grey" }}
                            >
                              View more
                            </Link>
                            <ArrowRight className="w-4 h-4 text-gray-600 rotate-180" />
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {categoriesWithSubcategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCategoryActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === categoryActiveSlide
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Carousel Arrow Navigation */}
              <button
                onClick={() =>
                  setCategoryActiveSlide((prev) =>
                    prev === 0
                      ? categoriesWithSubcategories.length - 1
                      : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600 rotate-180" />
              </button>

              <button
                onClick={() =>
                  setCategoryActiveSlide((prev) =>
                    prev === categoriesWithSubcategories.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ArrowRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />


      {/* EXISTING STYLES */}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
