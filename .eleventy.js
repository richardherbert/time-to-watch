module.exports = function( eleventyConfig ) {
	eleventyConfig.setQuietMode( true );
	eleventyConfig.setTemplateFormats( 'html,md' );

	eleventyConfig.addPassthroughCopy( './src/assets' );

	eleventyConfig.addFilter( 'dump', function( anything ) {
		console.log( 'dump:', anything );
	} );

	eleventyConfig.setBrowserSyncConfig( {
		ui: false
		,ghostMode: false
		,logLevel: 'silent'
	} );
};
