/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@ab-labs/api', '@ab-labs/ui'],
	images: {
		remotePatterns: [
			{
				hostname: 'api.dicebear.com',
			},
		],
	},
};

export default nextConfig;
