import { Request, Response, NextFunction } from 'express';
import * as blogsService from '../services/blogs.service';

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await blogsService.getBlogs();
    res.json({ success: true, blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const blog = await blogsService.getBlogBySlug(slug);
    
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      slug,
      excerpt,
      category,
      category_label,
      read_time,
      image_url,
      author_name,
      author_role,
      intro,
      paragraphs,
      local_tips
    } = req.body;

    // Validate inputs
    if (!title || !excerpt || !category || !category_label || !read_time || !image_url || !author_name || !author_role || !intro || !paragraphs) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const blog = await blogsService.createBlog({
      title,
      slug,
      excerpt,
      category,
      category_label,
      read_time,
      image_url,
      author_name,
      author_role,
      intro,
      paragraphs,
      local_tips
    });

    if (!blog) {
      return res.status(400).json({ success: false, error: "Failed to create blog post record" });
    }

    res.status(201).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await blogsService.deleteBlog(Number(id));
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
