( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	StatementListSerializer = require( './StatementListSerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class StatementGroupSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbStatementGroupSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.StatementGroup} statementGroup
	 * @return {Object}
	 *
	 * @throws {Error} if statementGroup is not a StatementGroup instance.
	 */
	serialize: function( statementGroup ) {
		if( !( statementGroup instanceof datamodel.StatementGroup ) ) {
			throw new Error( 'Not an instance of datamodel.StatementGroup' );
		}

		var statementListSerializer = new StatementListSerializer();

		return statementListSerializer.serialize( statementGroup.getItemContainer() );
	}
} );

}( util ) );
