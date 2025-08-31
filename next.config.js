const path = require('path')
const {i18n} = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    modularizeImports: {
        '@mui/icons-material': {
            transform: '/@mui/icons-material/{{member}}'
        }
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
            },
        ],
    },
    compiler: {
        styledComponents: true
    },
}

module.exports = nextConfig
