import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'wyyihfvc',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
