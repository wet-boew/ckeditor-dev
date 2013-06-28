/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/**
 * @fileOverview The "show border" plugin. The command display visible outline
 * border line around all table elements if table doesn't have a none-zero 'border' attribute specified.
 */


(function() {
	CKEDITOR.plugins.add( 'span', {
	requires: 'richcombo',
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%

    init: function( editor ) {
	var config = editor.config,
				lang = editor.lang.span,
				styles = {},
				stylesList = [],
				combo;
		function loadStylesSet( callback ) {
				editor.getStylesSet( function( stylesDefinitions ) {
					if ( !stylesList.length ) {
						var style, styleName;

						// Put all styles into an Array.
						for ( var i = 0, count = stylesDefinitions.length; i < count; i++ ) {
							var styleDefinition = stylesDefinitions[ i ];

							if ( editor.blockless && ( styleDefinition.element in CKEDITOR.dtd.$block ) )
								continue;

							styleName = styleDefinition.name;

							style = styles[ styleName ] = new CKEDITOR.style( styleDefinition );
							style._name = styleName;
							style._.enterMode = config.enterMode;

							stylesList.push( style );
						}

						// Sorts the Array, so the styles get grouped by type.
						stylesList.sort( sortStyles );
					}

					callback && callback();
				});
			}
		editor.ui.addRichCombo( 'Span', {
				label: lang.label,
				title: lang.panelTitle,
				toolbar: 'styles,11',

				panel: {
					css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
					multiSelect: false,
					attributes: { 'aria-label': lang.panelTitle }
				},

				init: function() {
					combo = this;
						combo.add( 0, ['foo','bar','foo'], 'foofoo' );
						combo.add( 'moo', ['foo','bar','goo'], 'foogoo' );
						combo.commit();
				},

				onClick: function( value ) {
					editor.focus();
					editor.fire( 'saveSnapshot' );

					var style = styles[ value ],
						elementPath = editor.elementPath();

					editor[ style.checkActive( elementPath ) ? 'removeStyle' : 'applyStyle' ]( style );
					editor.fire( 'saveSnapshot' );
				},

				onRender: function() {
					editor.on( 'selectionChange', function( ev ) {
						var currentValue = this.getValue(),
							elementPath = ev.data.path,
							elements = elementPath.elements;

						// For each element into the elements path.
						for ( var i = 0, count = elements.length, element; i < count; i++ ) {
							element = elements[ i ];

							// Check if the element is removable by any of
							// the styles.
							for ( var value in styles ) {
								if ( styles[ value ].checkElementRemovable( element, true ) ) {
									if ( value != currentValue )
										this.setValue( value );
									return;
								}
							}
						}

						// If no styles match, just empty it.
						this.setValue( '' );
					}, this );
				},
			
			
				onOpen: function() {
					var selection = editor.getSelection(),
						element = selection.getSelectedElement(),
						elementPath = editor.elementPath( element ),
						counter = [ 0, 0, 0, 0 ];
						//alert(editor.elementPath( element ));
				// Our starting and ending points of the range might be inside some blocks under a list item...
				// So before playing with the iterator, we need to expand the block to include the list items.
				var startContainer = range.startContainer,
					endContainer = range.endContainer;
				while ( startContainer && !startContainer.getParent().equals( listNode ) )
					startContainer = startContainer.getParent();
				while ( endContainer && !endContainer.getParent().equals( listNode ) )
					endContainer = endContainer.getParent();

				if ( !startContainer || !endContainer )
					return;

				// Now we can iterate over the individual items on the same tree depth.
				var block = startContainer,
					itemsToMove = [],
					stopFlag = false;
				while ( !stopFlag ) {
					if ( block.equals( endContainer ) )
						stopFlag = true;
					itemsToMove.push( block );
					block = block.getNext();
				}
				if ( itemsToMove.length < 1 )
					return;
					this.showAll();
					this.unmarkAll();
					for ( var name in styles ) {
						var style = styles[ name ],
							type = style.type;

						// Check if block styles are applicable.
						if ( type == CKEDITOR.STYLE_BLOCK && !elementPath.isContextFor( style.element ) ) {
							this.hideItem( name );
							continue;
						}

						if ( style.checkActive( elementPath ) )
							this.mark( name );
						else if ( type == CKEDITOR.STYLE_OBJECT && !style.checkApplicable( elementPath ) ) {
							this.hideItem( name );
							counter[ type ]--;
						}

						counter[ type ]++;
					}

					if ( !counter[ CKEDITOR.STYLE_BLOCK ] )
						this.hideGroup( lang[ 'panelTitle' + String( CKEDITOR.STYLE_BLOCK ) ] );

					if ( !counter[ CKEDITOR.STYLE_INLINE ] )
						this.hideGroup( lang[ 'panelTitle' + String( CKEDITOR.STYLE_INLINE ) ] );

					if ( !counter[ CKEDITOR.STYLE_OBJECT ] )
						this.hideGroup( lang[ 'panelTitle' + String( CKEDITOR.STYLE_OBJECT ) ] );
				},

				// Force a reload of the data
				reset: function() {
					if ( combo ) {
						delete combo._.panel;
						delete combo._.list;
						combo._.committed = 0;
						combo._.items = {};
						combo._.state = CKEDITOR.TRISTATE_OFF;
					}
					styles = {};
					stylesList = [];
					loadStylesSet();
				}
			});
    }
});
function sortStyles( styleA, styleB ) {
		var typeA = styleA.type,
			typeB = styleB.type;

		return typeA == typeB ? 0 : typeA == CKEDITOR.STYLE_OBJECT ? -1 : typeB == CKEDITOR.STYLE_OBJECT ? 1 : typeB == CKEDITOR.STYLE_BLOCK ? 1 : -1;
	}
})();
/**
 * Whether to automatically enable the "show borders" command when the editor loads.
 *
 *		config.startupShowBorders = false;
 *
 * @cfg {Boolean} [startupShowBorders=true]
 * @member CKEDITOR.config
 */
