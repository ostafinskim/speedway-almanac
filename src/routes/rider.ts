import express, { Request, Response } from 'express';
import { prisma } from '../db/connectDB';
export const rider = express.Router();

rider.get('/', async (req: Request, res: Response) => {
  try {
    const riders = await prisma.rider.findMany({})

    if (riders.length === 0) {
      res.status(404).json({ msg: 'No riders found...' })
    }

    res.status(200).json(riders)

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

rider.post('/', async (req: Request, res: Response) => {
  try {
    const { bio, dayOfBirth, placeOfBirth, firstName, lastName, nationality, fimNumber, fimRanking, debut, firstWin, imageUrl } = req.body;
    const slug = `${firstName}-${lastName}`.toLowerCase().replace(/\s+/g, '-');
    const newRider = await prisma.rider.create({
      data: {
        bio,
        slug,
        dayOfBirth,
        placeOfBirth,
        firstName,
        lastName,
        nationality,
        fimNumber,
        fimRanking,
        debut,
        firstWin,
        imageUrl
      }
    })

    res.status(201).json(newRider);

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
})