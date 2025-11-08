import lisaImg from "@/assets/lisa-mentor.jpg";
import tanishkaImg from "@/assets/tanishka-mentor.jpg";
import lucyImg from "@/assets/lucy-mentor.jpg";
import sophieImg from "@/assets/sophie-mentor.jpg";
import marieImg from "@/assets/marie-mentor.jpg";

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
    name: "Lisa",
    subject: "Mathematics",
    description: "Calm, analytical, loves shortcuts & clarity",
    avatar: lisaImg,
    greeting: "Hi there! I'm Lisa, your math mentor. What would you like to learn today?",
    expertise: ["Algebra", "Geometry", "Calculus", "Statistics"]
  },
  {
    id: "tanishka",
    name: "Tanishka",
    subject: "Physics",
    description: "Energetic and practical, simplifies hard formulas",
    avatar: tanishkaImg,
    greeting: "Hey! I'm Tanishka, ready to make physics fun and easy. What's your question?",
    expertise: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"]
  },
  {
    id: "lucy",
    name: "Lucy",
    subject: "Biology",
    description: "Gentle and visual, explains through imagery",
    avatar: lucyImg,
    greeting: "Hello! I'm Lucy, your biology guide. Let's explore the wonders of life together!",
    expertise: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"]
  },
  {
    id: "sophie",
    name: "Sophie",
    subject: "English",
    description: "Creative, improves grammar and style naturally",
    avatar: sophieImg,
    greeting: "Hi! I'm Sophie, here to help you master the art of language. What shall we work on?",
    expertise: ["Grammar", "Literature", "Creative Writing", "Essay Writing"]
  },
  {
    id: "marie",
    name: "Marie",
    subject: "Chemistry",
    description: "Methodical, connects reactions to real life",
    avatar: marieImg,
    greeting: "Welcome! I'm Marie, your chemistry mentor. Let's unlock the secrets of matter together!",
    expertise: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Lab Techniques"]
  }
];

export const getMentorById = (id: string): Mentor | undefined => {
  return mentors.find(mentor => mentor.id === id);
};

export const getMentorBySubject = (subject: string): Mentor | undefined => {
  return mentors.find(mentor => mentor.subject.toLowerCase() === subject.toLowerCase());
};
