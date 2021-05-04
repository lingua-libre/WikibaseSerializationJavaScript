( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class MultiTermSerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbMultiTermSerializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.MultiTerm} multiTerm
	 * @return {Object[]}
	 *
	 * @throws {Error} if multiTerm is not a MultiTerm instance.
	 */
	serialize: function( multiTerm ) {
		if( !( multiTerm instanceof datamodel.MultiTerm ) ) {
			throw new Error( 'Not an instance of datamodel.MultiTerm' );
		}

		var serialization = [],
			languageCode = multiTerm.getLanguageCode(),
			texts = multiTerm.getTexts();

		for( var i = 0; i < texts.length; i++ ) {
			serialization.push( {
				language: languageCode,
				value: texts[i]
			} );
		}

		return serialization;
	}
} );

}( util ) );
