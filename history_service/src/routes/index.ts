import { Router, Request, Response, NextFunction } from 'express';
import { getHistory } from '../controller/historyController';

const router = Router();

/**
 * @openapi
 * /history:
 *   get:
 *     summary: Retrieve a list of user actions
 *     description: Retrieve a list of user actions with optional filtering by user ID and pagination.
 *     tags:
 *       - History
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user to filter history actions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of user actions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/History'
 *                 total:
 *                   type: integer
 *                   description: Total number of user actions
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *       500:
 *         description: Internal server error
 */
router.get('/history', (req: Request, res: Response, next: NextFunction) => {
  getHistory(req, res, next);
});

export default router;
