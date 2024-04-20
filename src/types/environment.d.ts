declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;

      NEXT_PUBLIC_DATASET: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      NEXT_PUBLIC_API_VERSION: string;
    }
  }
}

export {};
