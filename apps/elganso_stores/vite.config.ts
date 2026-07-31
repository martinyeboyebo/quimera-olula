/// <reference types="vitest" />
/// <reference types="vite/client" />

import legacy from "@vitejs/plugin-legacy";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { mergeConfig } from "vite";
import config from "../../vite.config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legacyStylesPath = path.resolve(__dirname, "../../legacy/apps/elganso-stores/styles");
const legacyBaseMixinPath = path.resolve(__dirname, "../../legacy/libs/styles/_mixin.scss");

const configMerged = mergeConfig(config, {
    build: {
        target: 'es2015',
        cssCodeSplit: true,
        // Desactivar sourcemaps al 100% libera entre 1GB y 2GB de RAM
        sourcemap: false,
        // Desactivar el reporte de comprimido gzip al final ahorra un escaneo completo de memoria
        reportCompressedSize: false,
        rollupOptions: {
            // Reduce el consumo de memoria limitando hilos paralelos de Rollup
            maxParallelFileOps: 2
        }
    },
    server: {
        // true porque el túnel (cloudflared quick tunnel) cambia de subdominio en cada arranque
        allowedHosts: true
    },
    plugins: [
        // PRUEBA CLAVE: Si puedes comentar temporalmente 'legacy', hazlo para probar.
        // Si lo necesitas sí o sí, limita renderizado para evitar duplicar PWA/Assets:
        legacy({
            targets: ['chrome 44', 'edge 12', 'firefox 31', 'safari 9'],
            renderModernChunks: false, // Evita duplicar transformaciones si ya estás compilando moderno
            renderLegacyChunks: true, // Solo genera chunks legacy
            polyfills: true, // Incluye polyfills necesarios para navegadores legacy
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // Polyfill adicional si es necesario
        })
    ],
    resolve: {
        alias: {
            '#': '@olula/ctx',
            'use-db-state': new URL('./node_modules/use-db-state', import.meta.url).pathname,
            '@olula/lib': path.resolve(__dirname, '../../packages/lib/src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "${legacyBaseMixinPath}" as *;\n@use "${legacyStylesPath}/_clientMixin.scss" as *;`,
                loadPaths: [legacyStylesPath, path.dirname(legacyBaseMixinPath)]
            }
        }
    }
});

// El Service Worker de vite-plugin-pwa (registerSW.js) no pasa por el pipeline de @vitejs/plugin-legacy y usa sintaxis (arrow functions) que la WebView de Android 6 no puede parsear ("Uncaught SyntaxError: Unexpected token )"), además de dejar una promesa de registro sin resolver. Se excluye para esta app.
configMerged.plugins = (configMerged.plugins ?? [])
    .flat(Infinity)
    .filter((plugin: unknown) => !(plugin as { name?: string } | undefined)?.name?.startsWith("vite-plugin-pwa"));

export default configMerged;