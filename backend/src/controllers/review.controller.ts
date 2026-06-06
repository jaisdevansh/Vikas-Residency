import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL 
  ? '/tmp' 
  : path.join(__dirname, '../../data');
const reviewsFilePath = path.join(dataDir, 'reviews.json');

// Ensure directory and file exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial default reviews
const defaultReviews = [
  {
    id: "rev1",
    name: "Rahul Verma",
    rating: 5,
    text: "Best location in Varanasi.",
    date: "1 month ago"
  },
  {
    id: "rev2",
    name: "Sneha Reddy",
    rating: 5,
    text: "Amazing stay with friends. Owner is very cooperative. Great location — highly recommended for a budget trip.",
    date: "2 months ago"
  },
  {
    id: "rev3",
    name: "Amit Kumar",
    rating: 5,
    text: "All sightseeing places were right in front. Owner was very helpful. Reasonable price too.",
    date: "3 months ago"
  },
  {
    id: "rev4",
    name: "Priya Singh",
    rating: 5,
    text: "Stayed with family. Completely safe and comfortable. All places to visit are right next to the hotel.",
    date: "4 months ago"
  },
  {
    id: "rev5",
    name: "Vikram Sharma",
    rating: 5,
    text: "Great hotel with perfect location. All tourist spots nearby. Owner is very nice and humble. Totally worth it.",
    date: "5 months ago"
  }
];

if (!fs.existsSync(reviewsFilePath)) {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(defaultReviews, null, 2), 'utf8');
}

// Helper to read reviews
const getMockReviews = (): any[] => {
  try {
    const data = fs.readFileSync(reviewsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading mock reviews:", error);
    return [];
  }
};

// Helper to save reviews
const saveMockReviews = (reviews: any[]) => {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf8');
};

export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = getMockReviews();
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = getMockReviews();
    const newReview = {
      id: Date.now().toString(),
      name: req.body.name,
      rating: Number(req.body.rating),
      text: req.body.text,
      date: req.body.date || "Just now"
    };
    reviews.unshift(newReview); // Add to beginning
    saveMockReviews(reviews);
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = getMockReviews();
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    
    reviews[index] = {
      ...reviews[index],
      name: req.body.name || reviews[index].name,
      rating: req.body.rating ? Number(req.body.rating) : reviews[index].rating,
      text: req.body.text || reviews[index].text,
      date: req.body.date || reviews[index].date
    };
    
    saveMockReviews(reviews);
    res.status(200).json({ success: true, data: reviews[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let reviews = getMockReviews();
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    
    reviews = reviews.filter(r => r.id !== req.params.id);
    saveMockReviews(reviews);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
