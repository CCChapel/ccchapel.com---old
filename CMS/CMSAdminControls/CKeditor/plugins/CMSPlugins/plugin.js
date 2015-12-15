﻿var CMSPlugin={window:this.window,requires:["iframedialog","fakeobjects"],currentEditor:null,lang:["en"],regNumber:/^\d+(?:\.\d+)?$/,regFlashFilename:/\.swf(?:$|\?)/i,selection:null,selectedElement:null,selectionBookmarks:null,cssifyLength:function(a){return CMSPlugin.regNumber.test(a)?a+"px":a},createFakeControl:function(a,b){if(null!==a){var c=null,e=(c=a.attributes.type)?c.toLowerCase():"unknown",d;switch(e){case "youtubevideo":c=b.createFakeParserElement(a,"cke_youtube","object",!0);c.attributes.cms_youtube=
"true";c.attributes.cms_disable_media="true";break;case "flash":case "media":c="flash"===this.getMediaType(a,b)||"flash"===e?b.createFakeParserElement(a,"cke_flash","object",!0):b.createFakeParserElement(a,"cke_media","object",!0);c.attributes.cms_media="true";break;case "mediafilecontrol":c=b.createFakeParserElement(a,"cke_old_media","object",!0);c.attributes.cms_media="true";break;case "image":if(!(a.attributes.width&&0<parseInt(a.attributes.width,10)&&a.attributes.height&&0<parseInt(a.attributes.height,
10))&&(d=this.getElementObject(a)))if((!a.attributes.width||0>=parseInt(a.attributes.width,10))&&(!a.attributes.height||0>=parseInt(a.attributes.height,10)))a.attributes.width=d.originalwidth,a.attributes.height=d.originalheight;else if(!a.attributes.height||0>=parseInt(a.attributes.height,10))a.attributes.height=Math.round(a.attributes.width/(parseFloat(d.originalwidth)/d.originalheight));else if(!a.attributes.width||0>=parseInt(a.attributes.width,10))a.attributes.width=Math.round(a.attributes.height/
(parseFloat(d.originalheight)/d.originalwidth));c=b.createFakeParserElement(a,"cke_image","object",!0);c.attributes.cms_media="true";var f=this.getImageUrl(a,b);f&&(c.attributes.src=f);break;case "widget":d=this.getElementObject(a);c=b.createFakeParserElement(a,"cke_widget","object",!0);c.attributes.cms_disable_media="true";c.attributes.cke_widget="true";d.image_guid&&(f=c.attributes.style||"",c.attributes.style=f+"background-image:url("+b.config.ApplicationPath+"CMSPages/GetMetaFile.aspx?fileguid\x3d"+
d.image_guid+"\x26maxsidesize\x3d32);");d.widget_displayname&&(c.attributes.title=d.widget_displayname.replace(/\+/g," "));break;default:c=b.createFakeParserElement(a,"cke_inlinecontrol","object",!1),c.attributes.cms_disable_media="true"}c.attributes.cms_inline="true";c.attributes.alt="";f=c.attributes.style||"";d=a.attributes.width;var g=a.attributes.height;"widget"!=e&&(c.attributes.title="","undefined"!=typeof d&&(f=c.attributes.style=f+"width:"+this.cssifyLength(d)+";"),"undefined"!=typeof g&&
(c.attributes.style=f+"height:"+this.cssifyLength(g)+";"));return c}return null},getNodeList:function(a){return new CKEDITOR.dom.nodeList(a)},getElementObject:function(a){var b={},c,e;if(a){var d;if(a._)for(d=0;d<a.children.length;d++)c=a.children[d].attributes.name,e=a.children[d].attributes.value,b[c]=e;else for(d=0;d<a.children.length;d++)c=a.children[d].getAttribute("name"),e=a.children[d].getAttribute("value"),b[c]=e}return b},getCurrentEditor:function(){return null!==this.currentEditor?this.currentEditor:
null!==CKEDITOR.currentInstance?CKEDITOR.currentInstance:null},getImageUrl:function(a,b){b=b||this.getCurrentEditor();var c=null,e=CMSPlugin.getElementObject(a);e.url&&(c=e.url,0===c.indexOf("~/")&&(c=c.replace("~/",b.config.ApplicationPath)));return c},getMediaType:function(a){var b=this.getElementObject(a);return b.cms_type?b.cms_type.toLowerCase():b.ext&&".swf"===b.ext.toLowerCase()||CMSPlugin.isFlashEmbed(a)?"flash":"audiovideo"},isFlashEmbed:function(a){a=a.attributes;return"application/x-shockwave-flash"==
a.type||"flash"==a.type||CMSPlugin.regFlashFilename.test(a.src||"")},initCss:function(a){CKEDITOR.addCss("img.cke_inlinecontrol { background-image: url("+CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/CMSInline_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;}");CKEDITOR.addCss("img.cke_youtube { background-image: url("+CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/InsertYouTube_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;}");
CKEDITOR.addCss("img.cke_media { background-image: url("+CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/InsertImageOrMedia_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;}");CKEDITOR.addCss("img.cke_flash { background-image: url("+CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/InsertFlash_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;}");CKEDITOR.addCss("img.cke_widget { background-image: url("+
CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/InsertWidget_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;width: 32px;height: 32px;}");CKEDITOR.addCss("img.cke_old_media { background-image: url("+CKEDITOR.getUrl(a.config.CMSPluginUrl+"images/InsertImageOrMediaOld_bg.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #CCC;width: 80px;height: 80px;}")},openWidget:function(a,b,c,e,d){this.currentEditor=
a;var f=a.getSelection().getSelectedElement();b=a.config.IsLiveSite?a.config.ApplicationPath+"CMSModules/Widgets/LiveDialogs/"+b:a.config.ApplicationPath+"CMSModules/Widgets/Dialogs/"+b;f&&f.hasAttribute("cms_inline")&&(f=a.restoreRealElement(f),f=this.getInline(f.$),"widget"!==f.cms_type||null!==c&&c!==f.name||(b=a.config.IsLiveSite?a.config.ApplicationPath+"CMSModules/Widgets/LiveDialogs/WidgetProperties.aspx?inline\x3dtrue":a.config.ApplicationPath+"CMSModules/Widgets/Dialogs/WidgetProperties.aspx?inline\x3dtrue",
e=900,d=650));a.config.CurrentGroupID&&(b+="\x26groupid\x3d"+a.config.CurrentGroupID);CMSPlugin.openModalDialog(b,c,e,d)},pluginInsertForms:function(a){a.ui.addButton("InsertForms",{label:a.lang.CMSPlugins.InsertForms.button,command:"InsertForms",icon:a.config.CMSPluginUrl+"images/InsertForms.png"});a.addCommand("InsertForms",{exec:function(a){CMSPlugin.openWidget(a,"WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetname\x3dBizForm","BizForm","900","600")}})},pluginInsertMacro:function(a){var b=
"";a.config.ResolverName&&(b="resolver\x3d"+a.config.ResolverName);a.config.CurrentDocumentID&&(b&&(b+="\x26"),b+="documentid\x3d"+a.config.CurrentDocumentID);a.config.CurrentCulture&&(b&&(b+="\x26"),b+="culture\x3d"+a.config.CurrentCulture);a.ui.addButton("InsertMacro",{label:a.lang.CMSPlugins.InsertMacro.button,command:"InsertMacro",icon:a.config.CMSPluginUrl+"images/InsertMacro.png"});a.addCommand("InsertMacro",{exec:function(a){CMSPlugin.currentEditor=a;CMSPlugin.openModalDialog(a.config.ApplicationPath+
"CMSAdminControls/UI/Macros/Dialogs/Default.aspx?"+b,"insertMacro",1024,660)}})},pluginInsertPolls:function(a){a.ui.addButton("InsertPolls",{label:a.lang.CMSPlugins.InsertPolls.button,command:"InsertPolls",icon:a.config.CMSPluginUrl+"images/InsertPolls.png"});a.addCommand("InsertPolls",{exec:function(a){CMSPlugin.openWidget(a,"WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetname\x3dPoll","Poll","900","660")}})},pluginInsertGroupPolls:function(a){a.ui.addButton("InsertGroupPolls",{label:a.lang.CMSPlugins.InsertGroupPolls.button,
command:"InsertGroupPolls",icon:a.config.CMSPluginUrl+"images/InsertGroupPolls.png"});a.addCommand("InsertGroupPolls",{exec:function(a){CMSPlugin.openWidget(a,"WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetname\x3dGroupPoll","GroupPoll","900","660")}})},pluginInsertRating:function(a){a.ui.addButton("InsertRating",{label:a.lang.CMSPlugins.InsertRating.button,command:"InsertRating",icon:a.config.CMSPluginUrl+"images/InsertRating.png"});a.addCommand("InsertRating",{exec:function(a){CMSPlugin.openWidget(a,
"WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetname\x3dContentRating_1","ContentRating_1","715","550")}})},pluginKeyPress:function(a){var b=!1,c=!1,e=!1;a.on("instanceReady",function(a){var f=function(a){a=a.data;a.key=a.getKey();a.ctrlKey=b;a.altKey=c;a.shiftKey=e;return a},g=function(a){var d=a.data.$.keyCode;17===d?b=!0:16===d?e=!0:18===d?c=!0:(a=f(a),a.ctrlKey&&a.altKey||k(a))},h=function(a){var d=a.data.$.keyCode;17===d?b=!1:16===d?e=!1:18===d?c=!1:(a=f(a),a.ctrlKey&&a.altKey&&
k(a))},k=function(a){if(!window.disableShortcuts){if(window.HtmlEditor)return window.HtmlEditor.keyPressed(a);if(null!==window.parent&&window.parent.HtmlEditor)return window.parent.HtmlEditor.keyPressed(a)}return!0};a.editor.document.on("keydown",g);a.editor.document.on("keyup",h);a.editor.on("mode",function(a){a=a.editor;"source"!=a.mode&&(a.document.on("keydown",g),a.document.on("keyup",h))})})},pluginInsertYouTube:function(a){var b={label:a.lang.CMSPlugins.InsertYouTubeVideo.button,command:"InsertYouTubeVideo",
icon:a.config.CMSPluginUrl+"images/InsertYouTubeVideo.png"},c={youtube:{label:a.lang.CMSPlugins.InsertYouTubeVideo.menu,command:"InsertYouTubeVideo",group:"InsertYouTubeVideo",icon:a.config.CMSPluginUrl+"images/InsertYouTubeVideo.png"}};a.addCommand("InsertYouTubeVideo",{exec:function(a){CMSPlugin.currentEditor=a;CMSPlugin.openModalDialog(a.config.IsLiveSite?a.config.ApplicationPath+"CMSFormControls/LiveSelectors/InsertYouTubeVideo/Default.aspx":a.config.ApplicationPath+"CMSFormControls/Selectors/InsertYouTubeVideo/Default.aspx",
"youtube",1024,660)}});a.ui.addButton("InsertYouTubeVideo",b);a.on("doubleclick",function(a){var b=a.data.element;b.is("img")&&"true"==b.getAttribute("cms_youtube")&&a.editor.execCommand("InsertYouTubeVideo")});a.addMenuItems&&(a.addMenuGroup("InsertYouTubeVideo"),a.addMenuItems(c));a.contextMenu&&a.contextMenu.addListener(function(a){if(a&&a.is("img")&&"true"==a.getAttribute("cms_youtube"))return{youtube:CKEDITOR.TRISTATE_OFF}})},pluginInsertWidget:function(a){var b={label:a.lang.CMSPlugins.InsertWidget.button,
command:"InsertWidget",icon:a.config.CMSPluginUrl+"images/InsertWidget.png"},c={widget:{label:a.lang.CMSPlugins.InsertWidget.menu,command:"InsertWidget",group:"InsertWidget",icon:a.config.CMSPluginUrl+"images/InsertWidget.png"}};a.addCommand("InsertWidget",{exec:function(a){CMSPlugin.openWidget(a,"WidgetSelector.aspx?isnew\x3dtrue\x26inline\x3dtrue",null,"90%","85%")},open:function(a,b){b=b||CMSPlugin.currentEditor;var c;c=b.config.IsLiveSite?b.config.ApplicationPath+"CMSModules/Widgets/LiveDialogs/WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetid\x3d"+
a:b.config.ApplicationPath+"CMSModules/Widgets/Dialogs/WidgetProperties.aspx?inline\x3dtrue\x26isnew\x3d1\x26widgetid\x3d"+a;b.config.CurrentGroupID&&(c+="\x26groupid\x3d"+b.config.CurrentGroupID);CMSPlugin.openModalDialog(c,"widget",950,"95%")}});a.ui.addButton("InsertWidget",b);a.on("doubleclick",function(a){var b=a.data.element;b.is("img")&&"true"==b.getAttribute("cke_widget")&&a.editor.execCommand("InsertWidget")});a.addMenuItems&&(a.addMenuGroup("InsertWidget"),a.addMenuItems(c));a.contextMenu&&
a.contextMenu.addListener(function(a){if(a&&a.is("img")&&"true"==a.getAttribute("cke_widget"))return{widget:CKEDITOR.TRISTATE_OFF}})},pluginInsertImageOrMedia:function(a){var b={label:a.lang.CMSPlugins.InsertImageOrMedia.button,command:"InsertImageOrMedia",icon:a.config.CMSPluginUrl+"images/InsertImageOrMedia.png"},c={imageormedia:{label:a.lang.CMSPlugins.InsertImageOrMedia.menu,command:"InsertImageOrMedia",group:"InsertImageOrMedia",icon:a.config.CMSPluginUrl+"images/InsertImageOrMedia.png"}};a.addCommand("InsertImageOrMedia",
{exec:function(a){var b=window.unescape(a.config.MediaDialogWidth),c=window.unescape(a.config.MediaDialogHeight);CMSPlugin.currentEditor=a;CMSPlugin.openModalDialog(a.config.MediaDialogURL,"imageormedia",b,c)}});a.ui.addButton("InsertImageOrMedia",b);a.on("doubleclick",function(a){var b=a.data.element;if(a.editor.config.removeButtons)for(var c in a.editor.config.removeButtons)if("InsertImageOrMedia"===a.editor.config.removeButtons[c]){a.cancel();return}!b.is("img")||"true"!==b.getAttribute("cms_media")&&
b.data("cke-realelement")||(a.editor.execCommand("InsertImageOrMedia"),a.cancel())},null,null,1);a.addMenuItems&&(a.addMenuGroup("InsertImageOrMedia"),a.addMenuItems(c));a.contextMenu&&a.contextMenu.addListener(function(a){if(a&&a.is("img")&&"cke_anchor"!=a.getAttribute("class")&&"flash"!=a.data("cke-real-element-type")&&("true"==a.getAttribute("cms_media")||"true"!=a.getAttribute("cms_disable_media")))return{imageormedia:CKEDITOR.TRISTATE_OFF}});a.on("toHtml",function(a){function b(a){a.children&&
a.children.forEach(b);if("img"==a.name&&"undefined"!==typeof a.attributes.src){var c=a.attributes.src;-1==c.indexOf("?")&&(c+="?");c+="\x26"+g;a.attributes.src=c}}var c=a.data.dataValue,g=a.editor.config.AppendToImagePath;"undefined"!==typeof g&&0<g.length&&b(c)})},pluginInsertLink:function(a){var b={label:a.lang.CMSPlugins.InsertLink.button,command:"InsertLink",icon:a.config.CMSPluginUrl+"images/InsertLink.png"},c={insertLink:{label:a.lang.CMSPlugins.InsertLink.menu,command:"InsertLink",group:"InsertLink",
icon:a.config.CMSPluginUrl+"images/InsertLink.png"}};a.addCommand("InsertLink",{exec:function(a){var b=window.unescape(a.config.LinkDialogWidth),c=window.unescape(a.config.LinkDialogHeight);CMSPlugin.currentEditor=a;CMSPlugin.openModalDialog(a.config.LinkDialogURL,"imageormedia",b,c)}},1);a.ui.addButton("InsertLink",b);a.on("doubleclick",function(b){var c;try{c=CKEDITOR.plugins.link.getSelectedLink(a)||b.data.element}catch(f){}if(b.editor.config.removeButtons)for(var g in b.editor.config.removeButtons)if("InsertLink"===
b.editor.config.removeButtons[g]){b.cancel();return}c&&(c.isReadOnly()||"Disabled"==b.editor.config.toolbar?b.stop():c.is("a")?c.getAttribute("name")&&!c.getAttribute("href")?b.data.dialog="anchor":(b.editor.execCommand("InsertLink"),b.cancel()):c.is("img")&&"anchor"==c.data("cke-real-element-type")&&(b.data.dialog="anchor"))},null,null,1);a.addMenuItems&&(a.addMenuGroup("InsertLink"),a.addMenuItems(c));a.contextMenu&&a.contextMenu.addListener(function(b){if(!b||b.isReadOnly())return null;b=b.is("img")&&
"anchor"==b.data("cke-real-element-type");if(!b){if(!(b=CKEDITOR.plugins.link.getSelectedLink(a)))return null;b=b.getAttribute("name")&&!b.getAttribute("href")}if(!b)return{insertLink:CKEDITOR.TRISTATE_OFF}})},pluginQuicklyInsertMedia:function(a){a.addCommand("QuicklyInsertImage",{exec:function(a){CMSPlugin.currentEditor=a;CMSPlugin.saveFocus(a)}});a.ui.addButton("QuicklyInsertImage",{label:a.lang.CMSPlugins.QuicklyInsertImage.button,icon:a.config.CMSPluginUrl+"images/QuicklyInsertImage.png",onRender:function(){a.config.qimId||
(a.config.qimId=[]);a.config.qimId.push(this._.id);a.on("instanceReady",function(){function b(a){if(a){var b=a.match(/(?:formGuid=)([a-z\d-]+)/i),c=a.match(/(?:documentid=)([\d]+)/i);a=a.match(/(?:parentid=)([\d]+)/i);if(b&&a&&/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(b[1])&&0<=parseInt(a[1],10)||c&&0<=parseInt(c[1],10))return!0}return!1}window.InsertImageOrMedia=function(a,b,c,d,e){CMSPlugin.insert(e)};for(g=0;g<a.config.qimId.length;g++){var c=a.config.qimId[g],e=document.getElementById(c);
if(null!==e&&!e.QIM_set)if(e.QIM_set=!0,b(this.config.QuickInsertURL)&&!window.disableQim){e.className+=" CMS_QIM";$cmsj(e).mouseenter(function(){CMSPlugin.currentEditor=a;CMSPlugin.saveFocus(a)});e.onmousemove=function(){CMSPlugin.currentEditor=a};for(var d=e.getElementsByTagName("span"),f,g=0;g<d.length;g++)-1<d[g].className.indexOf("cke_button_icon")&&(f=d[g]);"undefined"!==typeof f&&(f.style.position="relative",f.style.background="",d=document.createElement("div"),d.className="InnerDiv",d.style.position=
"absolute",d.style.top="0px",d.style.left="0px",d.style.display="inline-block",d.innerHTML='\x3cimg src\x3d"'+a.config.CMSPluginUrl+'images/QuicklyInsertImage.png" style\x3d"width:16px; height:16px;" /\x3e',f.appendChild(d),d=document.createElement("div"),d.className="UploaderDiv",d.style.position="absolute",d.style.top="0px",d.style.width="16px",d.style.height="16px",d.style.visibility="visible",d.style.opacity="1",d.innerHTML='\x3ciframe name\x3d"QuickInsertImage" src\x3d"'+a.config.QuickInsertURL+
"\x26containerid\x3d"+c+'" frameborder\x3d"0" marginWidth\x3d"0" marginHeight\x3d"0" scrolling\x3d"no" border\x3d"0" style\x3d"width:16px; height:16px; overflow:hidden;" allowtransparency\x3d"true" \x3e\x3c/iframe\x3e',f.appendChild(d),c=document.createElement("div"),c.className="LoadingDiv",c.style.position="absolute",c.style.opacity="1",c.style.display="none",c.style.top="0px",c.style.left="0px",c.innerHTML='\x3cimg src\x3d"'+a.config.ApplicationPath+'CMSPages/GetResource.ashx?image\x3dDesign/Preloaders/preload16.gif" style\x3d"width:16px; height:16px;" /\x3e',
f.appendChild(c),c=document.createElement("script"),c.type="text/javascript",c.src=a.config.ApplicationPath+"CMSModules/Content/Controls/Attachments/DirectFileUploader/DirectFileUploader.js",e.appendChild(c))}else e.parentNode.removeChild(e)}})}});a.on("mode",function(){if(a.config.qimId)for(var b=0;b<a.config.qimId.length;b++){var c=document.getElementById(a.config.qimId[b]);if(c){var e=c.getElementsByTagName("iframe");"source"==a.mode?(c.className+=" cke_button_disabled",e&&1===e.length&&(e[0].style.display=
"none")):(c.className=c.className.replace(/\s+cke_button_disabled/ig,""),e&&1===e.length&&(e[0].style.display=""))}}})},pluginInsertStrandsRecommender:function(a){a.ui.addButton("InsertStrandsRecommender",{label:a.lang.CMSPlugins.InsertStrandsRecommender.button,command:"InsertStrandsRecommender",icon:a.config.CMSPluginUrl+"images/InsertStrandsRecommender.png"});a.addCommand("InsertStrandsRecommender",{exec:function(a){CMSPlugin.currentEditor=a;CMSPlugin.openModalDialog(a.config.ApplicationPath+"CMSModules/StrandsRecommender/Pages/InsertEmailWidget.aspx",
"strandsRecommender",1E3,660)}})},pluginForumButtons:function(a){var b={label:a.lang.CMSPlugins.InsertImage.button,command:"InsertImage",icon:a.config.CMSPluginUrl+"images/InsertImage.png"},c={label:a.lang.CMSPlugins.InsertUrl.button,command:"InsertUrl",icon:a.config.CMSPluginUrl+"images/InsertUrl.png"};a.ui.addButton("InsertQuote",{label:a.lang.CMSPlugins.InsertQuote.button,command:"InsertQuote",icon:a.config.CMSPluginUrl+"images/InsertQuote.png"});a.addCommand("InsertQuote",{exec:function(a){a.insertHtml("[quote\x3d][/quote]")}});
a.ui.addButton("InsertImage",b);a.addCommand("InsertImage",{exec:function(a){var b=prompt(a.lang.CMSPlugins.InsertImage.prompturl,"http://");b&&a.insertHtml("[img]"+b+"[/img]")}});a.ui.addButton("InsertUrl",c);a.addCommand("InsertUrl",{exec:function(a){var b=prompt(a.lang.CMSPlugins.InsertUrl.prompturl,"http://");if(b){var c=prompt(a.lang.CMSPlugins.InsertUrl.promptdesc,"");a.insertHtml("[url\x3d"+b+"]"+c+"[/url]")}}})},initMaximalization:function(a){a.on("maximize",function(b){b=b.data;if(a.config.sharedSpaces&&
b==CKEDITOR.TRISTATE_ON){-1<(new CKEDITOR.dom.element(document.body)).getCustomData("maximize_saved_styles")["class"].indexOf("cms-bootstrap")&&(document.body.className+=" cms-bootstrap");b=$cmsj("#"+a.config.sharedSpaces.top);var c=b.offset().top+b.outerHeight();a.container.getChild(1).setStyle("top",c+"px");b=CKEDITOR.document.getWindow().getViewPaneSize();var e=$cmsj("#"+a.config.sharedSpaces.bottom),c=b.height-c-e.outerHeight();a.resize(b.width,c,null,!0)}})},initPopupOpener:function(a){a.popup=
function(a,c,e,d){CMSPlugin.openModalDialog(a,"CKEditorPopup",c,e,d)}},initContextMenu:function(a){var b={Image:"image",Link:"link",Unlink:"unlink",Flash:"flash",Table:"table"},c=a.config.toolbar instanceof Array?a.config.toolbar:a.config["toolbar_"+a.config.toolbar];if("undefined"!==typeof c){for(var e=0;e<c.length;e++){var d=c[e];if(d)for(var f=0;f<d.length;f++){var g=d[f];b[g]&&delete b[g]}}for(var h in b)delete a._.menuItems[b[h]]}},initSelection:function(a){a.on("beforeCommandExec",function(a){CMSPlugin.saveFocus(a.editor)})},
initDataProcesor:function(a){var b=a.dataProcessor;(b=b&&b.dataFilter)&&b.addRules({elements:{"cke:object":function(b){if(!b.attributes.codetype||"cmsinlinecontrol"!=b.attributes.codetype.toLowerCase()){var e=b.attributes;if(!(e.classid&&String(e.classid).toLowerCase()||CMSPlugin.isFlashEmbed(b))){for(e=0;e<b.children.length;e++)if("cke:embed"==b.children[e].name){if(!CMSPlugin.isFlashEmbed(b.children[e]))break;b.attributes.type="flash";return CMSPlugin.createFakeControl(b,a)}return null}b.attributes.type=
"flash"}return CMSPlugin.createFakeControl(b,a)},"cke:embed":function(b){var e=null;CMSPlugin.isFlashEmbed(b)&&(b.attributes.type="flash",e=CMSPlugin.createFakeControl(b,a));return e}}},3)},getInline:function(a,b){var c={};if(a){var e=a.getAttribute("type"),d=a.getAttribute("width"),f=a.getAttribute("height");e&&("media"==e.toLowerCase()&&(e=this.getMediaType(a)),c.cms_type=e);if(a.childNodes){var g=this.getPropertyPrefix(e);d&&(c[g+"width"]=d);f&&(c[g+"height"]=f);e=a.childNodes.length;for(d=0;d<
e;d++){var h=a.childNodes[d],f=h.getAttribute("name"),h=h.getAttribute("value");f&&(c[g+f]=h,"flash_movie"===g+f&&(c.flash_url=h))}}try{if(a=CKEDITOR.dom.element.get(b)){var k=a.getAscendant("a",!0);k&&(c[g+"link"]=k.getAttribute("data-cke-saved-href")||k.getAttribute("href"),c[g+"target"]=k.getAttribute("target"))}}catch(n){}}return c},getPropertyPrefix:function(a){var b="";switch(a.toLowerCase()){case "youtubevideo":b="youtube_";break;case "image":b="img_";break;case "audiovideo":b="av_";break;
case "flash":b="flash_"}return b},getInlineType:function(a){var b="";switch(a.toLowerCase()){case "youtubevideo":b="YouTubeVideo";break;case "image":b="Image";break;case "audiovideo":case "flash":b="Media";break;case "widget":b="Widget"}return b},createCKElement:function(a){var b=this.getCurrentEditor();return b?b.document.createElement(a):null},insertInline:function(a,b){if(a){var c=this.getInlineType(a),e=this.getPropertyPrefix(a),d=this.getCurrentEditor(),c='\x3cobject style\x3d"display: none" codetype\x3d"CMSInlineControl" type\x3d"'+
c+'" ',f={img_link:1,img_target:1},g={img_hspace:-1,img_vspace:-1,img_borderwidth:-1,flash_loop:"False",flash_autoplay:"False",flash_menu:"False",av_autoplay:"False",av_loop:"False",av_controls:"True"};b[e+"width"]&&(c+='width\x3d"'+b[e+"width"]+'" ',b[e+"width"]=null);b[e+"height"]&&(c+='height\x3d"'+b[e+"height"]+'" ',b[e+"height"]=null);var c=c+"\x3e",h;for(h in b)!f[h]&&b[h]&&b[h]!=g[h]&&(c+='\x3cparam name\x3d"'+h.replace(e,"")+'" value\x3d"'+b[h]+'" /\x3e');c+="\x3c/object\x3e";if(b.img_link){var k;
try{CMSPlugin.restoreFocus(d);var n=d.getSelection();if(n.getType()==CKEDITOR.SELECTION_ELEMENT){var m=n.getSelectedElement();m.is("a")&&(k=m)}var l=n.getRanges(!0)[0];l.shrink(CKEDITOR.SHRINK_TEXT);k=l.getCommonAncestor().getAscendant("a",!0)}catch(p){}k?(e={href:"javascript:void(0)/*"+CKEDITOR.tools.getNextNumber()+"*/"},d=[],e["data-cke-saved-href"]=b.img_link,b.img_target?e.target=b.img_target:d.push("target"),k.setAttributes(e),k.removeAttributes(d),k.setHtml(c),c=k.getOuterHtml()):(k='\x3ca href\x3d"'+
b.img_link+'" ',b.img_target&&(k+='target\x3d"'+b.img_target+'" '),c=k+"\x3e"+c+"\x3c/a\x3e")}else d.document.$.execCommand("unlink",!1,null);this.insertHtml(c)}},insertLink:function(a){var b={href:"javascript:void(0)/*"+CKEDITOR.tools.getNextNumber()+"*/"},c=[],e=this.getCurrentEditor(),d=null,f=null,g=null,h=null;try{CMSPlugin.restoreFocus(e);m=e.getSelection();if(m.getType()==CKEDITOR.SELECTION_ELEMENT){var k=m.getSelectedElement();k.is("a")&&(d=k)}l=m.getRanges(!0)[0];l.shrink(CKEDITOR.SHRINK_TEXT);
d=l.getCommonAncestor().getAscendant("a",!0)}catch(n){}a.link_url?(l=a.link_protocol||"",m=a.link_url||"",b["data-cke-saved-href"]=0===m.indexOf("/")?m:l+m):a.anchor_name?(f=a.anchor_name||"",g=a.anchor_custom||"",h=a.anchor_id||"",b["data-cke-saved-href"]="#"+(f||g||h||"")):a.email_to&&(l=a.email_cc,m=a.email_bcc,f=a.email_subject,g=a.email_body,h=[],l&&h.push("cc\x3d"+l),m&&h.push("bcc\x3d"+m),f&&h.push("subject\x3d"+f),g&&h.push("body\x3d"+g),h=h.length?"?"+h.join("\x26"):"",b["data-cke-saved-href"]=
"mailto:"+a.email_to+h);a.link_target?b.target=a.link_target:c.push("target");a.link_url&&(l=function(a,d,e){(a=a[d])?b[e]=a:c.push(e)},l(a,"link_url","href"),l(a,"link_id","id"),l(a,"link_target","target"),l(a,"link_class","class"),l(a,"link_tooltip","title"),l(a,"link_style","style"),a.link_name?(b.name=b["data-cke-saved-name"]=a.link_name,b["class"]=(b["class"]?b["class"]+" ":"")+"cke_anchor"):c=c.concat(["data-cke-saved-name","name"]));if(d)a=d,a.setAttributes(b),a.removeAttributes(c),a.getAttribute("name")?
a.addClass("cke_anchor"):a.removeClass("cke_anchor"),this.fakeObj&&e.createFakeElement(a,"cke_anchor","anchor").replace(this.fakeObj),delete d;else{var m=e.getSelection(),d=m.getRanges(!0),l=d[0];1==d.length&&l.collapsed&&(f=new CKEDITOR.dom.text(a.email_linktext?a.email_linktext:a.email_to?a.email_to:a.anchor_linktext?a.anchor_linktext:a.anchor_name?a.anchor_name:a.link_text?a.link_text:a.link_url,e.document),d[0].insertNode(f),d[0].selectNodeContents(f),m.selectRanges(d));d=new CKEDITOR.style({element:"a",
attributes:b});d.type=CKEDITOR.STYLE_INLINE;d.applyToRange(l);if(a.link_id)for(e=e.document.$.getElementsByTagName("a"),d=0;d<e.length;d++)if(e[d].getAttribute("href")==b.href){e[d].id=a.link_id;break}}},insertImage:function(a){var b=this.createCKElement("img");if(null!=b){a.img_id&&(b.$.id=a.img_id);a.img_url&&(b.$.src=a.img_url,b.$.setAttribute("data-cke-saved-src",a.img_url));b.$.alt=a.img_alt?a.img_alt:a.img_tooltip?a.img_tooltip:"";a.img_tooltip&&(b.$.title=a.img_tooltip);a.img_class&&b.$.setAttribute("class",
a.img_class);a.img_dir&&(b.$.dir=a.img_dir);a.img_usemap&&(b.$.useMap=a.img_usemap);a.img_longdescription&&b.$.setAttribute("longdesc",a.img_longdescription);a.img_lang&&(b.$.lang=a.img_lang);a.img_style&&(b.setAttribute("style",a.img_style),void 0!=b.$.style.cssStyle&&(b.$.style.cssStyle=a.img_style),void 0!=b.$.style.cssText&&(b.$.style.cssText=a.img_style));a.img_width&&0<=parseInt(a.img_width,10)&&(b.$.style.width=parseInt(a.img_width,10)+"px");a.img_height&&0<=parseInt(a.img_height,10)&&(b.$.style.height=
parseInt(a.img_height,10)+"px");a.img_borderwidth&&0<=parseInt(a.img_borderwidth,10)&&(b.$.style.borderWidth=a.img_borderwidth+"px",b.$.style.borderStyle="solid");if(a.img_bordercolor)try{b.$.style.borderColor=a.img_bordercolor}catch(c){b.$.style.borderColor=""}a.img_align&&("left"==a.img_align||"right"==a.img_align?(void 0!=b.$.style.cssFloat&&(b.$.style.cssFloat=a.img_align),void 0!=b.$.style.styleFloat&&(b.$.style.styleFloat=a.img_align)):(void 0!=b.$.style.verticalAlign&&(b.$.style.verticalAlign=
a.img_align),void 0!=b.$.style["vartical-align"]&&(b.$.style["vartical-align"]=a.img_align)));if(a.img_vspace||a.img_hspace){var e=parseInt(a.img_vspace,10),d=parseInt(a.img_hspace,10);if(e==d&&0<=e)b.$.style.margin=d+"px";else if(e!=d||-1!=e)b.$.style.margin=(0<=e?e+"px ":"auto ")+(0<=d?d+"px":"auto")}a.img_link||a.img_behavior?(e=this.createCKElement("a"),a.img_link&&(e.$.href=a.img_link,e.$.setAttribute("data-cke-saved-href",a.img_link)),a.img_target?e.$.setAttribute("target",a.img_target):a.img_behavior&&
e.$.setAttribute("target",a.img_behavior),e.append(b),this.insertElement(e)):this.insertElement(b)}},insertHtml:function(a){var b=this.getCurrentEditor();b&&(CMSPlugin.restoreFocus(b),b.insertHtml(a))},insertElement:function(a){var b=this.getCurrentEditor();b&&(CMSPlugin.restoreFocus(b),b.insertElement(a))},insert:function(a){if(a){var b=a.cms_type;b?this.insertInline(b,a):a.link_url||a.email_to||a.anchor_name?this.insertLink(a):a.img_url&&this.insertImage(a)}},saveFocus:function(a){CMSPlugin.selection=
a.getSelection();CMSPlugin.selection?(CMSPlugin.selectedElement=CMSPlugin.selection.getSelectedElement(),CMSPlugin.selectionBookmarks=CMSPlugin.selection.createBookmarks2()):(CMSPlugin.selectedElement=null,CMSPlugin.selectionBookmarks=null)},restoreFocus:function(a){CMSPlugin.selection?CMSPlugin.selectionBookmarks?CMSPlugin.selection.selectBookmarks(CMSPlugin.selectionBookmarks):CMSPlugin.selectedElement?CMSPlugin.selection.selectElement(CMSPlugin.selectedElement):a.focus():a.focus()},openModalDialog:function(a,
b,c,e,d){window.modalDialog(a,b,c,e,d)},beforeInit:function(a){this.pluginKeyPress(a)},init:function(a){this.initCss(a);this.initMaximalization(a);this.initSelection(a);this.pluginInsertForms(a);this.pluginInsertMacro(a);this.pluginInsertPolls(a);this.pluginInsertGroupPolls(a);this.pluginInsertRating(a);this.pluginInsertYouTube(a);this.pluginInsertWidget(a);this.pluginInsertImageOrMedia(a);this.pluginInsertLink(a);this.pluginQuicklyInsertMedia(a);this.pluginInsertStrandsRecommender(a);this.pluginForumButtons(a)},
afterInit:function(a){this.initContextMenu(a);this.initDataProcesor(a);this.initPopupOpener(a)}};CKEDITOR.plugins.add("CMSPlugins",CMSPlugin);