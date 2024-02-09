## **tsconfig.json**

### 👉 **compilerOptions**

###### ➔ "module": "ESNext":

Indica que se deben usar módulos de ECMAScript en su versión más reciente.

###### ➔ "useDefineForClassFields": true

Habilita el uso de define para campos de clase, una característica de ECMAScript.

###### ➔ "forceConsistentCasingInFileNames": true

Asegura que los nombres de archivo se traten de manera consistente.

###### ➔ "allowSyntheticDefaultImports": true

Permite la importación de módulos que no tienen una exportación predeterminada y aún así utilizar la sintaxis de importación de predeterminada.

###### ➔ "resolveJsonModule": true

Permite la importación directa de archivos JSON como módulos en TypeScript. Esto facilita trabajar con configuraciones o datos en formato JSON.

###### ➔ "resolveJsonModule": true

Permite la importación directa de archivos JSON como módulos en TypeScript. Esto facilita trabajar con configuraciones o datos en formato JSON.

###### ➔ "isolatedModules": true

Hace que cada archivo .ts sea tratado como un módulo independiente. Es útil en escenarios donde solo se compilan archivos individuales sin necesidad de unirlos en un solo archivo JavaScript.

###### ➔ "noImplicitAny": true

Indica que no se deben permitir tipos any implícitos. En otras palabras, todos los tipos deben ser explícitamente declarados.

###### ➔ "strictNullChecks": true

Habilita comprobaciones estrictas para valores null y undefined. Con esta opción activada, TypeScript es más riguroso en asegurarse de que no se trate null o undefined como tipos válidos a menos que se especifique explícitamente.

###### ➔ "esModuleInterop": true

Simplifica la interoperabilidad entre los sistemas de módulos CommonJS y ES6.

###### ➔ "strict": true

Habilita un conjunto completo de opciones de modo estricto, recomendado para proyectos nuevos.

###### ➔ "target": "ESNext"

Indica que el código se compilará para la versión más reciente de ECMAScript.

###### ➔ "moduleResolution": "node"

Usa la resolución de módulos de Node.js.

###### ➔ "sourceMap": true

Genera archivos de mapa de origen (source maps) para facilitar la depuración.

###### ➔ "rootDir": "./src"

Especifica el directorio raíz de entrada para la compilación.

###### ➔ "outDir": "dist"

Indica el directorio de salida para los archivos JavaScript compilados.

### 👉 **include y exclude**

###### ➔ "include": ["src"]

Especifica qué archivos o carpetas deben incluirse en la compilación. En este caso, incluirá todos los archivos en el directorio src.

###### ➔ "exclude": ["node_modules", "**/*.spec.ts"]

Indica qué archivos o carpetas excluir de la compilación. En este caso, excluye node_modules y cualquier archivo con extensión .spec.ts.

### 👉 **lib**

###### ➔ "lib": ["es2015"]

Especifica las librerías de definiciones de TypeScript que se deben incluir durante la compilación. En este caso, incluirá las definiciones de ECMAScript 2015.

### 👉 **references**

###### ➔ "references": [{ "path": "./tsconfig.node.json" }]

Indica referencias a otros proyectos de TypeScript. En este caso, hay una referencia al archivo tsconfig.node.json.

## **.pretierrc.json**

###### ➔ "semi" : "false"

Descripción: Esta configuración controla si se deben agregar o no puntos y comas al final de las declaraciones.

###### ➔ "singleQuote" : "true"

Descripción: Indica que se deben usar comillas simples en lugar de comillas dobles para las cadenas de caracteres.

###### ➔ "printWidth" : "80":

Descripción: Establece el ancho máximo de una línea de código antes de que Prettier realice saltos de línea y reformatee el código.

###### ➔ "printWidth" : "80":

Descripción: Establece el ancho máximo de una línea de código antes de que Prettier realice saltos de línea y reformatee el código.

###### ➔ "tabWidth" : "2"

Descripción: Establece la cantidad de espacios que representan un tabulador.

## **.eslintrc.json**

#### 👉 **parser**:

###### ➔ "@typescript-eslint/parser":

Especifica el analizador/parser que
ESLint debe utilizar para analizar el código TypeScript.
En este caso, está utilizando @typescript-eslint/parser,
que es el analizador oficial de TypeScript para ESLint.

#### 👉**extends**:

###### ➔ "plugin:@typescript-eslint/recommended":

Extiende la configuración recomendada de ESLint proporcionada por
@typescript-eslint. Incluye un conjunto de reglas predefinidas
que son consideradas buenas prácticas para proyectos TypeScript.

###### ➔ "plugin:prettier/recommended":

Extiende la configuración recomendada de Prettier para ESLint.
Prettier es una herramienta de formateo de código,
y esta configuración asegura que ESLint y Prettier
trabajen bien juntos.

#### 👉 **parserOptions**:

###### ➔ "ecmaVersion":"latest":

Indica la versión de ECMAScript que se debe utilizar.
En este caso, está configurado como "latest", lo que significa
que ESLint debe usar la última versión de ECMAScript disponible.

###### ➔ "sourceType": "module":

Indica que el código debe
interpretarse como módulos ("module") en lugar de scripts
("script").

#### 👉**rules**:

###### ➔ "eqeqeq": ["error", "always"]:

Esta regla requiere el uso estricto de la comparación
=== en lugar de ==. La configuración "always" asegura
que siempre se utilice la comparación estricta.

###### ➔ "no-empty-function": "error":

Prohíbe funciones vacías. Si hay una función sin contenido,
ESLint mostrará un error.

###### ➔ "no-implicit-coercion": "error":

Prohíbe la coerción implícita de tipos,
como convertir un valor a un tipo diferente de manera implícita.

###### ➔ "@typescript-eslint/no-explicit-any": "error":

Muestra un error si se utiliza el tipo any explícitamente en el
código TypeScript. Usar any puede eliminar muchos de los
beneficios del sistema de tipos de TypeScript.

###### ➔ "@typescript-eslint/no-duplicate-enum-values": "error":

Muestra un error si hay valores duplicados en una
enumeración (enum) de TypeScript.

###### ➔ "@typescript-eslint/no-inferrable-types": "off":

Desactiva la regla que muestra advertencias cuando TypeScript
podría inferir el tipo de una variable, pero se ha proporcionado
explícitamente. Puede desactivarse si prefieres permitir tipos
explícitos incluso cuando son redundantes.

## **.nodemon.json**:

###### ➔ **"watch" : ["src"]**

Descripción: Define los directorios que nodemon debe vigilar en busca de cambios.

###### ➔ **"ext" : "ts"**

Descripción: Especifica la extensión del archivo que nodemon debe observar.

###### ➔ **"exec" : "ts-node ./app.ts"**

Descripción: Indica el comando que se ejecutará cuando nodemon detecta un cambio.

Cuando se detecta un cambio, nodemon ejecutará el script "app.ts" utilizando ts-node. ts-node es un ejecutor de TypeScript que permite ejecutar scripts TypeScript directamente sin necesidad de compilarlos previamente.

En resumen, esta configuración de nodemon está diseñada para reiniciar automáticamente tu aplicación TypeScript cuando hay cambios en los archivos del directorio "src" con extensión ".ts"

#### **Qué es ts-node** ?

ts-node y tsc son herramientas relacionadas con TypeScript, pero sirven para propósitos diferentes:

##### ➔ **ts-node**:

**Propósito**: ts-node es un ejecutor de TypeScript que permite ejecutar scripts TypeScript directamente sin necesidad de compilarlos previamente a JavaScript.
Uso: Puedes ejecutar un archivo TypeScript directamente en la línea de comandos utilizando ts-node archivo.ts en lugar de tener que compilarlo primero con tsc y luego ejecutar el resultado.
Ventajas: Facilita el desarrollo y la ejecución de scripts TypeScript durante el desarrollo sin tener que preocuparte por el paso adicional de compilación.

##### ➔ **tsc (TypeScript Compiler)**:

**Propósito**: tsc es el compilador oficial de TypeScript. Convierte archivos TypeScript (.ts) en archivos JavaScript (.js).
Uso: Usualmente se ejecuta en la línea de comandos con el comando tsc seguido del nombre del archivo TypeScript que deseas compilar.
Ventajas: Permite generar archivos JavaScript que luego se pueden ejecutar en cualquier entorno que admita JavaScript.
