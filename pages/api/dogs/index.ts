import { NextApiRequest, NextApiResponse } from 'next';
import { getAllDogs } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const dogs = await getAllDogs();
    return res.status(200).json(dogs);
  }

  return res.status(405);
}

// Reading all dogs: 'GET /dogs'
// Reading a single dog: 'GET /dogs/:id'
// in the Admin:
// Creating a new dog: 'POST /dogs'
// Updating a dog: 'PUT /dogs/:id'
// Delete a dog: 'DELETE /dogs/:id'
