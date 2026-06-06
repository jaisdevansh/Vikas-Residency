import { Request, Response, NextFunction } from 'express';
import * as galleryService from '../services/gallery.service';

export const getGalleryImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await galleryService.getGalleryImages();
    res.json({ success: true, images });
  } catch (error) {
    next(error);
  }
};

export const createGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image_url, caption } = req.body;
    
    if (!image_url) {
      return res.status(400).json({ success: false, error: "image_url is required" });
    }

    const image = await galleryService.createGalleryImage({ image_url, caption });
    if (!image) {
      return res.status(400).json({ success: false, error: "Failed to create gallery image record" });
    }

    res.status(201).json({ success: true, image });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await galleryService.deleteGalleryImage(Number(id));
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Gallery image not found" });
    }

    res.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    next(error);
  }
};
