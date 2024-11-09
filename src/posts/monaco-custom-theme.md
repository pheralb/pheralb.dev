---
title: Add a custom theme to Monaco Editor for React
description: How to add a custom Visual Studio Code theme to Monaco Editor for React and custom snippets.
date: '2024-5-31'
category: 'Tutorial'
writing: false
published: true
---

## Prepare our Vite project with React

1. Run the following command to create a new React project with Vite:

```bash
pnpm create vite@latest
```

```
√ Project name: ... my-monaco-editor
√ Select a framework: » React
√ Select a variant: » TypeScript + SWC
```

2. Install dependencies:

```bash
pnpm i
```

## Add Monaco Editor to our project

1. Install the [Monaco Editor for React](https://github.com/suren-atoyan/monaco-react) package:

```bash
pnpm i @monaco-editor/react -E
```

2. Create a new file called `MonacoEditor.tsx` in the `src/` folder:

```tsx
const MyMonacoEditor = () => {
  return <div>CustomEditor</div>;
};

export default MyMonacoEditor;
```

3. Create a new `Editor` component and import `Monaco` type (we will use it later):

```tsx
import { Editor, type Monaco } from '@monaco-editor/react';

const MyMonacoEditor = () => {
  return <Editor width="100%" height="100vh" />;
};

export default MyMonacoEditor;
```

## Prepare our custom Monaco Theme

In our case, we will add [**One Dark Pro**](https://binaryify.github.io/OneDark-Pro/#/) theme to Monaco Editor, you can choose any other theme from the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode).

1. Create a new file called `onedarkpro.json` in the `src/` folder:

```bash
📂 src
|- 📂 theme
    |- 📄 onedarkpro.json
```

2. [Copy the source code of the theme from Github Repository](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro-darker.json).
3. To make the properties of the VS Code theme the same as in Monaco Editor, we are going to use [vsctim utility](https://vsctim.vercel.app/). Paste the content of the theme into the utility (left side) and click on the "Convert Theme" button. Then, copy the content from the left side and paste it into the `onedarkpro.json` file.
4. In the `onedarkpro.json` file, delete `base` and `inherit` properties.

## Import the custom Monaco Theme

Create inside the editor component where you have the `<Editor />`, a function to be executed before the editor starts (`beforeMount`):

```tsx
import { Editor, type Monaco } from '@monaco-editor/react';
import OneDarkPro from './theme/onedarkpro.json';

const MyMonacoEditor = () => {
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('OneDarkPro', {
      base: 'vs-dark',
      inherit: true,
      ...OneDarkPro
    });
  };

  return (
    <Editor width="100%" height="100vh" theme="OneDarkPro" beforeMount={handleEditorDidMount} />
  );
};

export default MyMonacoEditor;
```

## Snippets

- Add custom code font, font size, bracket pair colorization, word wrap, activate/disable minimap, cursor blinking, and format on paste:

```tsx
<Editor
  options={{
    fontSize: 14,
    fontFamily: 'Jetbrains-Mono',
    fontLigatures: true,
    wordWrap: 'on',
    minimap: {
      enabled: false
    },
    bracketPairColorization: {
      enabled: true
    },
    cursorBlinking: 'expand',
    formatOnPaste: true,
    suggest: {
      showFields: false,
      showFunctions: false
    }
  }}
/>
```

- Disable TypeScript checking in the editor:

```ts
const handleEditorDidMount = (monaco: Monaco) => {
  monaco.editor.defineTheme('OneDarkPro', {
    base: 'vs-dark',
    inherit: true,
    ...OneDarkPro
  });
  // 👇
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
};
```

- Add **tsx** (React + Typescript) support:

```ts
const handleEditorDidMount = (monaco: Monaco) => {
  monaco.editor.defineTheme('OneDarkPro', {
    base: 'vs-dark',
    inherit: true,
    ...OneDarkPro
  });
  // 👇
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    tsx: 'react'
  });
};
```
