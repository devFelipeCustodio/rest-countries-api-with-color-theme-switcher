/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/countries',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
