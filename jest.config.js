module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	testMatch: ['**/*.spec.js'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules'],
	collectCoverageFrom: [
		'src/**/*.{js,vue}',
		'!src/registerServiceWorker.js',
	],
};
