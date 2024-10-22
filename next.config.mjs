/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'utfs.io',
              port: ''
            },
            {
                protocol:'https',
                hostname:'img.clerk.com',
                port:''
            },
            {
                protocol:'https',
                hostname:'api.dicebear.com',
                port:''
            }
        ]
    }
};

export default nextConfig;
