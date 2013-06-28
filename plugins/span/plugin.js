/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */
/**
 * @fileOverview Increse and decrease indent commands.
 */

(function() {
	var listNodeNames = { ol:1,ul:1 },
		isNotWhitespaces = CKEDITOR.dom.walker.whitespaces( true ),
		isNotBookmark = CKEDITOR.dom.walker.bookmark( false, true );
	
	function indentCommand( editor, name ) {
		this.name = name;
		this.useIndentClasses = editor.config.spanClasses && editor.config.spanClasses.length > 0;
		if ( this.useIndentClasses ) {
			this.classNameRegex = new RegExp( '(?:^|\\s+)(' + editor.config.spanClasses.join( '|' ) + ')(?=$|\\s)' );
			this.indentClassMap = {};
			for ( var i = 0; i < editor.config.spanClasses.length; i++ )
				this.indentClassMap[ editor.config.spanClasses[ i ] ] = i + 1;
		}

		this.startDisabled = name == 'sp_outdent';
	}

	// Returns the CSS property to be used for identing a given element.
	function getIndentCssProperty( element, dir ) {
		return ( dir || element.getComputedStyle( 'direction' ) ) == 'ltr' ? 'margin-left' : 'margin-right';
	}

	function isListItem( node ) {
		return node.type == CKEDITOR.NODE_ELEMENT && node.is( 'li' );
	}

	indentCommand.prototype = {
		// It applies to a "block-like" context.
		context: 'div',
		refresh: function( editor, path ) {
			var list = path && path.contains( listNodeNames ),
				firstBlock = CKEDITOR.plugins.span.getSurroundDiv( editor );
				
			if ( list )
				this.setState( CKEDITOR.TRISTATE_OFF );

			else if ( !this.useIndentClasses && this.name == 'sp_indent' )
				this.setState( CKEDITOR.TRISTATE_OFF );

			else if ( !firstBlock )
				this.setState( CKEDITOR.TRISTATE_DISABLED );

			else if ( this.useIndentClasses ) {
				var indentClass = firstBlock.$.className.match( this.classNameRegex ),
					indentStep = 0;

				if ( indentClass ) {
					indentClass = indentClass[ 1 ];
					indentStep = this.indentClassMap[ indentClass ];
				}

				if ( ( this.name == 'sp_outdent' && !indentStep ) || ( this.name == 'sp_indent' && indentStep == editor.config.spanClasses.length ) )
					this.setState( CKEDITOR.TRISTATE_DISABLED );
				else
					this.setState( CKEDITOR.TRISTATE_OFF );
			} else {
				var indent = parseInt( firstBlock.getStyle( getIndentCssProperty( firstBlock ) ), 10 );
				if ( isNaN( indent ) )
					indent = 0;
				if ( indent <= 0 )
					this.setState( CKEDITOR.TRISTATE_DISABLED );
				else
					this.setState( CKEDITOR.TRISTATE_OFF );
			}
		},
		exec: function( editor ) {
			var self = this,
				database = {};
			

			function indentBlock() {
			var myelement = CKEDITOR.plugins.span.getSurroundDiv( editor );
			//alert(myelement.getName());
			 //range.endPath().contains('div','true','false');
			 indentElement( myelement);
			/*	var iterator = range.createIterator(),
					enterMode = editor.config.enterMode;
				iterator.enforceRealBlocks = true;
				iterator.enlargeBr = enterMode != CKEDITOR.ENTER_BR;
				var block;
				while ( ( block = iterator.getNextParagraph( 'div' ) ) ){
					indentElement( block );
					}*/
				
			}

			function indentElement( element, dir ) {
				if ( element.getCustomData( 'indent_processed' ) )
					return false;

				if ( self.useIndentClasses ) {
					// Transform current class name to indent step index.
					var indentClass = element.$.className.match( self.classNameRegex ),
						indentStep = 0;
					if ( indentClass ) {
						indentClass = indentClass[ 1 ];
						indentStep = self.indentClassMap[ indentClass ];
					}

					// Operate on indent step index, transform indent step index back to class
					// name.
					if ( self.name == 'sp_outdent' ){
						indentStep--;;
						}
					else{
						indentStep++;
						}
							
					if ( indentStep < 0 )
						return false;

					indentStep = Math.min( indentStep, editor.config.spanClasses.length );
					indentStep = Math.max( indentStep, 0 );
					element.$.className = CKEDITOR.tools.ltrim( element.$.className.replace( self.classNameRegex, '' ) );
					if ( indentStep > 0 )
						element.addClass( editor.config.spanClasses[ indentStep - 1 ] );
				} else {
					var indentCssProperty = getIndentCssProperty( element, dir ),
						currentOffset = parseInt( element.getStyle( indentCssProperty ), 10 );
					if ( isNaN( currentOffset ) )
						currentOffset = 0;
					var indentOffset = editor.config.indentOffset || 40;
					currentOffset += ( self.name == 'sp_indent' ? 1 : -1 ) * indentOffset;

					if ( currentOffset < 0 )
						return false;

					currentOffset = Math.max( currentOffset, 0 );
					currentOffset = Math.ceil( currentOffset / indentOffset ) * indentOffset;
					element.setStyle( indentCssProperty, currentOffset ? currentOffset + ( editor.config.indentUnit || 'px' ) : '' );
					if ( element.getAttribute( 'style' ) === '' )
						element.removeAttribute( 'style' );
				}

				CKEDITOR.dom.element.setMarker( database, element, 'indent_processed', 1 );
				return true;
			}

			var selection = editor.getSelection(),
				bookmarks = selection.createBookmarks( 1 ),
				ranges = selection && selection.getRanges( 1 ),
				range;


			var iterator = ranges.createIterator();
			while ( ( range = iterator.getNextRange() ) ) {
				var rangeRoot = range.getCommonAncestor(),
					nearestListBlock = rangeRoot;

					indentBlock();
			}

			// Clean up the markers.
			CKEDITOR.dom.element.clearAllMarkers( database );

			editor.forceNextSelectionCheck();
			selection.selectBookmarks( bookmarks );
		}
	};

	CKEDITOR.plugins.add( 'span', {
		// TODO: Remove this dependency.
		requires: 'list',
		lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%
		icons: 'sp_indent,sp_indent-rtl,sp_outdent,sp_outdent-rtl', // %REMOVE_LINE_CORE%
		onLoad: function() {
			// [IE6/7] Raw lists are using margin instead of padding for visual indentation in wysiwyg mode. (#3893)
			if ( CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ) {
				CKEDITOR.addCss( ".cke_editable ul," +
					".cke_editable ol" +
					"{" +
					"	margin-left: 0px;" +
					"	padding-left: 40px;" +
					"}" );
			}
		},
		init: function( editor ) {
			if ( editor.blockless )
				return;

			// Register commands.
			var sp_indent = editor.addCommand( 'sp_indent', new indentCommand( editor, 'sp_indent' ) ),
				sp_outdent = editor.addCommand( 'sp_outdent', new indentCommand( editor, 'sp_outdent' ) );
			if ( editor.ui.addButton ) {
				// Register the toolbar buttons.
				editor.ui.addButton( 'SP_Indent', {
					label: editor.lang.span.sp_indent,
					command: 'sp_indent',
					directional: true,
					toolbar: 'span,25'
				});
				editor.ui.addButton( 'SP_Outdent', {
					label: editor.lang.span.sp_outdent,
					command: 'sp_outdent',
					directional: true,
					toolbar: 'span,15'
				});
			}

			// Register dirChanged listener.
			editor.on( 'dirChanged', function( e ) {
				var range = editor.createRange();
				range.setStartBefore( e.data.node );
				range.setEndAfter( e.data.node );

				var walker = new CKEDITOR.dom.walker( range ),
					node;

				while ( ( node = walker.next() ) ) {
					if ( node.type == CKEDITOR.NODE_ELEMENT ) {
						// A child with the defined dir is to be ignored.
						if ( !node.equals( e.data.node ) && node.getDirection() ) {
							range.setStartAfter( node );
							walker = new CKEDITOR.dom.walker( range );
							continue;
						}

						// Switch alignment classes.
						var classes = editor.config.spanClasses;
						if ( classes ) {
							var suffix = ( e.data.dir == 'ltr' ) ? [ '_rtl', '' ] : [ '', '_rtl' ];
							for ( var i = 0; i < classes.length; i++ ) {
								if ( node.hasClass( classes[ i ] + suffix[ 0 ] ) ) {
									node.removeClass( classes[ i ] + suffix[ 0 ] );
									node.addClass( classes[ i ] + suffix[ 1 ] );
								}
							}
						}

						// Switch the margins.
						var marginLeft = node.getStyle( 'margin-right' ),
							marginRight = node.getStyle( 'margin-left' );

						marginLeft ? node.setStyle( 'margin-left', marginLeft ) : node.removeStyle( 'margin-left' );
						marginRight ? node.setStyle( 'margin-right', marginRight ) : node.removeStyle( 'margin-right' );
					}
				}
			});
		}
	});
	CKEDITOR.plugins.span = {
		getSurroundDiv: function( editor, start ) {
			var path = editor.elementPath( start );
			if(path.blockLimit.getAscendant( 'table', true )!=null){
			return editor.elementPath( path.blockLimit ).contains( 'table', 1 );
			}else{return editor.elementPath( path.blockLimit ).contains( 'div', 1 );}
		}
	};
})();

/**
 * Size of each indentation step.
 *
 *		config.indentOffset = 4;
 *
 * @cfg {Number} [indentOffset=40]
 * @member CKEDITOR.config
 */

/**
 * Unit for the indentation style.
 *
 *		config.indentUnit = 'em';
 *
 * @cfg {String} [indentUnit='px']
 * @member CKEDITOR.config
 */

/**
 * List of classes to use for indenting the contents. If it's `null`, no classes will be used
 * and instead the {@link #indentUnit} and {@link #indentOffset} properties will be used.
 *
 *		// Use the classes 'Indent1', 'Indent2', 'Indent3'
 *		config.indentClasses = ['Indent1', 'Indent2', 'Indent3'];
 *
 * @cfg {Array} [indentClasses=null]
 * @member CKEDITOR.config
 */
