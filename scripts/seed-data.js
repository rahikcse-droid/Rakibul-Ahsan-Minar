// scripts\seed-data.js
const mongoose = require("mongoose");

// MongoDB connection
const MONGODB_URI =
  "mongodb+srv://nrbnayon:chatters@cluster0.f6x2ow6.mongodb.net/Rahik?retryWrites=true&w=majority";

// Book schema
const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    cover: { type: String, required: true },
    gradient: { type: String, default: "from-blue-400 to-blue-600" },
    shadow: { type: String, default: "shadow-blue-200" },
    orderLink: { type: String, default: "#" },
    isPublished: { type: Boolean, default: true },
    publishedDate: { type: Date, default: Date.now },
    language: { type: String, default: "Bengali" },
  },
  { timestamps: true }
);

// Song schema
const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    link: { type: String, required: true },
    category: {
      type: String,
      enum: ["nasheed", "protest", "spiritual", "other"],
      default: "nasheed",
    },
    isPublished: { type: Boolean, default: true },
    publishedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);
const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);

const booksData = [
  {
    title: "প্রিয়তমা",
    subtitle: "A spiritual journey of love and devotion",
    cover: "/images/book-priyotoma.jpg",
    gradient: "from-pink-400 to-pink-600",
    shadow: "shadow-pink-200",
    orderLink:
      "https://www.rokomari.com/book/278794/priyotoma-tomake-jevabe-chai",
  },
  {
    title: "চেহারায় মানুষ",
    subtitle: "Exploring the human condition and society",
    cover: "/images/book-cheharay-manush.jpg",
    gradient: "from-yellow-400 to-orange-500",
    shadow: "shadow-yellow-200",
    orderLink: "https://www.rokomari.com/book/212307/ceharay-manus",
  },
  {
    title: "হৃদয়ের অগ্নুৎপাত",
    subtitle: "The volcanic eruption of the heart",
    cover: "/images/book-hridoyer-ognutpat.jpg",
    gradient: "from-red-500 to-red-700",
    shadow: "shadow-red-200",
    orderLink: "https://www.rokomari.com/book/225683/hridoyer-agnutpat",
  },
  {
    title: "বোধের অভ্যুত্থান",
    subtitle: "The uprising of consciousness",
    cover: "/images/book-bodher-obbhutthan.jpg",
    gradient: "from-blue-400 to-blue-600",
    shadow: "shadow-blue-200",
    orderLink: "https://www.rokomari.com/book/449695/bodher-obbhutthan",
  },
  {
    title: "খসে পড়া মুখোশ",
    subtitle: "The fallen mask",
    cover: "/images/book-khose-pora-mukhosh.jpg",
    gradient: "from-green-400 to-green-600",
    shadow: "shadow-green-200",
    orderLink: "https://www.rokomari.com/book/379460/khose-pora-mukhosh",
  },
  {
    title: "ছন্দে গাঁথা বারুদ",
    subtitle: "Gunpowder woven in verse",
    cover: "/images/book-chonde-gatha-barud.jpg",
    gradient: "from-purple-400 to-purple-600",
    shadow: "shadow-purple-200",
    orderLink: "https://www.rokomari.com/book/214410/chonde-gantha-barud",
  },
  {
    title: "নিজেকে গড়ো",
    subtitle: "Build yourself",
    cover: "/images/book-nijeke-goro.png",
    gradient: "from-indigo-400 to-indigo-600",
    shadow: "shadow-indigo-200",
    orderLink: "#",
  },
];

const songsData = [
  {
    title: "আল্লাহ আল্লাহ",
    artist: "সাইফুল্লাহ মানসুর",
    link: "https://youtu.be/N3xkupepVkw",
  },
  {
    title: "বাবা",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/_JvNtbt9ufA",
  },
  {
    title: "বাবা ২",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/hY43zZG25T4",
  },
  {
    title: "তোমার প্রিয়",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/xJ-Ema0ZOnU",
  },
  {
    title: "যাকাত",
    artist: "মশিউর রহমান লিটন",
    link: "https://youtu.be/N8q3lIKL_0k",
  },
  {
    title: "দাওয়াত",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/_3201znHKRs",
  },
  {
    title: "মানবতার ডাক্তার",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/-vx6G95a1f0",
  },
  {
    title: "গুজব",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/S-iWcLtPALE",
  },
  {
    title: "দেশ জুড়ে আজ শুধু বিপদ",
    artist: "লিটন হাফিজ চৌধুরি",
    link: "https://youtu.be/qSAYx0RH7aw",
  },
  {
    title: "জাহান্নাম",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/zA-AfuOt2KY",
  },
  {
    title: "সিয়ামের দিন",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/Pl1KeFWaTCA",
  },
  {
    title: "আর রহমান",
    artist: "গাজী আনাস রওশন",
    link: "https://youtu.be/yeV9vAxm-7g",
  },
  {
    title: "পথের ধারে",
    artist: "গাজী আনাম রওশন",
    link: "https://youtu.be/hV2voKK3NJw",
  },
  {
    title: "আমার গানের ভাষা",
    artist: "গাজী আনাস রওশন",
    link: "https://youtu.be/bUvbTpgASow",
  },
  {
    title: "রহমান",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/Zc9PwqbOqwY",
  },
  {
    title: "মান রাব্বুকা",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/FDOhU0Irkgg",
  },
  {
    title: "প্রাণের রাসূল",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/mJU0u7Ch50M",
  },
  {
    title: "কারাগার",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/DOhXzKqWwm8",
  },
  {
    title: "জাগরণ",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/Pwq9qX1Fzjg",
  },
  {
    title: "ব্যথিত প্রবাসী",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/jWqz50Aob0U",
  },
  {
    title: "ক্ষণিক জীবন",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/LC2Ik9DhkOI",
  },
  {
    title: "রাহবার",
    artist: "মাহমুদ ফয়সাল ও অন্যান্য",
    link: "https://youtu.be/kdF3wLXYNYc",
  },
  {
    title: "ধর্ষণের প্রতিবাদে ফাঁসি চাই",
    artist: "মাহমুদ ফয়সাল ও অন্যান্য",
    link: "https://youtu.be/wXDUp2K1yqg",
  },
  {
    title: "রমজানের স্বাগত নাশীদ",
    artist: "মাহফুজ মামুন ও অন্যান্য",
    link: "https://youtu.be/KnzXpD1FEsk",
  },
  {
    title: "আল্লাহু",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/tZx23Jn9aZE",
  },
  {
    title: "মনে কি পড়ে সেই দিন",
    artist: "মাহবুব রিয়াজ ও অন্যান্য",
    link: "https://youtu.be/S-TfWSNVmwI",
  },
  {
    title: "শিবির",
    artist: "মাহবুব রিয়াজ ও অন্যান্য",
    link: "https://youtu.be/xm85oIu7wlA",
  },
  {
    title: "ফজর",
    artist: "মুনায়েম বিল্লাহ",
    link: "https://youtu.be/5VAOFJz779c",
  },
  {
    title: "ঘুম",
    artist: "পিএম মিজান",
    link: "https://youtu.be/U3syGMGa220",
  },
  {
    title: "প্রজাপতি",
    artist: "ফখরুল ইসলাম",
    link: "https://youtu.be/VEbT6auZh5g",
  },
  {
    title: "ভালোবাসা দান",
    artist: "আবদুল্লাহ আল নোমান",
    link: "https://youtu.be/MjfbPtkJRvU",
  },
  {
    title: "ইয়া ইলাহী",
    artist: "মাসুদ হুজাইফি",
    link: "https://youtu.be/uXqmnO7MWUI",
  },
  {
    title: "স্বাধীনতা",
    artist: "সারগাম শিল্পী গোষ্ঠি",
    link: "https://youtu.be/1fvjrkttkB4",
  },
  {
    title: "বাংলাদেশ",
    artist: "সারগাম শিল্পী গোষ্ঠি",
    link: "https://youtu.be/sUERP-yba28",
  },
  {
    title: "বিজয়ের সংগ্রাম",
    artist: "সিন্দাবাদ শিল্পী গোষ্ঠী",
    link: "https://youtu.be/TREgCUK4-tk",
  },
  {
    title: "গল্প কথার দেশ",
    artist: "অনুপম শিল্পী গোষ্ঠী",
    link: "https://youtu.be/H5fQb2c0wHM",
  },
  {
    title: "রহম ধারা",
    artist: "আরাফাত রহমান ও অন্যান্য",
    link: "https://youtu.be/rVIvKXXAmK8",
  },
  {
    title: "মানুষ কতো নিষ্ঠুর",
    artist: "কবির বিন সামাদ",
    link: "https://youtu.be/qwF5HyISdpU",
  },
  {
    title: "রেনু হত্যার প্রতিবাদে গান",
    artist: "মইনুল ইসলাম",
    link: "https://youtu.be/-vCJgMsr2Qc",
  },
  {
    title: "শহীদ মুরসী",
    artist: "মইনুল ইসলাম",
    link: "https://youtu.be/yQk5Gy0SEu8",
  },
  {
    title: "পবিত্রতার মাস",
    artist: "আহমেদ কায়েস",
    link: "https://youtu.be/OwXuVDz46u0",
  },
  {
    title: "লাশ",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/FCzU_AHJhAs",
  },
  {
    title: "চোগলখোর",
    artist: "নাশীদ একাডেমি",
    link: "https://youtu.be/_TOKy4aV01E",
  },
  {
    title: "বাংলা ভাষা",
    artist: "সিন্দাবাদ শিল্পীগোষ্ঠী",
    link: "https://youtu.be/WPnNMEFURNI",
  },
  {
    title: "কুরানের পাখি",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/Jbic3-H3CHE",
  },
  {
    title: "ইসলাম",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/pHSAFgVMy5g?si=TqYNnAdzx1AX5eaL",
  },
  {
    title: "রাসূলের মত চাঁদ",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/64VxgRjW4-w?si=BB15jX2VAw-Zxzjs",
  },
  {
    title: "মৃত্যু",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/PcJMNV95TTM?si=ovWNb4ZSqh2BB2Ez",
  },
  {
    title: "হৃদয়ের কথা",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/UemwIzdntDQ?si=Eakld1wluuF7Y7DN",
  },
  {
    title: "সিয়ামের দিন",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/Pl1KeFWaTCA?si=ddVmT_XeTteuBxne",
  },
  {
    title: "জামাতের কর্মী",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/C7PEpqXzXrM?si=vO7n_Y6MQDzXYcEs",
  },
  {
    title: "মায়ের গান",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/9VvC8d4JuGw?si=R7SiZ_YOPIvkqR6U",
  },
  {
    title: "আমাদের কাফেলা",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/VYwKIPu_CUo",
  },
];

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Book.deleteMany({});
    await Song.deleteMany({});
    console.log("Cleared existing data");

    // Insert books
    await Book.insertMany(booksData);
    console.log(`Inserted ${booksData.length} books`);

    // Insert songs
    await Song.insertMany(songsData);
    console.log(`Inserted ${songsData.length} songs`);

    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
