---
title: How to create a cli with clack
description: Learn how to create a beautiful CLI to generate projects with custom templates using clack/prompts & Typescript.
date: '2024-4-21'
category: 'Tutorial'
writing: false
published: true
---

## Introduction

`clack/prompts` is a library that allows you to create beautiful command-line interfaces with Typescript. In this tutorial, we will learn how to create a simple CLI with clack/prompts, building a cli to create apps with custom template.

## Prerequisites

Before we start, make sure you have the following installed:

- [Node.js 20](https://nodejs.org/en/download/).
- Typescript knowledge.

## Setting up the project

1. Create a new directory for your project and navigate to it:

```bash
mkdir my-cli
cd my-cli
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install & setup Typescript:

> I will use [pnpm](https://pnpm.io/) as package manager, but you can use npm or yarn. To install pnpm, run:

```bash
# Install globally with npm:
npm install -g pnpm

# Check version:
pnpm --version
```

- Install Typescript & Node types as dev dependencies:

```bash
pnpm install typescript @types/node -E -D
```

- Create a `tsconfig.json` file:

```bash
npx tsc --init
```

- Update `tsconfig.json` file with custom alias and update the `target`, `module` and add `moduleResolution`:

```json {4,9,14}
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["**/*.ts", "src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

## Setting up ESLint

1. Install `eslint` and `prettier` as dev dependencies:

```bash
pnpm install eslint -E -D
```

2. Create a `.eslintrc.js` file:

```bash
npx eslint --init
```

## Bundle with tsup

**But... What is tsup? 🤔**

[tsup](https://tsup.egoist.dev/) is a bundle tool created by [egoist](https://github.com/egoist) that bundles your Typescript code using [esbuild](https://esbuild.github.io/) under the hood. This will be necessary to compile and test our cli in a fast way 🚀.

1. Install `tsup` as a dev dependency:

```bash
pnpm install tsup -E -D
```

2. Add a script to your `package.json` file:

```json {6}
{
  "scripts": {
    "start": "tsup && node dist/index.js"
  }
}
```

3. Create a custom `tsup.config.ts` in the root of your project with the following content:

```ts
import { defineConfig } from 'tsup';

// Copy 'templates' folder to 'dist' folder:
import { cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  entryPoints: ['src/index.ts'], // 👈 Entry file
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  shims: true,
  outDir: 'dist', // 👈 /dist output folder
  async onSuccess() {
    await cp(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates'), // 👈 This folder will be created in the next step on this tutorial 😉.
      path.join('dist', 'templates'),
      { recursive: true }
    );
  }
});
```

## Let's add our custom app templates

Before we start, let's create a `templates` folder in the root of our project with the following structure:

```bash
📁 src
  |- 📄 index.ts
📁 templates
  |- // Add your templates here.
```

You can add any template you want. For example, let's generate a new Next.js project in our `templates` folder:

```bash
pnpm dlx create-next-app templates/nextjs
```

and you will see the following structure in your `templates` folder:

```bash
📁 src
  |- 📄 index.ts
📁 templates
  |- 📁 nextjs-app // or the name you have set in the cli of Next.js
```

## Getting started with clack/prompts

1. Install `clack/prompts`:

```bash
pnpm install @clack/prompts -E
```

2. Prepare main function in `src/index.ts`:

```ts
import * as clack from '@clack/prompts';

async function main() {
  clack.log.info('🚀 Ready');
}

main();
```

and if you run `pnpm start`, you should see the message `🚀 Ready` in your terminal.

## Creating the CLI with clack utilities & Node.js functions

1. We will ask the user for the project name and template to use:

```ts
// 📁 src/index.ts

import * as clack from '@clack/prompts';

async function main() {
  clack.intro('🚀 Welcome to my CLI app');

  const projectName = (await clack.text({
    message: 'Enter the project name:',
    placeholder: 'My amazing project',
    validate(value) {
      if (value.length === 0) return `⚠️ Project name is required`;
    }
  })) as string;

  clack.outro('👋 Goodbye');
}

main();
```

2. Create a function to list the templates available:

```ts
// 📁 src/utils/readFolders.ts

import * as fs from 'fs/promises';

export interface FoldersAvailable {
  value: string;
  label: string;
}

export const readFolders = async (path: string): Promise<FoldersAvailable[]> => {
  const folderNames = await fs.readdir(path);
  const folders = folderNames.map((folderName) => {
    return {
      label: folderName,
      value: `${path}/${folderName}`
    };
  });

  return folders;
};
```

3. Read the folder and add option to select the template:

```ts
// 📁 src/index.ts

import * as clack from '@clack/prompts';
import { type FoldersAvailable, readFolders } from './utils/readFolders';

async function main() {
  clack.intro('🚀 Welcome to my CLI app');

  const projectName = (await clack.text({
    message: 'Enter the project name:',
    placeholder: 'My amazing project',
    validate(value) {
      if (value.length === 0) return `Project name is required`;
    }
  })) as string;

  let templates: FoldersAvailable[] = [];

  try {
    const mainDirectory = process.cwd();
    templates = await readFolders(`${mainDirectory}/templates`);
  } catch (error) {
    clack.log.error('🛑 Error reading templates folder.');
    //@ts-ignore
    clack.log.info(error.message as string);
    process.exit(1);
  }

  const selectProjectType = (await clack.select({
    message: 'Select the project:',
    options: templates
  })) as string;

  clack.outro('👋 Goodbye');
}

main();
```

4. Copy the template to the project folder:

- Create a function to copy the template:

```ts
// 📁 src/utils/copyToFolder.ts

import * as fs from 'fs/promises';

export const copyToFolder = async (path: string, destination: string) => {
  const folderNames = await fs.readdir(path);
  for (const folderName of folderNames) {
    const source = `${path}/${folderName}`;
    const dest = `${destination}/${folderName}`;
    await fs.copyFile(source, dest);
  }
};
```

- Update the main function to copy the template:

```ts
// 📁 src/index.ts

import * as clack from '@clack/prompts';
import { type FoldersAvailable, readFolders } from './utils/readFolders';
import { copyToFolder } from './utils/copyToFolder';

async function main() {
  clack.intro('🚀 Welcome to my CLI app');

  const mainDirectory = process.cwd();

  const projectName = (await clack.text({
    message: 'Enter the project name:',
    placeholder: 'My amazing project',
    validate(value) {
      if (value.length === 0) return `Project name is required`;
    }
  })) as string;

  let templates: FoldersAvailable[] = [];

  try {
    templates = await readFolders(`${mainDirectory}/templates`);
  } catch (error) {
    clack.log.error('🛑 Error reading templates folder.');
    clack.log.info(error.message as string);
    process.exit(1);
  }

  const selectProjectType = (await clack.select({
    message: 'Select the project type:',
    options: templates
  })) as string;

  const s = clack.spinner();

  try {
    s.start('📦 Copying files...');
    await copyToFolder(selectProjectType, `${mainDirectory}/${projectName}`);
  } catch (error) {
    clack.log.error('🛑 Error copy folder.');
    clack.log.info(error.message as string);
    process.exit(1);
  } finally {
    s.stop();
  }

  clack.outro('👋 Goodbye');
}

main();
```

But... I need to create a folder before copying the files 👀. Let's create a function to create a folder:

```ts
// 📁 src/utils/createFolder.ts

import * as fs from 'fs/promises';
import * as path from 'path';

const copyRecursive = async (source: string, destination: string) => {
  const stats = await fs.lstat(source);

  if (stats.isDirectory()) {
    await fs.mkdir(destination, { recursive: true });
    const items = await fs.readdir(source);

    for (const item of items) {
      const srcPath = path.join(source, item);
      const destPath = path.join(destination, item);
      await copyRecursive(srcPath, destPath);
    }
  } else if (stats.isFile()) {
    await fs.copyFile(source, destination);
  }
};

export const copyToFolder = async (source: string, destination: string) => {
  await copyRecursive(source, destination);
};
```

And add the function when the user select the template:

```ts
// 📁 src/index.ts

try {
  await createFolder(`${mainDirectory}/${projectName}`);
  await copyToFolder(selectProjectType, `${mainDirectory}/${projectName}`);
  clack.log.success('✅ Project created successfully.');
} catch (error) {
  clack.log.error('🛑 Error creating a project:');
  clack.log.info(error.message as string);
  process.exit(1);
}
```

**Ready 🎉!** Now you can run your CLI with `pnpm start` and create a new project with your custom template.

To finish, add in the first line of your `index.ts` the following:

```ts
// 📁 src/index.ts
#!/usr/bin/env node
// rest of the code...
```

And add a the followings scripts in your `package.json` file:

```json
{
  "bin": {
    "create-appcli": "dist/index.js" // 👈 Name of your cli.
  },
  "files": ["dist/**/*"]
}
```
