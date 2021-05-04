( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	TermMapSerializer = require( './TermMapSerializer.js' ),
	MultiTermMapSerializer = require( './MultiTermMapSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class FingerprintSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbFingerprintSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.Fingerprint} fingerprint
	 * @return {Object}
	 *
	 * @throws {Error} if fingerprint is not a Fingerprint instance.
	 */
	serialize: function( fingerprint ) {
		if( !( fingerprint instanceof datamodel.Fingerprint ) ) {
			throw new Error( 'Not an instance of datamodel.Fingerprint' );
		}

		var termMapSerializer = new TermMapSerializer(),
			multiTermMapSerializer = new MultiTermMapSerializer();

		return {
			labels: termMapSerializer.serialize( fingerprint.getLabels() ),
			descriptions: termMapSerializer.serialize( fingerprint.getDescriptions() ),
			aliases: multiTermMapSerializer.serialize( fingerprint.getAliases() )
		};
	}
} );

}( util ) );
