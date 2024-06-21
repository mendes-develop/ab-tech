/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@repo/api', '@repo/ui'],
	images: {
		remotePatterns: [
			{
				hostname: 'api.dicebear.com',
			},
		],
	},
};

export default nextConfig;
