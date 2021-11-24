import { NextApiRequest, NextApiResponse } from 'next';
import {
  DogType,
  getDogsByShelterId,
  insertNewDog,
} from '../../../../../util/database';
import { Errors } from '../../../../../util/helpers/errors';

export type InsertDogResponse =
  | { errors: Errors }
  | { dog: DogType & { shelter: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const shelterDogs = await getDogsByShelterId(Number(req.query.shelterId));

    res.status(200).json(shelterDogs);
  } else if (req.method === 'POST') {
    try {
      const insertedDog = await insertNewDog({
        dogName: req.body.dogName,
        description: req.body.description,
        age: Number(req.body.age),
        gender: req.body.gender,
        size: Number(req.body.size),
        activityLevel: req.body.activityLevel,
        kids: req.body.kids,
        pets: req.body.pets,
        shelter: req.body.shelter,
        service: req.body.service,
        image: req.body.image,
      });

      if (!insertedDog) {
        res.status(404).send({
          errors: [
            { message: 'We could not upload your dog, please try again' },
          ],
        });
        return;
      }
      return res.status(200).send({ dog: insertedDog });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your upload' }],
      });
      return;
    }
  }

  return res.status(405);
}
