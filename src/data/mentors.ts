import lisaImg from "@/assets/lisa-mentor.webp";
import soniaImg from "@/assets/sonia-mentor.webp";
import tanishkaImg from "@/assets/tanishka-mentor.webp";
import lucyImg from "@/assets/lucy-mentor.webp";
import sophieImg from "@/assets/sophie-mentor.webp";
import marieImg from "@/assets/marie-mentor.webp";
import lyraImg from "@/assets/lyra-mentor.webp";
import vedikaImg from "@/assets/vedika-mentor.webp";
import devikaImg from "@/assets/devika-mentor.webp";
import stacyImg from "@/assets/stacy-mentor.webp";
import rosieImg from "@/assets/rosie-mentor.webp";
import selenaImg from "@/assets/selena-mentor.webp";

export interface Mentor {
  id: string;
  name: string;
  subject: string;
  description: string;
  avatar: string;
  greeting: string;
  expertise: string[];
}

export const mentors: Mentor[] = [
  {
    id: "lisa",
    name: "Miss Lisa",
    subject: "Mathematics",
    description: "Calm, analytical, loves shortcuts & clarity",
    avatar: lisaImg,
    greeting: "Hi there! I'm Miss Lisa, your math mentor. What would you like to learn today?",
    expertise: ["Algebra", "Geometry", "Calculus", "Statistics"]
  },
  {
    id: "sonia",
    name: "Miss Sonia",
    subject: "Physics",
    description: "Energetic and practical, simplifies hard formulas",
    avatar: soniaImg,
    greeting: "Hey! I'm Miss Sonia, ready to make physics fun and easy. What's your question?",
    expertise: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"]
  },
  {
    id: "lucy",
    name: "Miss Lucy",
    subject: "Biology",
    description: "Gentle and visual, explains through imagery",
    avatar: lucyImg,
    greeting: "Hello! I'm Miss Lucy, your biology guide. Let's explore the wonders of life together!",
    expertise: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"]
  },
  {
    id: "sophie",
    name: "Miss Sophie",
    subject: "English",
    description: "Creative, improves grammar and style naturally",
    avatar: sophieImg,
    greeting: "Hi! I'm Miss Sophie, here to help you master the art of language. What shall we work on?",
    expertise: ["Grammar", "Literature", "Creative Writing", "Essay Writing"]
  },
  {
    id: "marie",
    name: "Miss Marie",
    subject: "Chemistry",
    description: "Methodical, connects reactions to real life",
    avatar: marieImg,
    greeting: "Welcome! I'm Miss Marie, your chemistry mentor. Let's unlock the secrets of matter together!",
    expertise: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Lab Techniques"]
  },
  {
    id: "tanishka",
    name: "Miss Tanishka",
    subject: "Hindi",
    description: "Patient and cultural, makes Hindi learning engaging",
    avatar: tanishkaImg,
    greeting: "Namaste! I'm Miss Tanishka, your Hindi mentor. Let's explore the beauty of Hindi together!",
    expertise: ["Grammar", "Literature", "Conversation", "Writing"]
  },
  {
    id: "lyra",
    name: "Miss Lyra",
    subject: "Computer Science",
    description: "Coding is just like gaming, building something new",
    avatar: lyraImg,
    greeting: "Hey! I'm Miss Lyra. Coding is just like gaming - let's build something awesome together!",
    expertise: ["Java", "Python", "AI", "Gaming"]
  },
  {
    id: "vedika",
    name: "Miss Vedika",
    subject: "History & Civics",
    description: "Storyteller of the past, connects events to present",
    avatar: vedikaImg,
    greeting: "Namaste! I'm Miss Vedika, your history mentor. Let's journey through time and discover the stories that shaped our world!",
    expertise: ["Ancient History", "World History", "Indian History", "Historical Analysis"]
  },
  {
    id: "devika",
    name: "Miss Devika",
    subject: "Meditation and Physical Education",
    description: "Peaceful guide to mindfulness and inner balance",
    avatar: devikaImg,
    greeting: "Welcome! I'm Miss Devika, your meditation guide. Let's find peace and clarity together through mindful practice.",
    expertise: ["Mindfulness", "Breathing Techniques", "Stress Management", "Inner Peace"]
  },
  {
    id: "stacy",
    name: "Miss Stacy",
    subject: "Geography",
    description: "Adventurous explorer connecting places to cultures",
    avatar: stacyImg,
    greeting: "Hello! I'm Miss Stacy, your geography mentor. Let's explore the world together and discover how geography shapes our lives!",
    expertise: ["Physical Geography", "Cultural Geography", "Map Reading", "World Cultures"]
  },
  {
    id: "rosie",
    name: "Miss Rosie",
    subject: "Art",
    description: "Creative artist inspiring imagination and expression",
    avatar: rosieImg,
    greeting: "Hi there! I'm Miss Rosie, your art mentor. Let's unleash your creativity and explore the beautiful world of art together!",
    expertise: ["Drawing", "Painting", "Art History", "Creative Expression"]
  },
  {
    id: "selena",
    name: "Miss Selena",
    subject: "Vocal Music",
    description: "Melodious guide to the joy of singing and music",
    avatar: selenaImg,
    greeting: "Hey! I'm Miss Selena, your vocal music mentor. Ready!?🎵Let's discover the harmony of your voice and compose something beautiful. I might make you fall in love with singing! 😉",
    expertise: ["Singing Techniques", "Music Theory", "Voice Training", "Performance"]
  }
];

export const getMentorById = (id: string): Mentor | undefined => {
  return mentors.find(mentor => mentor.id === id);
};

export const getMentorBySubject = (subject: string): Mentor | undefined => {
  return mentors.find(mentor => mentor.subject.toLowerCase() === subject.toLowerCase());
};
