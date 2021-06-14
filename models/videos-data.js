const faker=require("faker")
faker.seed(1024);
const videosData = [
  {
    vid: "kBo3ipDEH6k",
    title: "POWERFUL MOTIVATIONAL VIDEO by  By Sandeep Maheshwari",
    category: "MOTIVATIONAL",
    author: "Sandeep Maheshwari",
    subsciber: faker.datatype.number(),
    views: faker.datatype.number(),
    date: faker.date.past(),
    image:
      "https://i.ytimg.com/vi/kBo3ipDEH6k/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCx3awRDn84BshkizfQMJMTVzmLQw",
    description:
      "All he had was an undying learning attitude to hold on to. Rowing through ups and downs, it was time that taught him the true meaning of his life."
  },
  {
    vid: "7kRQlYSqw_g",
    title: "7 Rules of Success Inspirational Speech By Apj Abdul Kalam Sir",
    category: "MOTIVATIONAL",
    author: "Desi Motivation",
    subsciber: faker.datatype.number(),
    views: faker.datatype.number(),
    date: faker.date.past(),
    image:
      "https://i.ytimg.com/vi/7kRQlYSqw_g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAbsTgMGMy28bxidKg6SzYloEBfPQ",
    description:
      "Here are Apj Abdul Kalam 7 Rules of Success: 1. Work with Courage 2. Be Unique Be You 3. Culture of excellence 4. Leader must be explorer 5. Knowledge makes you great 6. Think out of Box with vision 7. How to Manage Failure"
  },
  {
    vid: "nuPDpuGeFps",
    title: "Always take challenges in Your Life",
    category: "MOTIVATIONAL",
    author: "Sonu Sharma",
    subsciber: faker.datatype.number(),
    views: faker.datatype.number(),
    date: faker.date.past(),
    image:
      "https://i.ytimg.com/vi/7kRQlYSqhttps://i.ytimg.com/vi/nuPDpuGeFps/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBsx4pCoj-JeURRCOBPgjaXRhyMNA",
    description: "Don't take Comfort, Always take the challenge in Your Life. "
  },
  {
    vid: "lnFLQ12DZRw",
    title: "Tu Khud Ki Khoj Me Nikal",
    category: "MOTIVATIONAL",
    author: "Amitabh Bachchan",
    subsciber: faker.datatype.number(),
    views: faker.datatype.number(),
    date: faker.date.past(),
    image:
      "https://i.ytimg.com/vi/lnFLQ12DZRw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD0c5jdzb7nb-vJ733GFyXHJsWj0Q",
    description:
      "तू खुद की खोज में निकल  तू किस लिए हताश है, तू चल तेरे वजूद की  समय को भी तलाश है समय को भी तलाश है"
  },
  {
    vid: "YZmoW3mtl5U",
    title: "Motivational Thoughts by KV",
    category: "MOTIVATIONAL",
    author: "Dr. Kumar Vishwas",
    subsciber: faker.datatype.number(),
    views: faker.datatype.number(),
    date: faker.date.past(1),
    image:
      "https://i.ytimg.com/vi/YZmoW3mtl5U/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBqeq6YVqYytueumQZKYKfeuOvfrQ",
    description:
      "जिज्ञासा' सफ़लता का महज़ 'एक सूत्र' नहीं है, बल्कि पहला और सबसे आवश्यक सूत्र है। क्यों और कैसे, यहाँ देखें-सुनें और साझा करें"
  }
];
module.exports = videosData;