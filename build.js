import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['dropscript.js'],
  bundle: true,
  format:"cjs",
  minify: false,
  outfile: 'assets/out.js',
  platform: "browser",
  define: {
    'global': 'window', 
  },
})