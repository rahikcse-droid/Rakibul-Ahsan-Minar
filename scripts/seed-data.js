const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://nrbnayon:chatters@cluster0.f6x2ow6.mongodb.net/Rahik?retryWrites=true&w=majority';

// Book schema
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  cover: { type: String, required: true },
  gradient: { type: String, default: 'from-blue-400 to-blue-600' },
  shadow: { type: String, default: 'shadow-blue-200' },
  orderLink: { type: String, default: '#' },
  isPublished: { type: Boolean, default: true },
  publishedDate: { type: Date, default: Date.now },
  language: { type: String, default: 'Bengali' },
}, { timestamps: true });

// Song schema
const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, enum: ['nasheed', 'protest', 'spiritual', 'other'], default: 'nasheed' },
  isPublished: { type: Boolean, default: true },
  publishedDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);
const Song = mongoose.models.Song || mongoose.model('Song', SongSchema);

const booksData = [
  {
    title: "প্রিয়তমা",
    subtitle: "A spiritual journey of love and devotion",
    cover: "/images/book-priyotoma.jpg",
    gradient: "from-pink-400 to-pink-600",
    shadow: "shadow-pink-200",
    orderLink: "https://www.rokomari.com/book/278794/priyotoma-tomake-jevabe-chai",
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
  { title: "আল্লাহ আল্লাহ", artist: "সাইফুল্লাহ মানসুর", link: "https://youtu.be/N3xkupepVkw", category: "nasheed" },
  { title: "বাবা", artist: "মশিউর রহমান", link: "https://youtu.be/_JvNtbt9ufA", category: "protest" },
  { title: "বাবা ২", artist: "মশিউর রহমান", link: "https://youtu.be/hY43zZG25T4", category: "protest" },
  { title: "তোমার প্রিয়", artist: "মশিউর রহমান", link: "https://youtu.be/xJ-Ema0ZOnU", category: "spiritual" },
  { title: "যাকাত", artist: "মশিউর রহমান লিটন", link: "https://youtu.be/N8q3lIKL_0k", category: "nasheed" },
  { title: "দাওয়াত", artist: "মশিউর রহমান", link: "https://youtu.be/_3201znHKRs", category: "nasheed" },
  { title: "মানবতার ডাক্তার", artist: "মশিউর রহমান", link: "https://youtu.be/-vx6G95a1f0", category: "protest" },
  { title: "গুজব", artist: "মশিউর রহমান", link: "https://youtu.be/S-iWcLtPALE", category: "protest" },
  { title: "জাহান্নাম", artist: "ইকবাল হুসাইন জীবন", link: "https://youtu.be/zA-AfuOt2KY", category: "spiritual" },
  { title: "সিয়ামের দিন", artist: "ইকবাল হুসাইন জীবন", link: "https://youtu.be/Pl1KeFWaTCA", category: "nasheed" },
];

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await Song.deleteMany({});
    console.log('Cleared existing data');

    // Insert books
    await Book.insertMany(booksData);
    console.log(`Inserted ${booksData.length} books`);

    // Insert songs
    await Song.insertMany(songsData);
    console.log(`Inserted ${songsData.length} songs`);

    console.log('Data seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();