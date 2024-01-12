import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJ_ID_PROD,
    dataset: process.env.SANITY_DATASET_PROD
  }
})
