import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const API_KEY = 'AAztAHKI9cUnlVHzxDqtY1g43aLr4FyrJJkGAbhQTBmDfm94';
// const API_BASE_URL = 'https://34.128.145.217.nip.io/bnb_auth_v1/api';
// const API_BASE_URL = 'http://192.168.2.10:8306/api'
const API_BASE_URL = '/api'
// const API_BASE_URL = 'https://34.128.145.217.nip.io/bnb_v1/api';

const SERVER1 = 'http://192.168.2.10:8306/api'  // for local development Lan server
const SERVER2 = 'https://34.128.145.217.nip.io/bnb_v1/api' // for production without apikey
const SERVER3 = 'https://34.128.145.217.nip.io/bnb_auth_v1/api' // for production with apikey


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: SERVER3,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }})
