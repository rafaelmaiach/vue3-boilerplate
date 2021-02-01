/* eslint-disable no-param-reassign */
const path = require('path');
const zlib = require('zlib');
const zopfli = require('@gfx/zopfli');
const CompressionPlugin = require('compression-webpack-plugin');

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

const compressionPlugins = [
	new CompressionPlugin({
		filename: '[path][base].gz',
		test: /\.(js|css|html|svg)$/,
		compressionOptions: {
			numiterations: 15,
		},
		algorithm(input, compressionOptions, callback) {
			return zopfli.gzip(input, compressionOptions, callback);
		},
		threshold: 10240,
		minRatio: 0.8,
	}),
	new CompressionPlugin({
		filename: '[path][base].br',
		algorithm: 'brotliCompress',
		test: /\.(js|css|html|svg)$/,
		compressionOptions: {
			params: {
				[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
			},
		},
		threshold: 10240,
		minRatio: 0.8,
	}),
];

module.exports = {
	lintOnSave: false,

	chainWebpack: (config) => {
		if (isProduction) {
			const vueTypesShimPath = path.resolve(__dirname, 'node_modules/vue-types/es/shim.js');
			config.resolve.alias.set('vue-types', vueTypesShimPath);
		}

		config
			.plugin('html')
			.tap((args) => {
				args[0].title = 'Vue 3 Boilerplate';
				return args;
			});
	},

	configureWebpack: {
		plugins: isProduction ? compressionPlugins : [],
	},

	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/styles/variables";
				`,
			},
		},
	},

	// pwa: {
	// 	name: 'Vue 3 Boilerplate',
	// 	workboxPluginMode: 'InjectManifest',
	// 	manifestPath: 'manifest.json',
	// 	iconPaths: {
	// 		appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
	// 		favicon16: 'img/icons/favicon-16x16.png',
	// 		favicon32: 'img/icons/favicon-32x32.png',
	// 		maskIcon: 'img/icons/safari-pinned-tab.svg',
	// 		msTileImage: 'img/icons/msapplication-icon-144x144.png',
	// 	},
	// 	workboxOptions: {
	// 		swSrc: 'src/registerServiceWorker.js',
	// 	},
	// },
};
