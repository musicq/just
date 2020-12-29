import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'

const input = './src/index.ts'
const external = ['react', 'react-dom']

const config = {
  input,
  output: [
    {
      file: './dist/main.development.js',
      format: 'es',
      sourcemap: true
    }
  ],
  external,
  plugins: [
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

export default config
