/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/**
 * @fileOverview The "div" plugin. It wraps the selected block level elements with a 'div' element with specified styles and attributes.
 *
 */

(function() {
	CKEDITOR.plugins.add( 'par', {
		requires: 'dialog',
		lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%

				init: function( editor ) {
			if ( editor.blockless )
				return;

			var lang = editor.lang.par;
			
				allowed = 'p(*)';

			if ( CKEDITOR.dialog.isTabEnabled( editor, 'editpar', 'advanced' ) )
				allowed += ';p[dir,id,lang,title]{*}';

			editor.addCommand( 'createpar', new CKEDITOR.dialogCommand( 'createpar', {
				allowedContent: allowed,
				requiredContent: 'p',
				contextSensitive: true,
				refresh: function( editor, path ) {
					var context = editor.config.div_wrapTable ? path.root : path.blockLimit;
					this.setState( 'p' in context.getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
				}
			}));
			editor.addCommand( 'editpar', new CKEDITOR.dialogCommand( 'editpar' ), { requiredContent: 'p' } );
			editor.addCommand( 'removepar', {
				requiredContent: 'p',
				exec: function( editor ) {
					var selection = editor.getSelection(),
						ranges = selection && selection.getRanges(),
						range,
						bookmarks = selection.createBookmarks(),
						walker,
						toRemove = [];

					function findDiv( node ) {
						var par = CKEDITOR.plugins.par.getSurroundPar( editor, node );
						if ( par && !par.data( 'cke-div-added' ) ) {
							toRemove.push( par );
							par.data( 'cke-par-added' );
						}
					}

					for ( var i = 0; i < ranges.length; i++ ) {
						range = ranges[ i ];
						if ( range.collapsed )
							findDiv( selection.getStartElement() );
						else {
							walker = new CKEDITOR.dom.walker( range );
							walker.evaluator = findDiv;
							walker.lastForward();
						}
					}

					for ( i = 0; i < toRemove.length; i++ )
						toRemove[ i ].remove( true );

					selection.selectBookmarks( bookmarks );
				}
			});

			

			if ( editor.addMenuItems ) {
			editor.addMenuGroup( 'par' );
				editor.addMenuItems({
					editpar: {
						label: lang.edit,
						command: 'editpar',
						group: 'par',
						order: 2
					},
					removepar: {
						label: lang.remove,
						command: 'removepar',
						group: 'par',
						order: 8
					}
				});

				if ( editor.contextMenu ) {
					editor.contextMenu.addListener( function( element ) {
						if ( !element || element.isReadOnly() )
							return null;


						if ( CKEDITOR.plugins.par.getSurroundPar( editor ) ) {
							return {
								editpar: CKEDITOR.TRISTATE_OFF,
								removepar: CKEDITOR.TRISTATE_OFF
							};
						}

						return null;
					});
				}
			}

			CKEDITOR.dialog.add( 'createpar', this.path + 'dialogs/par.js' );
			CKEDITOR.dialog.add( 'editpar', this.path + 'dialogs/par.js' );
		}
	});

	CKEDITOR.plugins.par = {
		getSurroundPar: function( editor, start ) {
			var path = editor.elementPath( start );
			return editor.elementPath( path.block ).contains( 'p', 1 );
		}
	};
})();
