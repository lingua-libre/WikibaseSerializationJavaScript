( function( util, $ ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	FingerprintSerializer = require( './FingerprintSerializer.js' ),
	StatementGroupSetSerializer = require( './StatementGroupSetSerializer.js' ),
	SiteLinkSetSerializer = require( './SiteLinkSetSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class ItemSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbItemSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.Item} item
	 * @return {Object}
	 *
	 * @throws {Error} if item is not an Item instance.
	 */
	serialize: function( item ) {
		if( !( item instanceof datamodel.Item ) ) {
			throw new Error( 'Not an instance of datamodel.Item' );
		}

		var fingerprintSerializer = new FingerprintSerializer(),
			statementGroupSetSerializer = new StatementGroupSetSerializer(),
			siteLinkSetSerializer = new SiteLinkSetSerializer();

		return $.extend( true,
			{
				type: item.getType(),
				id: item.getId(),
				claims: statementGroupSetSerializer.serialize( item.getStatements() ),
				sitelinks: siteLinkSetSerializer.serialize( item.getSiteLinks() )
			},
			fingerprintSerializer.serialize( item.getFingerprint() )
		);
	}
} );

}( util, jQuery ) );
