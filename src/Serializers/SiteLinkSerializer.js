( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class wikibase.serialization.SiteLinkSerializer
 * @extends wikibase.serialization.Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbSiteLinkSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.SiteLink} siteLink
	 * @return {Object}
	 *
	 * @throws {Error} if siteLink is not a SiteLink instance.
	 */
	serialize: function( siteLink ) {
		if( !( siteLink instanceof datamodel.SiteLink ) ) {
			throw new Error( 'Not an instance of datamodel.SiteLink' );
		}

		return {
			site: siteLink.getSiteId(),
			title: siteLink.getPageName(),
			badges: siteLink.getBadges()
		};
	}
} );

}( util ) );
