/** @type {import('next').NextConfig} */
module.exports = {
	transpilePackages: ['@ab-labs/ui', '@ab-labs/server'],
	// images: {
	// 	domains: ['www.camara.leg.br'],
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.camara.leg.br',
				port: '',
				// pathname: '/internet/deputado/bandep/**',
				// https://www.camara.leg.br/internet/deputado/bandep/220593.jpg
			},
		],
	},
};
