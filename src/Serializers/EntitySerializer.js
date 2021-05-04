( function( util ) {
	'use strict';

var PARENT = require( './Serializer.js' ),
	StrategyProvider = require( '../StrategyProvider.js' ),
	ItemSerializer = require( './ItemSerializer.js' ),
	PropertySerializer = require( './PropertySerializer.js' ),
	datamodel = require( 'wikibase.datamodel' );

/**
 * @class EntitySerializer
 * @extends Serializer
 * @since 2.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 */
module.exports = util.inherit( 'WbEntitySerializer', PARENT, function() {
	this._strategyProvider = new StrategyProvider();
	this._strategyProvider.registerStrategy(
		new ItemSerializer(), datamodel.Item.TYPE
	);
	this._strategyProvider.registerStrategy(
		new PropertySerializer(), datamodel.Property.TYPE
	);
}, {
	/**
	 * @property {StrategyProvider}
	 * @private
	 */
	_strategyProvider: null,

	/**
	 * @param {Serializer} serializer
	 * @param {string} entityType
	 */
	registerStrategy: function( serializer, entityType ) {
		this._strategyProvider.registerStrategy( serializer, entityType );
	},

	/**
	 * @inheritdoc
	 *
	 * @param {datamodel.Entity} entity
	 * @return {Object}
	 *
	 * @throws {Error} if entity is not an Entity instance.
	 */
	serialize: function( entity ) {
		if( !( entity instanceof datamodel.Entity ) ) {
			throw new Error( 'Not an instance of datamodel.Entity' );
		}

		return this._strategyProvider.getStrategyFor( entity.getType() ).serialize( entity );
	}
} );

}( util ) );
