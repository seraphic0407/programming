import type { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "image tidak ditemukan",
    });
  }

  return res.status(201).json({
    message: "image berhasil diupload",
    filename: req.file.filename,
    path: `/uploads/images/${req.file.filename}`,
  });
};
