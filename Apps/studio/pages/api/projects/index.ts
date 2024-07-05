import { NextApiRequest, NextApiResponse } from 'next'
import apiWrapper from 'lib/api/apiWrapper'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

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

const handleGetAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .rpc('get_profiles_with_organizations_and_projects');

    if (error) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(500).json({ data: null, error: { message: error.message } });
  }
};


// import { NextApiRequest, NextApiResponse } from 'next'

// import apiWrapper from 'lib/api/apiWrapper'
// import { DEFAULT_PROJECT } from '../constants'

// export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req

//   switch (method) {
//     case 'GET':
//       return handleGetAll(req, res)
//     default:
//       res.setHeader('Allow', ['GET'])
//       res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
//   }
// }

// const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Platform specific endpoint
//   const response = [DEFAULT_PROJECT]
//   return res.status(200).json(response)
// }
