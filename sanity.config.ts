import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/lib/sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'wyyihfvc',
  dataset: 'development',

  plugins: [visionTool(), structureTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
