/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( $, wb, QUnit ) {
'use strict';

QUnit.module( 'wikibase.serialization.EntitySerializer' );

var datamodel = require( 'wikibase.datamodel' );

	var defaults = [
	{
		fingerprint: new datamodel.Fingerprint(
			new datamodel.TermMap( { en: new datamodel.Term( 'en', 'label' ) } ),
			new datamodel.TermMap( { en: new datamodel.Term( 'en', 'description' ) } ),
			new datamodel.MultiTermMap( { en: new datamodel.MultiTerm( 'en', [ 'alias' ] ) } )
		),
		statementGroupSet: new datamodel.StatementGroupSet( [
			new datamodel.StatementGroup( 'P1', new datamodel.StatementList( [
				new datamodel.Statement(
					new datamodel.Claim(
						new datamodel.PropertyNoValueSnak( 'P1' ), null, 'Q1$1'
					)
				)
			] ) )
		] )
	}, {
		fingerprint: {
			labels: { en: { language: 'en', value: 'label' } },
			descriptions: { en: { language: 'en', value: 'description' } },
			aliases: { en: [ { language: 'en', value: 'alias' } ] }
		},
		statementGroupSet: {
			P1: [ {
				id: 'Q1$1',
				mainsnak: {
					snaktype: 'novalue',
					property: 'P1'
				},
				type: 'statement',
				rank: 'normal'
			} ]
		}
	}
];

var testSets = [
	[
		new datamodel.Property(
			'P1',
			'string',
			defaults[0].fingerprint,
			defaults[0].statementGroupSet
		),
		$.extend( true, {}, defaults[1].fingerprint, {
			id: 'P1',
			type: 'property',
			datatype: 'string',
			claims: defaults[1].statementGroupSet
		} )
	]
];

QUnit.test( 'serialize()', function( assert ) {
	assert.expect( 2 );
	var propertySerializer = new wb.serialization.PropertySerializer();

	for( var i = 0; i < testSets.length; i++ ) {
		assert.deepEqual(
			propertySerializer.serialize( testSets[i][0] ),
			testSets[i][1],
			'Test set #' + i + ': Serializing successful.'
		);
	}

	assert.throws(
		function() {
			propertySerializer.serialize(
				new datamodel.Item(
					'Q1',
					defaults[0].fingerprint,
					defaults[0].statementGroupSet
				)
			);
		},
		'Throwing an error when trying to serialize an Entity not of type "property".'
	);
} );

}( jQuery, wikibase, QUnit ) );
