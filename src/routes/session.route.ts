import { SessionService } from '@services/session.service';
import { RequestHandler, Router } from 'express';

const sessionRouter = Router();

const getSessionById: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const populate = req.query.populate + '' === 'true';
  SessionService.getSessionById(id, populate)
    .then((session) => {
      res.status(200).json({ session });
    })
    .catch(next);
};

sessionRouter.get('/:id', getSessionById);

export default sessionRouter;
