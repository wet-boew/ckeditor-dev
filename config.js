/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	 //config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	 config.indentClasses = ['indent-small', 'indent-medium', 'indent-large'];
	 config.spanClasses = ['span-2', 'span-3', 'span-4', 'span-5'];
	 config.blockcLookupList = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5'];
               config.startupShowBorders = true;
			   config.contentsCss = ['/wet-boew/theme-gcwu-fegc/css/theme-min.css','/wet-boew/grids/css/util-min.css'];
			   config.disableNativeSpellChecker = false;
            //   config.stylesSet = [];
	config.plugins =
		'a11yhelp,' +
		'basicstyles,' +
		'bidi,' +
		'blockquote,' +
		'clipboard,' +
		'contextmenu,' +
		'div,' +
		'elementspath,' +
		'enterkey,' +
		'entities,' +
		'find,' +
		'floatingspace,' +
		'format,' +
		'htmlwriter,' +
		'image,' +
		'indent,' +
		'justify,' +
		'link,' +
		'list,' +
		'liststyle,' +
		'magicline,' +
		'maximize,' +
		'newpage,' +
		'pagebreak,' +
		'pastefromword,' +
		'pastetext,' +
		'preview,' +
		'print,' +
		'removeformat,' +
		'resize,' +
		'save,' +
		'selectall,' +
		'showblocks,' +
		'showborders,' +
		'sourcearea,' +
		'specialchar,' +
		'stylescombo,' +
		'span,' +
		'tab,' +
		'table,' +
		'tabletools,' +
		'templates,' +
		'toolbar,' +
		'undo,' +
		'wysiwygarea';
	// %REMOVE_END%
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
