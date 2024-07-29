interface userProps {
  email: string;
  password: string;
  name: string;
}

interface signInProps {
  email: string;
  password: string;
}

///Make sure that user.tsx is indeed meant to be a TypeScript module. 
//If it's a TypeScript file containing only type definitions and no React components, 
//it should ideally have the .ts extension instead of .tsx. The .tsx extension is usually reserved for files containing React components.

//If your file is meant to contain only types, rename it to user.ts.
