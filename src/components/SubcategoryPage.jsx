import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Camera,
  Check,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import Header from "./Header";

const SubcategoryPage = () => {
  const { subSlug } = useParams();
  const [data, setData] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/subcategories/get-by-slug/${subSlug}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading subcategory:", err));
  }, [subSlug]);

  useEffect(() => {
    if (data && activeImageIndex >= data.galleryImages.length) {
      setActiveImageIndex(0);
    }
  }, [data, activeImageIndex]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg mx-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Crafting Your Next Journey
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Hold tight, incredible experiences are just a moment away...
          </p>
        </div>
      </div>
    );
  }

  const totalPrice = (adults + children) * data.price;

  const handleBooking = () => {
    if (adults === 0 && children === 0) {
      alert("Please select at least one person to book.");
      return;
    }
    console.log("Booking Details:", {
      adults,
      children,
      selectedDate,
      totalPrice,
      subCategory: data.name,
    });
    alert(
      `Booking for ${adults} Adults and ${children} Children on ${selectedDate} for a total of ₹${totalPrice.toFixed(
        2
      )} has been logged!`
    );
  };

  const nextImage = () => {
    setActiveImageIndex((prevIndex) =>
      Math.min(data.galleryImages.length - 1, prevIndex + 1)
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImageInModal = () => {
    setModalImageIndex(
      (prevIndex) => (prevIndex + 1) % data.galleryImages.length
    );
  };

  const prevImageInModal = () => {
    setModalImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.galleryImages.length) % data.galleryImages.length
    );
  };

  const shareLink = () => {
    const shareData = {
      title: data.name,
      text: `Check out this amazing experience: ${data.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(`Share this link: ${window.location.href}`);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <div className="relative h-[60vh] md:h-[75vh] overflow-hidden group" style={{padding: '2px', '@media (min-width: 640px)': {padding: '4px'}}}>
          <img
            src={data.bannerImage || data.galleryImages[activeImageIndex]}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            <div className="relative">
              <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex-1">
                  <h1
                    className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 capitalize drop-shadow-lg"
                    style={{
                      fontFamily: '"Play","Edu NSW ACT Cursive", cursive',
                    }}
                  >
                    {data.name}
                  </h1>
                  <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed drop-shadow-md">
                    {data.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {data.duration} hours
                    </span>
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-300 fill-current" />
                      4.8 (234 reviews)
                    </span>
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      Adventure Location
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center md:justify-end mt-4">
                  <button
                    className="p-2 md:p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all duration-200 shadow-xl"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    className="p-2 md:p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all duration-200 shadow-xl"
                    aria-label="Share this experience"
                    onClick={shareLink}
                  >
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {data.galleryImages && data.galleryImages.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <Camera className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
                  <h2 className="text-xl md:text-3xl font-extrabold text-gray-900">
                    More Moments
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {data.galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openModal(index)}
                      className={`relative w-full h-32 md:h-40 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300 group ${
                        index === activeImageIndex
                          ? "ring-2 md:ring-3 ring-blue-500"
                          : "ring-1 ring-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm md:text-base">
                          View
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {data.features && data.features.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                  What's Included
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                    >
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-medium text-gray-800 capitalize leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                Experience Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {data.details.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 capitalize flex items-center gap-2">
                      <Check className="w-4 h-4 md:w-5 md:h-5 bg-green-500 text-white flex-shrink-0 mt-0.5 rounded-md" />
                      {detail.title}
                    </h3>
                    {Array.isArray(detail.content) ? (
                      <ul className="space-y-2 md:space-y-3 list-none pl-0">
                        {detail.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {detail.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 lg:sticky lg:top-0 lg:h-screen mb-5" style={{scale: window.innerWidth > 768 ? 0.80 : 1}}>
            <div className="lg:sticky lg:top-10 bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-xl space-y-4 md:space-y-5">
              <div className="text-center pb-4 md:pb-5 border-b border-gray-100">
                <p className="text-sm md:text-base font-semibold text-gray-600 mb-1">
                  Starting from
                </p>
                <div className="text-2xl md:text-4xl font-extrabold text-blue-700">
                  ₹{data.price}
                  <span className="text-lg md:text-xl text-gray-500 font-normal">
                    {" "}/ person
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Unlock unforgettable experiences!
                </p>
              </div>
              <div className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-date"
                    className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800"
                  >
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Choose Your Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base text-gray-800 focus:border-blue-600 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800">
                    <Users className="w-4 h-4 text-blue-600" />
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-between p-3 md:p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-bold text-gray-800 text-sm md:text-base">
                        Adults
                      </div>
                      <div className="text-xs text-gray-600">Age 18+</div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Decrease adult count"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="text-lg md:text-xl font-extrabold text-gray-900 w-6 md:w-8 text-center">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Increase adult count"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 md:p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-bold text-gray-800 text-sm md:text-base">
                        Children
                      </div>
                      <div className="text-xs text-gray-600">Age 4-8</div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Decrease child count"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="text-lg md:text-xl font-extrabold text-gray-900 w-6 md:w-8 text-center">
                        {children}
                      </span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Increase child count"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-5 bg-blue-50 rounded-lg border border-blue-200 mt-4 md:mt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-blue-800">
                      Total Amount:
                    </span>
                    <span className="text-xl md:text-3xl font-extrabold text-blue-900">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white font-extrabold py-3 md:py-4 px-4 md:px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  Reserve Your Adventure Now
                </button>
                <div className="space-y-2 pt-4 md:pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Instant confirmation on booking</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Best price guarantee for your peace of mind</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
            <div className="relative bg-white rounded-lg p-2 max-w-full max-h-full overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white rounded-full text-zinc-700 hover:text-gray-800 p-1 md:p-0.5 text-base md:text-lg z-10"
              >
                ✖
              </button>
              <img
                src={data.galleryImages[modalImageIndex]}
                alt={`Gallery ${modalImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] rounded-lg object-contain"
              />
              <div className="flex justify-between mt-3">
                <button
                  onClick={prevImageInModal}
                  className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                  disabled={modalImageIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextImageInModal}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                  disabled={modalImageIndex === data.galleryImages.length - 1}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubcategoryPage;