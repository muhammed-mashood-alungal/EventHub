import type { Event } from "../../types/events.types";


export const sampleEvents: Event[] = [
  {
    _id: "1",
    organizerId: "org1",
    title: "React Conference 2024",
    description: "Join us for the biggest React conference of the year! Learn from industry experts, network with developers, and discover the latest trends in React development.",
    venue: "Tech Convention Center, Silicon Valley",
    category: "Conference",
    startTime: "2024-03-15T09:00:00.000Z",
    endTime: "2024-03-15T18:00:00.000Z",
    isPublic: true,
    foodIncluded: true,
    foodMenu: [
      { type: "Breakfast", options: ["Continental", "Vegan Options"] },
      { type: "Lunch", options: ["Veg", "Non-Veg", "Vegan"] },
      { type: "Snacks", options: ["Coffee", "Tea", "Pastries"] }
    ],
    status: "upcoming",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-20T14:30:00.000Z"
  },
  {
    _id: "2",
    organizerId: "org2",
    title: "HackCode 48hr Challenge",
    description: "48-hour hackathon challenge! Build innovative solutions, compete with the best developers, and win amazing prizes.",
    venue: "Innovation Hub, Downtown",
    category: "Hackathon",
    startTime: "2024-03-22T18:00:00.000Z",
    endTime: "2024-03-24T18:00:00.000Z",
    isPublic: true,
    foodIncluded: true,
    foodMenu: [
      { type: "Dinner", options: ["Pizza", "Vegan Options"] },
      { type: "Breakfast", options: ["Continental"] },
      { type: "Lunch", options: ["Veg", "Non-Veg"] },
      { type: "Snacks", options: ["Energy Drinks", "Coffee", "Fruits"] }
    ],
    status: "upcoming",
    createdAt: "2024-01-10T08:00:00.000Z",
    updatedAt: "2024-01-25T16:45:00.000Z"
  },
  {
    _id: "3",
    organizerId: "org3",
    title: "Summer Music Festival",
    description: "Experience the best live music performances from top artists. Dance, sing, and enjoy an unforgettable musical journey.",
    venue: "Central Park Amphitheater",
    category: "Concert",
    startTime: "2024-04-05T16:00:00.000Z",
    endTime: "2024-04-05T23:00:00.000Z",
    isPublic: true,
    foodIncluded: false,
    foodMenu: [],
    status: "upcoming",
    createdAt: "2024-01-05T12:00:00.000Z",
    updatedAt: "2024-01-28T11:20:00.000Z"
  },
  {
    _id: "4",
    organizerId: "org4",
    title: "Web Development Workshop",
    description: "Learn modern web development techniques, from HTML/CSS basics to advanced JavaScript frameworks. Perfect for beginners and intermediate developers.",
    venue: "Learning Center, University Campus",
    category: "Workshop",
    startTime: "2024-03-10T10:00:00.000Z",
    endTime: "2024-03-10T16:00:00.000Z",
    isPublic: true,
    foodIncluded: true,
    meals:{lunch : true},
    status: "upcoming",
    createdAt: "2024-01-08T09:30:00.000Z",
    updatedAt: "2024-01-22T13:15:00.000Z"
  },
  {
    _id: "5",
    organizerId: "org5",
    title: "AI & Machine Learning Summit",
    description: "Explore the future of artificial intelligence and machine learning. Network with AI researchers, data scientists, and tech leaders.",
    venue: "Tech Innovation Center",
    category: "Conference",
    startTime: "2024-02-20T08:00:00.000Z",
    endTime: "2024-02-20T17:00:00.000Z",
    isPublic: false,
    foodIncluded: true,
    foodMenu: [
      { type: "Breakfast", options: ["Continental", "Vegan"] },
      { type: "Lunch", options: ["Gourmet", "Veg", "Non-Veg"] },
      { type: "Drinks", options: ["Premium Coffee", "Fresh Juices"] }
    ],
    status: "completed",
    createdAt: "2023-12-15T14:00:00.000Z",
    updatedAt: "2024-01-30T10:25:00.000Z"
  },
  {
    _id: "6",
    organizerId: "org6",
    title: "Startup Networking Event",
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts. Share ideas, find co-founders, and build meaningful business relationships.",
    venue: "Business Incubator Lounge",
    category: "Other",
    startTime: "2024-03-28T18:30:00.000Z",
    endTime: "2024-03-28T21:30:00.000Z",
    isPublic: true,
    foodIncluded: true,
    foodMenu: [
      { type: "Drinks", options: ["Wine", "Beer", "Mocktails"] },
      { type: "Snacks", options: ["Appetizers", "Finger Foods", "Veg Options"] }
    ],
    status: "upcoming",
    createdAt: "2024-01-12T16:45:00.000Z",
    updatedAt: "2024-01-26T09:10:00.000Z"
  }
];