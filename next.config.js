/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
            '**/*': ['./outstatic/**/*']
        }
    }
};

module.exports = nextConfig;
