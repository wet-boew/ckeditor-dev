/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	 config.language = 'en';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	//config.fullPage = true;
	 config.height = '500px';
	 config.width = '100%';
	 config.allowedContent= 'a abbr address area article aside audio b bdi bdo blockquote br button caption canvas cite code data datalist del details dfn dialog div dl em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr i img input ins kbd keygen label li main map mark math menu meter nav noscript object ol output p pre progress q ruby s samp script section select small span strong sub style sup svg table tbody tr td th textarea time ul var video wbr [accesskey,class,contenteditable,contextmenu,dir,draggable,dropzone,hidden,id,inert,itemid,itemprop,itemref,itemscope,itemtype,lang,spellcheck,tabindex,title,translate](*);img[!alt,!src]{width,height};a[href,name,target,download,ping,rel,hreflang,type ];table[summary];td[scope, headers];th[scope]';
	 config.indentClasses = ['indent-small', 'indent-medium', 'indent-large'];
	 config.spanClasses = ['span-1','span-2', 'span-3', 'span-4', 'span-5','span-6'];
	 config.blockcLookupList = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5'];
     config.startupShowBorders = true;
	 config.contentsCss = ['http://www.cra-arc.gc.ca/wet-boew/theme-gcwu-fegc/css/theme-min.css','http://www.cra-arc.gc.ca/wet-boew/grids/css/util-min.css'];
	 config.disableNativeSpellChecker = false;
	 config.linkShowTargetTab = false;
	 config.justifyClasses = [ 'align-left', 'align-center', 'align-right', 'align-justify' ];
	 config.bodyClass = 'contents';
	 config.entities = false;
	 //config.entities_processNumerical = 'force'; 
     //   config.stylesSet = [];
	 config.removePlugins = 'tableresize';
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
		//'newpage,' +
		'pagebreak,' +
		'par,' +
		'pastefromword,' +
		'pastetext,' +
		'removeformat,' +
		'resize,' +
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
