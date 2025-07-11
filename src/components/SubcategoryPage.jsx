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
  const [adults, setAdults] = useState(1); // Start with 1 adult by default
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalImageIndex, setModalImageIndex] = useState(0); // State to track the current image index in the modal
  const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL


  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/subcategories/get-by-slug/${subSlug}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading subcategory:", err));
  }, [subSlug]);

  useEffect(() => {
    // Ensure activeImageIndex resets or is valid if data changes (e.g., different subSlug)
    if (data && activeImageIndex >= data.galleryImages.length) {
      setActiveImageIndex(0);
    }
  }, [data, activeImageIndex]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Crafting Your Next Journey
          </h2>
          <p className="text-lg text-gray-600">
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
    // In a real application, you'd send this to a backend API
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
    setModalImageIndex((prevIndex) => (prevIndex + 1) % data.galleryImages.length);
  };

  const prevImageInModal = () => { 
    setModalImageIndex((prevIndex) => (prevIndex - 1 + data.galleryImages.length) % data.galleryImages.length);
  };

  const shareLink = () => {
    const shareData = {
      title: data.name,
      text: `Check out this amazing experience: ${data.description}`,
      url: window.location.href, 
    };

    if (navigator.share) { 
      navigator.share(shareData)
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(`Share this link: ${window.location.href}`);
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Dynamic Hero Section with Gallery Integration */}
      <div className="relative h-[85vh] overflow-hidden group">
        <img
          src={data.bannerImage || data.galleryImages[activeImageIndex] }
            alt={data.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Navigation Arrows for Hero Image */}
        {data.galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeImageIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeImageIndex === data.galleryImages.length - 1}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Hero Content Overlay */}
        <div className="relative bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-extrabold  leading-tight mb-4 capitalize drop-shadow-lg " style={{ fontFamily: '"Play","Edu NSW ACT Cursive", cursive' }}>
                {data.name}
              </h1>
              <p className="text-xl text-gray-700 mb-6 max-w-4xl drop-shadow-md">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full  font-semibold">
                  <Clock className="w-5 h-5" />
                  {data.duration} hours
                </span>
                <span className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                  <Star className="w-5 h-5 text-amber-300 fill-current" />
                  4.8 (234 reviews)
                </span>
                <span className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                  <MapPin className="w-5 h-5" />
                  Adventure Location
                </span>
              </div>
            </div>
            <div className="flex gap-4 self-center md:self-end">
              <button
                className="p-4 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all duration-200 shadow-xl"
                aria-label="Add to wishlist"
              >
                <Heart className="w-6 h-6" />
              </button>
              <button
                className="p-4 bg-white/30 backdrop-blur-md rounded-full  hover:bg-white/50 transition-all duration-200 shadow-xl"
                aria-label="Share this experience"
                onClick={shareLink} // Call the share function
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Content Column (Details, Gallery) */}
        <div className="lg:col-span-2 space-y-16">
           {/* Photo Gallery Section - Now integrated with Hero */}
          {/* This section will now focus on providing an overview or secondary access to images if needed,
              but the main gallery interaction is moved to the hero. */}
          {data.galleryImages && data.galleryImages.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <Camera className="w-8 h-8 text-gray-700" />
                <h2 className="text-4xl font-extrabold text-gray-900">
                  More Moments
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {data.galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openModal(index)} // Open modal with the current image index
                    className={`relative w-full h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 group ${
                      index === activeImageIndex
                        ? "ring-4 ring-blue-500"
                        : "ring-2 ring-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">View</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
            {/* Features Section */}
            {data.features && data.features.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-3 inline-block">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.features.map((feature, index) => (
                  <div
                      key={index}
                    className="flex items-start gap-2 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-lg font-medium text-gray-800 capitalize">
                      {feature}
                    </span>
                  </div>
                  ))}
              </div>
            </section>
            )}

            {/* Trip Details Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-3 inline-block">
              Experience Details
            </h2>
            <div className="space-y-6">
                {data.details.map((detail, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-5 capitalize flex items-center gap-3">
                    <Check className="w-6 h-6 bg-green-500 text-white flex-shrink-0 mt-1 rounded-md" />
                      {detail.title}
                    </h3>
                    {Array.isArray(detail.content) ? (
                    <ul className="space-y-4 list-none pl-0">
                        {detail.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {item}
                          </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {detail.content}
                    </p>
                    )}
                  </div>
                ))}
              </div>
          </section>

         
            </div>

        {/* Right Sidebar (Booking Form) */}
        <aside className="lg:col-span-1 sticky top-0 h-screen  scale-80 mb-5">
          <div className="sticky top-15 bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl space-y-6 ">
            {/* Price Header */}
            <div className="text-center pb-6 border-b border-gray-100 ">
              <p className="text-xl font-semibold text-gray-600 mb-2">
                Starting from
              </p>
              <div className="text-5xl font-extrabold text-blue-700">
                ₹{data.price}
                <span className="text-2xl text-gray-500 font-normal">
                  {" "}
                  / person
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Unlock unforgettable experiences!
              </p>
                </div>

                <div className="space-y-6">
                  {/* Date Selection */}
              <div className="space-y-3">
                <label
                  htmlFor="booking-date"
                  className="flex items-center gap-3 text-lg font-bold text-gray-800"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Choose Your Date
                    </label>
                    <input
                  id="booking-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl bg-gray-50 text-lg text-gray-800 focus:border-blue-600 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>

              {/* Guests Selection */}
              <div className="space-y-5">
                <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                  <Users className="w-5 h-5 text-blue-600" />
                  Number of Guests
                </label>

                {/* Adults */}
                <div className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      Adults
                    </div>
                    <div className="text-sm text-gray-600">Age 18+</div>
                  </div>
                  <div className="flex items-center gap-4">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-2xl font-bold"
                      aria-label="Decrease adult count"
                      >
                      <Minus className="w-5 h-5" />
                      </button>
                    <span className="text-2xl font-extrabold text-gray-900 w-10 text-center">
                      {adults}
                    </span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                      className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-2xl font-bold"
                      aria-label="Increase adult count"
                      >
                      <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                {/* Children */}
                <div className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      Children
                    </div>
                    <div className="text-sm text-gray-600">Age 4-8</div>
                  </div>
                  <div className="flex items-center gap-4">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-2xl font-bold"
                      aria-label="Decrease child count"
                      >
                      <Minus className="w-5 h-5" />
                      </button>
                    <span className="text-2xl font-extrabold text-gray-900 w-10 text-center">
                      {children}
                    </span>
                      <button
                        onClick={() => setChildren(children + 1)}
                      className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-2xl font-bold"
                      aria-label="Increase child count"
                      >
                      <Plus className="w-5 h-5" />
                      </button>
                  </div>
                    </div>
                  </div>

                  {/* Total Price */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mt-6">
                    <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-blue-800">
                    Total Amount:
                  </span>
                  <span className="text-4xl font-extrabold text-blue-900">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                    </div>
                  </div>

              {/* Book Button */}
                  <button
                    onClick={handleBooking}
                className="w-full bg-blue-600 text-white font-extrabold py-5 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-3 text-xl"
                  >
                <Check className="w-6 h-6" />
                Reserve Your Adventure Now
                  </button>

              {/* Guarantees */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24 hours before</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation on booking</span>
                  </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Best price guarantee for your peace of mind</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-white rounded-lg p-2">
            <button onClick={closeModal} className="absolute top-3 right-3 bg-white rounded-full text-zinc-700 hover:text-gray-800 p-1 ">✖</button>
            <img src={data.galleryImages[modalImageIndex]} alt={`Gallery ${modalImageIndex + 1}`} className="w-full h-auto rounded-lg" />
            <div className="flex justify-between mt-4">
              <button
                onClick={prevImageInModal}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                disabled={modalImageIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextImageInModal}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                disabled={modalImageIndex === data.galleryImages.length - 1}
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
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