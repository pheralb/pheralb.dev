---
title: Remix v2 Snippets
description: Code snippets for Remix.
date: '2024-4-28'
category: 'Snippets'
writing: false
published: true
---

## Import styles

If you're using Remix with **Vite**, you can import styles like this:

```jsx
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "@/styles/globals.css?url"; // 👈

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
```

and that the Vite compiler does not interpret `.css` files as paths:

```jsx
export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"], // 👈
    }),
  ],
});
```

## Routes

A guide for managing routes in Remix v2:

```bash
📂 app
  📂 routes
   | - ⚛️ app.tsx -> layout that wraps all the paths of /app. You have to add <Outlet /> from @remix-run/react.
   | - 🟦 action.set-theme.ts -> /action/set-theme. Exports a server-side ``action``. Ideal for use with <Form /> from @remix-run/react.
   | - ⚛️ app._index.tsx -> /app (main page)
   | - ⚛️ app.settings.tsx -> /app/settings
   | - ⚛️ app.$username.tsx -> /app/pheralb o /app/midudev. 💡
   | - ⚛️ root.tsx -> layout that wraps the entire application.
```

- 💡 To obtain the *$username*: [remix.run/docs/en/main/route/loader#params](https://remix.run/docs/en/main/route/loader#params)

## Install & configure Tailwind CSS with Prettier

1. Install Tailwind CSS, Prettier & Autoprefixer:
    
```bash
pnpm i tailwindcss prettier prettier-plugin-tailwindcss autoprefixer -E -D
```

2. Create a `global.css` or `styles.css` in the `app/` folder:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Import the styles in the `app/routes/root.tsx`:

```jsx
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "@/styles/globals.css?url"; // or styles.css 👀

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
```

4. Create a `tailwind.config.ts` file:

```bash
npx tailwindcss init --ts
```

5. In the `tailwind.config.ts` file, add the following:

```ts
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'], // 👈
  ...
} satisfies Config
```

6. Create a `postcss.config.js` file:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

7. Create a `prettier.config.js` file:

```js
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  ...
};
```

Ready 🚀✨