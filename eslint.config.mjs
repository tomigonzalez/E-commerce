import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Configuración para manejar las rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la instancia de compatibilidad para importar configuraciones de ESLint
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Configuración de ESLint
const eslintConfig = [
// Extiende las configuraciones recomendadas para Next.js y TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Configuración adicional para ignorar carpetas innecesarias
  {
    ignores: ["node_modules/", ".next/"], // Ignora estas carpetas
    rules: {
      "prettier/prettier": "error", // Asegura que Prettier se ejecute como parte de ESLint
    },
  },
];

export default eslintConfig;
