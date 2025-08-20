"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Mail,
  Phone,
  Facebook,
  Youtube,
  Download,
  Play,
  ExternalLink,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  subtitle: string;
  cover: string;
  gradient: string;
  shadow: string;
  orderLink: string;
}

interface Song {
  _id: string;
  title: string;
  artist: string;
  link: string;
  category: string;
}

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl font-bold text-slate-800">
              Rakibul Ahsan Minar
            </h1>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link
                href="#home"
                className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="#books"
                className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Books
              </Link>
              <Link
                href="#nasheed"
                className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Nasheed
              </Link>
              <Link
                href="#contact"
                className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="#home"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                About
              </Link>
              <Link
                href="#books"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Books
              </Link>
              <Link
                href="#nasheed"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Nasheed
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function Portfolio() {
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [showAllNasheed, setShowAllNasheed] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksResponse, songsResponse] = await Promise.all([
        fetch("/api/books"),
        fetch("/api/songs"),
      ]);

      if (booksResponse.ok) {
        const booksData = await booksResponse.json();
        setBooks(booksData);
      }

      if (songsResponse.ok) {
        const songsData = await songsResponse.json();
        setSongs(songsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedBooks = showAllBooks ? books : books.slice(0, 3);
  const displayedSongs = showAllNasheed ? songs : songs.slice(0, 9);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-red-100">
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 bg-gradient-to-br from-pink-50 via-yellow-50 to-red-50 overflow-hidden"
      >
        {/* Colorful Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-yellow-300/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-red-300/40 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-800 tracking-tight">
                RAKIBUL AHSAN
                <span className="block text-amber-600">MINAR</span>
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-base sm:text-lg text-slate-600">
                <span>Writer</span>
                <span>•</span>
                <span>Poet</span>
                <span>•</span>
                <span>Lyricist</span>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-medium italic max-w-2xl">
                "I write to awaken — for truth, for faith, for justice."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
              <Image
                src="/images/rakibul-with-book.jpg"
                alt="Rakibul Ahsan Minar with his book"
                width={400}
                height={500}
                className="relative rounded-2xl shadow-2xl object-cover w-full max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
                Who I Am
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>
                  I am{" "}
                  <strong className="text-slate-800">
                    Rakibul Ahsan Minar
                  </strong>
                  , a Bangladeshi writer, poet, and lyricist.
                </p>
                <p>
                  With a heart rooted in spirituality and a voice raised against
                  injustice, I've written over{" "}
                  <strong className="text-amber-600">
                    100 original songs and nasheed
                  </strong>
                  , and authored several published books now available online.
                </p>
                <p className="italic text-slate-700">
                  My pen speaks where voices are silenced. My words aim to heal,
                  awaken, and inspire.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/rakibul-with-deer.jpg"
                alt="Rakibul Ahsan Minar in nature"
                width={350}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Books Section */}
      <section
        id="books"
        className="py-20 bg-gradient-to-r from-pink-50 via-yellow-50 to-red-50 relative overflow-hidden"
      >
        {/* Gradient Shadow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-yellow-200/20 to-red-200/20"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-pink-300/30 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-red-300/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-t from-yellow-300/30 to-transparent blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Published Books
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Explore my literary journey through these published works
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 max-w-5xl mx-auto">
            {displayedBooks.map((book, index) => (
              <Card
                key={index}
                className={`hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${book.shadow} border-0 bg-white/80 backdrop-blur-sm h-full`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${book.gradient} rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}
                    ></div>
                    <div className="relative mx-auto w-full max-w-[200px] aspect-[3/4]">
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="rounded-lg shadow-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3 pt-0 flex-1 flex flex-col">
                  <CardTitle className="text-lg sm:text-xl text-slate-800 font-bold">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm leading-relaxed flex-1">
                    {book.subtitle}
                  </CardDescription>
                  <div className="flex gap-2 justify-center pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-slate-50 bg-transparent text-xs"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-slate-50 bg-transparent text-xs"
                      onClick={() =>
                        book.orderLink !== "#" &&
                        window.open(book.orderLink, "_blank")
                      }
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={() => setShowAllBooks(!showAllBooks)}
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 hover:from-pink-600 hover:via-yellow-600 hover:to-red-600 text-white shadow-lg"
            >
              {showAllBooks ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  See More Books ({books.length - 3} more)
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Nasheed & Songs Section */}
      <section
        id="nasheed"
        className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 relative overflow-hidden"
      >
        {/* Enhanced Colorful Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-blue-300/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-green-300/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-12">
            {/* Featured Artists Sections */}
            <div className="space-y-12">
              {/* Artist: Iqbal Hossain Jibon */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    শিল্পী ইকবাল হুসাইন জীবন
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="/images/singer-iqbal-hossain-jibon.jpg"
                      alt="শিল্পী ইকবাল হুসাইন জীবন"
                      width={120}
                      height={120}
                      className="rounded-full shadow-lg object-cover"
                    />
                  </div>
                  <div className="w-24 h-1 bg-emerald-500 mx-auto rounded"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "ইসলাম",
                      link: "https://youtu.be/pHSAFgVMy5g?si=TqYNnAdzx1AX5eaL",
                    },
                    {
                      title: "জাহান্নাম",
                      link: "https://youtu.be/zA-AfuOt2KY?si=eCm4fINVTBrbolr6",
                    },
                    {
                      title: "রাসূলের মত চাঁদ",
                      link: "https://youtu.be/64VxgRjW4-w?si=BB15jX2VAw-Zxzjs",
                    },
                    {
                      title: "মৃত্যু",
                      link: "https://youtu.be/PcJMNV95TTM?si=ovWNb4ZSqh2BB2Ez",
                    },
                    {
                      title: "হৃদয়ের কথা",
                      link: "https://youtu.be/UemwIzdntDQ?si=Eakld1wluuF7Y7DN",
                    },
                    {
                      title: "সিয়ামের দিন",
                      link: "https://youtu.be/Pl1KeFWaTCA?si=ddVmT_XeTteuBxne",
                    },
                  ].map((song, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                            {song.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Islamic Nasheed
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(song.link, "_blank")}
                            className="hover:bg-emerald-50"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(song.link, "_blank")}
                            className="text-xs hidden sm:flex"
                          >
                            YouTube
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Artist: Mahmud Foysal */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    শিল্পী মাহমুদ ফয়সাল
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="/images/singer-mahmud-foysal.jpg"
                      alt="শিল্পী মাহমুদ ফয়সাল"
                      width={120}
                      height={120}
                      className="rounded-full shadow-lg object-cover"
                    />
                  </div>
                  <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "জামাতের কর্মী",
                      link: "https://youtu.be/C7PEpqXzXrM?si=vO7n_Y6MQDzXYcEs",
                    },
                    {
                      title: "মায়ের গান",
                      link: "https://youtu.be/9VvC8d4JuGw?si=R7SiZ_YOPIvkqR6U",
                    },
                    {
                      title: "আমাদের কাফেলা",
                      link: "https://youtu.be/VYwKIPu_CUo",
                    },
                    {
                      title: "ক্ষণিক জীবন",
                      link: "https://youtu.be/LC2Ik9DhkOI",
                    },
                    {
                      title: "ধর্ষকের ফাঁসি চাই",
                      link: "https://youtu.be/wXDUp2K1yqg",
                    },
                    { title: "রাহবার", link: "https://youtu.be/kdF3wLXYNYc" },
                  ].map((song, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                            {song.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Islamic Nasheed
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(song.link, "_blank")}
                            className="hover:bg-blue-50"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(song.link, "_blank")}
                            className="text-xs hidden sm:flex"
                          >
                            YouTube
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Artist: Moshiur Rahman */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    শিল্পী মশিউর রহমান
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="/images/singer-moshiur-rahman.jpg"
                      alt="শিল্পী মশিউর রহমান"
                      width={120}
                      height={120}
                      className="rounded-full shadow-lg object-cover"
                    />
                  </div>
                  <div className="w-24 h-1 bg-red-500 mx-auto rounded"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "বাবা গান - ১",
                      link: "https://youtu.be/_JvNtbt9ufA",
                    },
                    {
                      title: "তোমার প্রিয়",
                      link: "https://youtu.be/xJ-Ema0ZOnU",
                    },
                    { title: "দাওয়াত", link: "https://youtu.be/_3201znHKRs" },
                    {
                      title: "বাবা গান - ২",
                      link: "https://youtu.be/hY43zZG25T4",
                    },
                    { title: "গুজব", link: "https://youtu.be/jzy0Ok0fibw" },
                    {
                      title: "মানবতার  ডাক্তার",
                      link: "https://youtu.be/-vx6G95a1f0",
                    },
                    { title: "যাকাত", link: "https://youtu.be/N8q3lIKL_0k" },
                  ].map((song, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                            {song.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Protest Song
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(song.link, "_blank")}
                            className="hover:bg-red-50"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(song.link, "_blank")}
                            className="text-xs hidden sm:flex"
                          >
                            YouTube
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Nasheed Collection */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                  Complete Nasheed Collection
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 mx-auto rounded"></div>
                <p className="text-slate-600 mt-2">
                  {songs?.length} Songs - Various Artists
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {displayedSongs.map((song, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">
                            {song.title}
                          </h4>
                          <p className="text-xs text-slate-600 truncate">
                            {song.artist}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(song.link, "_blank")}
                          className="flex-shrink-0 hover:bg-purple-50"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!showAllNasheed && (
                <div className="text-center">
                  <Button
                    onClick={() => setShowAllNasheed(true)}
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 hover:from-pink-600 hover:via-yellow-600 hover:to-red-600 text-white shadow-lg"
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    See More Songs ({songs.length - 9} more)
                  </Button>
                </div>
              )}

              {showAllNasheed && (
                <div className="text-center">
                  <Button
                    onClick={() => setShowAllNasheed(false)}
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              My Academic Background
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              The foundation that shaped my writing journey
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                        Certified Holistic Nutritionist
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base">
                        American University of Integrated Health (AUIH)
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Specialized training in holistic health and nutrition
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                        Master's in Political Science
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base">
                        Feni Government College (Incomplete)
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Advanced studies in political theory and governance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Let's Connect
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Reach out for collaborations, discussions, or just to say hello
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                      Email
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base break-all">
                      rakibul.minar@email.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                      WhatsApp
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      +880 1XXX-XXXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                      Social Media
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Facebook • YouTube
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Send a Message
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  I'd love to hear from you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {submitMessage && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      submitMessage.includes("successfully")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Name
                    </label>
                    <Input
                      placeholder="Your name"
                      className="mt-1"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    className="mt-1 min-h-[120px]"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <Button
                  className="w-full bg-slate-800 hover:bg-slate-700"
                  disabled={isSubmitting}
                  onClick={handleContactSubmit}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Rakibul Ahsan Minar
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Writer • Poet • Nasheed Artist
              </p>
            </div>

            <div className="text-center order-3 lg:order-2">
              <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                <Link
                  href="#home"
                  className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Home
                </Link>
                <Link
                  href="#books"
                  className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Books
                </Link>
                <Link
                  href="#nasheed"
                  className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Nasheed
                </Link>
                <Link
                  href="#contact"
                  className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end gap-4 order-2 lg:order-3">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-amber-400"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-amber-400"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-amber-400"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p className="text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} Rakibul Ahsan Minar. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
