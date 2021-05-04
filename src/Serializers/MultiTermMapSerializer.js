( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	MultiTermSerializer = require( './MultiTermSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class MultiTermMapSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbMultiTermMapSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.MultiTermMap} multiTermMap
	 * @return {Object}
	 *
	 * @throws {Error} if multiTermMap is not a MultiTermMap instance.
	 */
	serialize: function( multiTermMap ) {
		if( !( multiTermMap instanceof datamodel.MultiTermMap ) ) {
			throw new Error( 'Not an instance of datamodel.MultiTermMap' );
		}

		var serialization = {},
			multiTermSerializer = new MultiTermSerializer(),
			languageCodes = multiTermMap.getKeys();

		for( var i = 0; i < languageCodes.length; i++ ) {
			serialization[languageCodes[i]] = multiTermSerializer.serialize(
				multiTermMap.getItemByKey( languageCodes[i] )
			);
		}

		return serialization;
	}
} );

}( util ) );
