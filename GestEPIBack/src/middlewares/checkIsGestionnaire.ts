import { Request, Response, NextFunction } from 'express';

export const checkIsGestionnaire = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;

  if (!user || user.user_type_id !== 1) {
    return res.status(403).json({ message: 'Accès interdit : réservé aux gestionnaires' });
  }

  next(); // Il est autorisé, on continue
};
