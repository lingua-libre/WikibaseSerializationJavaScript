( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	StatementGroupSerializer = require( './StatementGroupSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class StatementGroupSetSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbStatementGroupSetSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.StatementGroupSet} statementGroupSet
	 * @return {Object}
	 *
	 * @throws {Error} if statementGroupSet is not a StatementGroupSet instance.
	 */
	serialize: function( statementGroupSet ) {
		if( !( statementGroupSet instanceof datamodel.StatementGroupSet ) ) {
			throw new Error( 'Not an instance of datamodel.StatementGroupSet' );
		}

		var serialization = {},
			propertyIds = statementGroupSet.getKeys(),
			statementGroupSerializer = new StatementGroupSerializer();

		for( var i = 0; i < propertyIds.length; i++ ) {
			serialization[propertyIds[i]] = statementGroupSerializer.serialize(
				statementGroupSet.getItemByKey( propertyIds[i] )
			);
		}

		return serialization;
	}
} );

}( util ) );
