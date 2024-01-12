declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_PROJ_ID_PROD: string
      SANITY_DATASET_PROD: string
      SANITY_API_VERSION: string
    }
  }
}

export {}
