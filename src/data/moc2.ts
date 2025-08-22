// Define the PerformanceDetails type
export interface PerformanceDetails {
  agility: number;
  squat: number;
  mbThrow: number;
  jump: number;
  speed: number;
  details: {
    squatJump: { trial1: number; trial2: number; trial3: number; best: number; average: number };
    tenMSpeed: { time: number; rank: number };
    agilityTest: { time: number; rank: number };
    medicineBallThrow: { distance: number; rank: number };
  };
}

// Define the Student type
interface Student {
  id: number;
  name: string;
  schoolName: string;
  std: string;
  age: number;
  points: number;
}

// Mock student data
export const students: Student[] = [
  { id: 1, name: "Arjun Singh", schoolName: "DPS School", std: "10th", age: 16, points: 95 },
  { id: 2, name: "Priya Sharma", schoolName: "Vishwa Bharati", std: "9th", age: 15, points: 88 },
  { id: 3, name: "Rahul Gupta", schoolName: "St. Mary's Academy", std: "10th", age: 16, points: 76 },
  { id: 4, name: "Aisha Khan", schoolName: "Model Public School", std: "9th", age: 15, points: 92 },
  { id: 5, name: "Vikram Kumar", schoolName: "Sunshine School", std: "10th", age: 16, points: 85 },
];

// Mock performance data with string keys to match the code's access method
const performanceData = {
  "1": {
    agility: 85,
    squat: 90,
    mbThrow: 78,
    jump: 92,
    speed: 88,
    details: {
      squatJump: { trial1: 22, trial2: 24, trial3: 23, best: 24, average: 23 },
      tenMSpeed: { time: 2.1, rank: 2 },
      agilityTest: { time: 12.5, rank: 1 },
      medicineBallThrow: { distance: 8.5, rank: 3 },
    },
  },
  "2": {
    agility: 95,
    squat: 85,
    mbThrow: 88,
    jump: 80,
    speed: 91,
    details: {
      squatJump: { trial1: 18, trial2: 20, trial3: 19, best: 20, average: 19 },
      tenMSpeed: { time: 2.2, rank: 5 },
      agilityTest: { time: 13.5, rank: 4 },
      medicineBallThrow: { distance: 7.2, rank: 6 },
    },
  },
  "3": {
    agility: 75,
    squat: 80,
    mbThrow: 70,
    jump: 75,
    speed: 78,
    details: {
      squatJump: { trial1: 16, trial2: 17, trial3: 16, best: 17, average: 16.3 },
      tenMSpeed: { time: 2.5, rank: 8 },
      agilityTest: { time: 15.0, rank: 9 },
      medicineBallThrow: { distance: 6.5, rank: 10 },
    },
  },
  "4": {
    agility: 90,
    squat: 95,
    mbThrow: 90,
    jump: 95,
    speed: 90,
    details: {
      squatJump: { trial1: 21, trial2: 23, trial3: 25, best: 25, average: 23 },
      tenMSpeed: { time: 2.0, rank: 1 },
      agilityTest: { time: 12.8, rank: 2 },
      medicineBallThrow: { distance: 9.0, rank: 1 },
    },
  },
  "5": {
    agility: 80,
    squat: 82,
    mbThrow: 75,
    jump: 85,
    speed: 82,
    details: {
      squatJump: { trial1: 19, trial2: 21, trial3: 20, best: 21, average: 20 },
      tenMSpeed: { time: 2.3, rank: 6 },
      agilityTest: { time: 14.0, rank: 7 },
      medicineBallThrow: { distance: 7.5, rank: 5 },
    },
  },
};

export default performanceData;