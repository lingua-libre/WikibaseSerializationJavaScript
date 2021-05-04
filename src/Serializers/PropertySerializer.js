( function( util, $ ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	FingerprintSerializer = require( './FingerprintSerializer.js' ),
	StatementGroupSetSerializer = require( './StatementGroupSetSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class PropertySerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbPropertySerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.Property} property
	 * @return {Object}
	 *
	 * @throws {Error} if property is not a Property instance.
	 */
	serialize: function( property ) {
		if( !( property instanceof datamodel.Property ) ) {
			throw new Error( 'Not an instance of datamodel.Property' );
		}

		var fingerprintSerializer = new FingerprintSerializer(),
			statementGroupSetSerializer = new StatementGroupSetSerializer();

		return $.extend( true,
			{
				type: property.getType(),
				id: property.getId(),
				claims: statementGroupSetSerializer.serialize( property.getStatements() ),
				datatype: property.getDataTypeId()
			},
			fingerprintSerializer.serialize( property.getFingerprint() )
		);
	}
} );

}( util, jQuery ) );
