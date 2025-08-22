// scripts/seed-singers.js
const mongoose = require("mongoose");

// MongoDB connection
const MONGODB_URI =
  "mongodb+srv://nrbnayon:chatters@cluster0.f6x2ow6.mongodb.net/Rahik?retryWrites=true&w=majority";

// Singer schema
const SingerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Song schema
const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    singerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Singer' },
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

const Singer = mongoose.models.Singer || mongoose.model("Singer", SingerSchema);
const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);

const singersData = [
  {
    name: "শিল্পী ইকবাল হুসাইন জীবন",
    image: "/images/singer-iqbal-hossain-jibon.jpg",
    bio: "Renowned Islamic nasheed artist known for spiritual and devotional songs",
    isActive: true,
  },
  {
    name: "শিল্পী মাহমুদ ফয়সাল",
    image: "/images/singer-mahmud-foysal.jpg",
    bio: "Popular nasheed singer and social activist through music",
    isActive: true,
  },
  {
    name: "শিল্পী মশিউর রহমান",
    image: "/images/singer-moshiur-rahman.jpg",
    bio: "Protest song artist and social consciousness advocate",
    isActive: true,
  },
  {
    name: "শিল্পী মাহফুজ মামুন",
    image: "/images/singer-mahfuz-mamun.jpg",
    bio: "Versatile nasheed artist with focus on spiritual and social themes",
    isActive: true,
  },
  {
    name: "শিল্পী মাহবুব রিয়াজ",
    image: "/images/singer-mahbub-riaz.jpg",
    bio: "Islamic nasheed singer known for motivational and spiritual songs",
    isActive: true,
  },
];

// Updated songs data with singer assignments
const songsData = [
  // Iqbal Hossain Jibon songs
  {
    title: "ইসলাম",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/pHSAFgVMy5g?si=TqYNnAdzx1AX5eaL",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },
  {
    title: "জাহান্নাম",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/zA-AfuOt2KY",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },
  {
    title: "রাসূলের মত চাঁদ",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/64VxgRjW4-w?si=BB15jX2VAw-Zxzjs",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },
  {
    title: "মৃত্যু",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/PcJMNV95TTM?si=ovWNb4ZSqh2BB2Ez",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },
  {
    title: "হৃদয়ের কথা",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/UemwIzdntDQ?si=Eakld1wluuF7Y7DN",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },
  {
    title: "সিয়ামের দিন",
    artist: "ইকবাল হুসাইন জীবন",
    link: "https://youtu.be/Pl1KeFWaTCA?si=ddVmT_XeTteuBxne",
    category: "nasheed",
    singerName: "শিল্পী ইকবাল হুসাইন জীবন",
  },

  // Mahmud Foysal songs
  {
    title: "জামাতের কর্মী",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/C7PEpqXzXrM?si=vO7n_Y6MQDzXYcEs",
    category: "nasheed",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },
  {
    title: "মায়ের গান",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/9VvC8d4JuGw?si=R7SiZ_YOPIvkqR6U",
    category: "nasheed",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },
  {
    title: "আমাদের কাফেলা",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/VYwKIPu_CUo",
    category: "nasheed",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },
  {
    title: "ক্ষণিক জীবন",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/LC2Ik9DhkOI",
    category: "nasheed",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },
  {
    title: "ধর্ষণের প্রতিবাদে ফাঁসি চাই",
    artist: "মাহমুদ ফয়সাল ও অন্যান্য",
    link: "https://youtu.be/wXDUp2K1yqg",
    category: "protest",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },
  {
    title: "রাহবার",
    artist: "মাহমুদ ফয়সাল ও অন্যান্য",
    link: "https://youtu.be/kdF3wLXYNYc",
    category: "nasheed",
    singerName: "শিল্পী মাহমুদ ফয়সাল",
  },

  // Moshiur Rahman songs
  {
    title: "বাবা",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/_JvNtbt9ufA",
    category: "protest",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "তোমার প্রিয়",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/xJ-Ema0ZOnU",
    category: "nasheed",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "দাওয়াত",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/_3201znHKRs",
    category: "nasheed",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "বাবা ২",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/hY43zZG25T4",
    category: "protest",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "গুজব",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/S-iWcLtPALE",
    category: "protest",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "মানবতার ডাক্তার",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/-vx6G95a1f0",
    category: "nasheed",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "মা তুমি আজ প্রস্তুতি নাও",
    artist: "মশিউর রহমান",
    link: "https://youtu.be/x_41jKLUOnQ?si=SNvAn8EAyNhduJLX",
    category: "protest",
    singerName: "শিল্পী মশিউর রহমান",
  },
  {
    title: "যাকাত",
    artist: "মশিউর রহমান লিটন",
    link: "https://youtu.be/N8q3lIKL_0k",
    category: "nasheed",
    singerName: "শিল্পী মশিউর রহমান",
  },

  // Mahfuz Mamun songs
  {
    title: "স্বাধীনতা",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/Ao-6GtTrmkc?si=PXgedrH4VOrzDMGu",
    category: "protest",
    singerName: "শিল্পী মাহফুজ মামুন",
  },
  {
    title: "আল্লাহু",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/tZx23Jn9aZE?si=hajHJQMU0Wr8lGxT",
    category: "nasheed",
    singerName: "শিল্পী মাহফুজ মামুন",
  },
  {
    title: "নেই ভরসা",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/an01QO2GRog?si=UzHIpvY8FaRQ1UnP",
    category: "nasheed",
    singerName: "শিল্পী মাহফুজ মামুন",
  },
  {
    title: "লাশ",
    artist: "মাহফুজ মামুন",
    link: "https://youtu.be/FCzU_AHJhAs?si=ls-sPZz3zK_aJ9Dm",
    category: "protest",
    singerName: "শিল্পী মাহফুজ মামুন",
  },

  // Mahbub Riaz songs
  {
    title: "মনে কি পড়ে সেই দিন",
    artist: "মাহবুব রিয়াজ ও অন্যান্য",
    link: "https://youtu.be/S-TfWSNVmwI?si=Mhjnoh-Zbn1EgtvB",
    category: "nasheed",
    singerName: "শিল্পী মাহবুব রিয়াজ",
  },
  {
    title: "যে ছেলে মা শিবির করে",
    artist: "মাহবুব রিয়াজ ও অন্যান্য",
    link: "https://youtu.be/xm85oIu7wlA?si=8wdX4I6ys4SmhHry",
    category: "nasheed",
    singerName: "শিল্পী মাহবুব রিয়াজ",
  },
  {
    title: "জেগে ওঠো ময়দানে",
    artist: "মাহবুব রিয়াজ",
    link: "https://youtu.be/kTB1WK2SllM?si=H1z3yBim6ExyzdQZ",
    category: "protest",
    singerName: "শিল্পী মাহবুব রিয়াজ",
  },
  {
    title: "ঐক্যের ডাক",
    artist: "মাহবুব রিয়াজ",
    link: "https://youtu.be/w3RZ3k2iZTA?si=8Df6LGGcknMg3bDq",
    category: "nasheed",
    singerName: "শিল্পী মাহবুব রিয়াজ",
  },
  {
    title: "সম্প্রীতির ঈদ",
    artist: "মাহবুব রিয়াজ",
    link: "https://youtu.be/zyAkof7DxNY?si=IWrpyKcpehnyegUW",
    category: "nasheed",
    singerName: "শিল্পী মাহবুব রিয়াজ",
  },

  // Other existing songs without specific singers
  {
    title: "আল্লাহ আল্লাহ",
    artist: "সাইফুল্লাহ মানসুর",
    link: "https://youtu.be/N3xkupepVkw",
    category: "nasheed",
  },
  {
    title: "দেশ জুড়ে আজ শুধু বিপদ",
    artist: "লিটন হাফিজ চৌধুরি",
    link: "https://youtu.be/qSAYx0RH7aw",
    category: "protest",
  },
  {
    title: "আর রহমান",
    artist: "গাজী আনাস রওশন",
    link: "https://youtu.be/yeV9vAxm-7g",
    category: "nasheed",
  },
  {
    title: "পথের ধারে",
    artist: "গাজী আনাম রওশন",
    link: "https://youtu.be/hV2voKK3NJw",
    category: "nasheed",
  },
  {
    title: "আমার গানের ভাষা",
    artist: "গাজী আনাস রওশন",
    link: "https://youtu.be/bUvbTpgASow",
    category: "nasheed",
  },
  {
    title: "রহমান",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/Zc9PwqbOqwY",
    category: "nasheed",
  },
  {
    title: "মান রাব্বুকা",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/FDOhU0Irkgg",
    category: "nasheed",
  },
  {
    title: "প্রাণের রাসূল",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/mJU0u7Ch50M",
    category: "nasheed",
  },
  {
    title: "কারাগার",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/DOhXzKqWwm8",
    category: "protest",
  },
  {
    title: "জাগরণ",
    artist: "দিদারুল ইসলাম",
    link: "https://youtu.be/Pwq9qX1Fzjg",
    category: "protest",
  },
  {
    title: "ব্যথিত প্রবাসী",
    artist: "মাহমুদ ফয়সাল",
    link: "https://youtu.be/jWqz50Aob0U",
    category: "nasheed",
  },
  {
    title: "রমজানের স্বাগত নাশীদ",
    artist: "মাহফুজ মামুন ও অন্যান্য",
    link: "https://youtu.be/KnzXpD1FEsk",
    category: "nasheed",
  },
  {
    title: "ফজর",
    artist: "মুনায়েম বিল্লাহ",
    link: "https://youtu.be/5VAOFJz779c",
    category: "nasheed",
  },
  {
    title: "ঘুম",
    artist: "পিএম মিজান",
    link: "https://youtu.be/U3syGMGa220",
    category: "nasheed",
  },
  {
    title: "প্রজাপতি",
    artist: "ফখরুল ইসলাম",
    link: "https://youtu.be/VEbT6auZh5g",
    category: "nasheed",
  },
  {
    title: "ভালোবাসা দান",
    artist: "আবদুল্লাহ আল নোমান",
    link: "https://youtu.be/MjfbPtkJRvU",
    category: "nasheed",
  },
  {
    title: "ইয়া ইলাহী",
    artist: "মাসুদ হুজাইফি",
    link: "https://youtu.be/uXqmnO7MWUI",
    category: "nasheed",
  },
  {
    title: "স্বাধীনতা",
    artist: "সারগাম শিল্পী গোষ্ঠি",
    link: "https://youtu.be/1fvjrkttkB4",
    category: "protest",
  },
  {
    title: "বাংলাদেশ",
    artist: "সারগাম শিল্পী গোষ্ঠি",
    link: "https://youtu.be/sUERP-yba28",
    category: "protest",
  },
  {
    title: "বিজয়ের সংগ্রাম",
    artist: "সিন্দাবাদ শিল্পী গোষ্ঠী",
    link: "https://youtu.be/TREgCUK4-tk",
    category: "protest",
  },
  {
    title: "গল্প কথার দেশ",
    artist: "অনুপম শিল্পী গোষ্ঠী",
    link: "https://youtu.be/H5fQb2c0wHM",
    category: "nasheed",
  },
  {
    title: "রহম ধারা",
    artist: "আরাফাত রহমান ও অন্যান্য",
    link: "https://youtu.be/rVIvKXXAmK8",
    category: "nasheed",
  },
  {
    title: "মানুষ কতো নিষ্ঠুর",
    artist: "কবির বিন সামাদ",
    link: "https://youtu.be/qwF5HyISdpU",
    category: "protest",
  },
  {
    title: "রেনু হত্যার প্রতিবাদে গান",
    artist: "মইনুল ইসলাম",
    link: "https://youtu.be/-vCJgMsr2Qc",
    category: "protest",
  },
  {
    title: "শহীদ মুরসী",
    artist: "মইনুল ইসলাম",
    link: "https://youtu.be/yQk5Gy0SEu8",
    category: "protest",
  },
  {
    title: "পবিত্রতার মাস",
    artist: "আহমেদ কায়েস",
    link: "https://youtu.be/OwXuVDz46u0",
    category: "nasheed",
  },
  {
    title: "চোগলখোর",
    artist: "নাশীদ একাডেমি",
    link: "https://youtu.be/_TOKy4aV01E",
    category: "nasheed",
  },
  {
    title: "বাংলা ভাষা",
    artist: "সিন্দাবাদ শিল্পীগোষ্ঠী",
    link: "https://youtu.be/WPnNMEFURNI",
    category: "protest",
  },
  {
    title: "কুরানের পাখি",
    artist: "শাহাবুদ্দিন শিহাব",
    link: "https://youtu.be/Jbic3-H3CHE",
    category: "nasheed",
  },
];

async function seedSingers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing singers and update songs
    await Singer.deleteMany({});
    console.log("Cleared existing singers");

    // Insert singers
    const insertedSingers = await Singer.insertMany(singersData);
    console.log(`Inserted ${insertedSingers.length} singers`);

    // Create a map of singer names to IDs
    const singerMap = {};
    insertedSingers.forEach(singer => {
      singerMap[singer.name] = singer._id;
    });

    // Update existing songs with singer IDs
    for (const songData of songsData) {
      if (songData.singerName && singerMap[songData.singerName]) {
        await Song.updateOne(
          { title: songData.title, artist: songData.artist },
          { 
            $set: { 
              singerId: singerMap[songData.singerName],
              link: songData.link,
              category: songData.category
            } 
          },
          { upsert: true }
        );
      } else {
        // Insert songs without specific singers
        await Song.updateOne(
          { title: songData.title, artist: songData.artist },
          { 
            $set: { 
              title: songData.title,
              artist: songData.artist,
              link: songData.link,
              category: songData.category,
              isPublished: true,
              publishedDate: new Date()
            } 
          },
          { upsert: true }
        );
      }
    }

    console.log("Updated songs with singer associations");
    console.log("Singer seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding singers:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedSingers();