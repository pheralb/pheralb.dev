---
title: How to Type-Safe Environment Variables with React Router 7 (Framework)
description: Learn how to create type-safe environment variables in your React Router 7 application using the @t3-oss/env-core and zod libraries.
date: '2025-5-25'
category: 'Tutorial'
writing: false
published: true
---

## Introduction

[`@t3-oss/env-core`](https://github.com/t3-oss/t3-env) is a library that provides a type-safe way to manage environment variables in your application. It uses `zod` for schema validation and can be used with any framework like [Next.js](https://env.t3.gg/docs/nextjs), [Nuxt](https://env.t3.gg/docs/nuxt) or [Agnostic Core](https://env.t3.gg/docs/core) (our case).

## Create a new React Router app

If you don't have a [React Router](https://reactrouter.com/start/framework/installation), you can create one using the following command:

```bash
pnpm dlx create-react-router@latest my-react-router-app
```

## Install libraries

Install the following dependencies:

```bash
pnpm i @t3-oss/env-core zod -E
```

## Client-side environment variables

1. Create a `.env` file in the root of your project:

```bash
# 📄 .env
VITE_HELLO="Hello from env variable"
```

2. Create a new file named **`env.public.ts`** in the **`app`** directory. This file will contain the schema for your **public** environment variables:

```ts
// 📄 env.public.ts
import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';

export const envPublic = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_HELLO: z.string()
    //...
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true
});
```

3. Usage:

```tsx
// 📄 routes/_index.tsx
import { envPublic } from '@/env.public';

const Homepage = () => {
  return <p>{envPublic.VITE_HELLO}</p>;
};

export default Homepage;
```

## Server-side environment variables

1. Create a `.env` file in the root of your project:

```bash
# 📄 .env
DATABASE_URL=""
```

2. Create a new file named **`env.server.ts`** in the **`app`** directory. This file will contain the schema for your **server** environment variables:

```ts
// 📄 env.server.ts
import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';

export const envServer = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
```

3. Usage:

```ts
// 📄 routes/api.hello.ts
import { envServer } from '@/env.server';

export const loader = async () => {
  return new Response(`Node Env: ${envServer.NODE_ENV}`);
};
```

🚀 Ready.