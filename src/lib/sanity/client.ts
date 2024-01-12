import { createClient } from 'next-sanity'


export const client = createClient({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET_PROD,
  projectId: process.env.SANITY_PROJ_ID_PROD,
})




// Fetch querys
