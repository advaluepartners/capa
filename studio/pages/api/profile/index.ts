import { NextApiRequest, NextApiResponse } from 'next'

import apiWrapper from 'lib/api/apiWrapper'
import { DEFAULT_PROJECT } from '../constants'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGetAll(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
  // Platform specific endpoint
  const response = {
    id: '550e8400-e29b-41d4-a716-446655440030',
    primary_email: 'test@test.com',
    username: 'test123',
    first_name: 'test',
    last_name: 'mctesticle',
    organizations: [
      {
        id: '3d6fa68e-49c3-4d9b-9a9f-8d8d1b1f4c92',
        name: process.env.DEFAULT_ORGANIZATION_NAME || 'Organization One',
        slug: 'otQtDQyUMnCeURCtbxIx',
        billing_email: 'billing@test.com',
        projects: [{ ...DEFAULT_PROJECT, connectionString: '' }],
      },
    ],
  }
  return res.status(200).json(response)
}
