var _ = require('underscore');

// List of ECMA Identifiers
// Make boolean 'false' to exclude from global variable list
var ecmaIdentifiers = {
    "Array": true,
    "Boolean": true,
    "Date": true,
    "decodeURI": true,
    "decodeURIComponent": true,
    "encodeURI": true,
    "encodeURIComponent": true,
    "Error": true,
    "eval": true,
    "EvalError": true,
    "Function": true,
    "hasOwnProperty": true,
    "isFinite": true,
    "isNaN": true,
    "Math": true,
    "Number": true,
    "Object": true,
    "parseInt": true,
    "parseFloat": true,
    "RangeError": true,
    "ReferenceError": true,
    "RegExp": true,
    "String": true,
    "SyntaxError": true,
    "TypeError": true,
    "URIError": true,
    "JSON": true,
    "ArrayBuffer": true,
    "DataView": true,
    "Float32Array": true,
    "Float64Array": true,
    "Int8Array": true,
    "Int16Array": true,
    "Int32Array": true,
    "Map": true,
    "Promise": true,
    "Proxy": true,
    "Reflect": true,
    "Set": true,
    "Symbol": true,
    "Uint8Array": true,
    "Uint16Array": true,
    "Uint32Array": true,
    "Uint8ClampledArray": true,
    "WeakMap": true,
    "WeakSet": true,
    "Audio": true,
    "Blob": true,
    "addEventListener": true,
    "applicationCache": true,
    "atob": true,
    "blur": true,
    "btoa": true,
    "cancelAnimationFrame": true,
    "CanvasGradient": true,
    "CanvasPattern": true,
    "CanvasRenderingContext2D": true,
    "CSS": true,
    "clearInterval": true,
    "clearTimeout": true,
    "close": true,
    "closed": true,
    "Comment": true,
    "CompositionEvent": true,
    "CustomEvent": true,
    "DOMParser": true,
    "defaultStatus": true,
    "Document": true,
    "document": true,
    "DocumentFragment": true,
    "Element": true,
    "ElementTimeControl": true,
    "Event": true,
    "event": true,
    "fetch": true,
    "File": true,
    "FileList": true,
    "FileReader": true,
    "FormData": true,
    "focus": true,
    "frames": true,
    "getComputedStyle": true,
    "HTMLElement": true,
    "HTMLAnchorElement": true,
    "HTMLBaseElement": true,
    "HTMLBlockquoteElement": true,
    "HTMLBodyElement": true,
    "HTMLBRElement": true,
    "HTMLButtonElement": true,
    "HTMLCanvasElement": true,
    "HTMLCollection": true,
    "HTMLDirectoryElement": true,
    "HTMLDivElement": true,
    "HTMLDListElement": true,
    "HTMLFieldSetElement": true,
    "HTMLFontElement": true,
    "HTMLFormElement": true,
    "HTMLFrameElement": true,
    "HTMLFrameSetElement": true,
    "HTMLHeadElement": true,
    "HTMLHeadingElement": true,
    "HTMLHRElement": true,
    "HTMLHtmlElement": true,
    "HTMLIFrameElement": true,
    "HTMLImageElement": true,
    "HTMLInputElement": true,
    "HTMLIsIndexElement": true,
    "HTMLLabelElement": true,
    "HTMLLayerElement": true,
    "HTMLLegendElement": true,
    "HTMLLIElement": true,
    "HTMLLinkElement": true,
    "HTMLMapElement": true,
    "HTMLMenuElement": true,
    "HTMLMetaElement": true,
    "HTMLModElement": true,
    "HTMLObjectElement": true,
    "HTMLOListElement": true,
    "HTMLOptGroupElement": true,
    "HTMLOptionElement": true,
    "HTMLParagraphElement": true,
    "HTMLParamElement": true,
    "HTMLPreElement": true,
    "HTMLQuoteElement": true,
    "HTMLScriptElement": true,
    "HTMLSelectElement": true,
    "HTMLStyleElement": true,
    "HTMLTableCaptionElement": true,
    "HTMLTableCellElement": true,
    "HTMLTableColElement": true,
    "HTMLTableElement": true,
    "HTMLTableRowElement": true,
    "HTMLTableSectionElement": true,
    "HTMLTemplateElement": true,
    "HTMLTextAreaElement": true,
    "HTMLTitleElement": true,
    "HTMLUListElement": true,
    "HTMLVideoElement": true,
    "history": true,
    "Image": true,
    "Intl": true,
    "length": true,
    "localStorage": true,
    "location": true,
    "matchMedia": true,
    "MediaRecorder": true,
    "MessageChannel": true,
    "MessageEvent": true,
    "MessagePort": true,
    "MouseEvent": true,
    "moveBy": true,
    "moveTo": true,
    "MutationObserver": true,
    "name": true,
    "Node": true,
    "NodeFilter": true,
    "NodeList": true,
    "Notification": true,
    "navigator": true,
    "onbeforeunload": true,
    "onblur": true,
    "onerror": true,
    "onfocus": true,
    "onload": true,
    "onresize": true,
    "onunload": true,
    "open": true,
    "openDatabase": true,
    "opener": true,
    "Option": true,
    "parent": true,
    "performance": true,
    "print": true,
    "Range": true,
    "requestAnimationFrame": true,
    "removeEventListener": true,
    "resizeBy": true,
    "resizeTo": true,
    "screen": true,
    "scroll": true,
    "scrollBy": true,
    "scrollTo": true,
    "sessionStorage": true,
    "setInterval": true,
    "setTimeout": true,
    "SharedWorker": true,
    "status": true,
    "Storage": true,
    "SVGAElement": true,
    "SVGAltGlyphDefElement": true,
    "SVGAltGlyphElement": true,
    "SVGAltGlyphItemElement": true,
    "SVGAngle": true,
    "SVGAnimateColorElement": true,
    "SVGAnimateElement": true,
    "SVGAnimateMotionElement": true,
    "SVGAnimateTransformElement": true,
    "SVGAnimatedAngle": true,
    "SVGAnimatedBoolean": true,
    "SVGAnimatedEnumeration": true,
    "SVGAnimatedInteger": true,
    "SVGAnimatedLength": true,
    "SVGAnimatedLengthList": true,
    "SVGAnimatedNumber": true,
    "SVGAnimatedNumberList": true,
    "SVGAnimatedPathData": true,
    "SVGAnimatedPoints": true,
    "SVGAnimatedPreserveAspectRatio": true,
    "SVGAnimatedRect": true,
    "SVGAnimatedString": true,
    "SVGAnimatedTransformList": true,
    "SVGAnimationElement": true,
    "SVGCSSRule": true,
    "SVGCircleElement": true,
    "SVGClipPathElement": true,
    "SVGColor": true,
    "SVGColorProfileElement": true,
    "SVGColorProfileRule": true,
    "SVGComponentTransferFunctionElement": true,
    "SVGCursorElement": true,
    "SVGDefsElement": true,
    "SVGDescElement": true,
    "SVGDocument": true,
    "SVGElement": true,
    "SVGElementInstance": true,
    "SVGElementInstanceList": true,
    "SVGEllipseElement": true,
    "SVGExternalResourcesRequired": true,
    "SVGFEBlendElement": true,
    "SVGFEColorMatrixElement": true,
    "SVGFEComponentTransferElement": true,
    "SVGFECompositeElement": true,
    "SVGFEConvolveMatrixElement": true,
    "SVGFEDiffuseLightingElement": true,
    "SVGFEDisplacementMapElement": true,
    "SVGFEDistantLightElement": true,
    "SVGFEFloodElement": true,
    "SVGFEFuncAElement": true,
    "SVGFEFuncBElement": true,
    "SVGFEFuncGElement": true,
    "SVGFEFuncRElement": true,
    "SVGFEGaussianBlurElement": true,
    "SVGFEImageElement": true,
    "SVGFEMergeElement": true,
    "SVGFEMergeNodeElement": true,
    "SVGFEMorphologyElement": true,
    "SVGFEOffsetElement": true,
    "SVGFEPointLightElement": true,
    "SVGFESpecularLightingElement": true,
    "SVGFESpotLightElement": true,
    "SVGFETileElement": true,
    "SVGFETurbulenceElement": true,
    "SVGFilterElement": true,
    "SVGFilterPrimitiveStandardAttributes": true,
    "SVGFitToViewBox": true,
    "SVGFontElement": true,
    "SVGFontFaceElement": true,
    "SVGFontFaceFormatElement": true,
    "SVGFontFaceNameElement": true,
    "SVGFontFaceSrcElement": true,
    "SVGFontFaceUriElement": true,
    "SVGForeignObjectElement": true,
    "SVGGElement": true,
    "SVGGlyphElement": true,
    "SVGGlyphRefElement": true,
    "SVGGradientElement": true,
    "SVGHKernElement": true,
    "SVGICCColor": true,
    "SVGImageElement": true,
    "SVGLangSpace": true,
    "SVGLength": true,
    "SVGLengthList": true,
    "SVGLineElement": true,
    "SVGLinearGradientElement": true,
    "SVGLocatable": true,
    "SVGMPathElement": true,
    "SVGMarkerElement": true,
    "SVGMaskElement": true,
    "SVGMatrix": true,
    "SVGMetadataElement": true,
    "SVGMissingGlyphElement": true,
    "SVGNumber": true,
    "SVGNumberList": true,
    "SVGPaint": true,
    "SVGPathElement": true,
    "SVGPathSeg": true,
    "SVGPathSegArcAbs": true,
    "SVGPathSegArcRel": true,
    "SVGPathSegClosePath": true,
    "SVGPathSegCurvetoCubicAbs": true,
    "SVGPathSegCurvetoCubicRel": true,
    "SVGPathSegCurvetoCubicSmoothAbs": true,
    "SVGPathSegCurvetoCubicSmoothRel": true,
    "SVGPathSegCurvetoQuadraticAbs": true,
    "SVGPathSegCurvetoQuadraticRel": true,
    "SVGPathSegCurvetoQuadraticSmoothAbs": true,
    "SVGPathSegCurvetoQuadraticSmoothRel": true,
    "SVGPathSegLinetoAbs": true,
    "SVGPathSegLinetoHorizontalAbs": true,
    "SVGPathSegLinetoHorizontalRel": true,
    "SVGPathSegLinetoRel": true,
    "SVGPathSegLinetoVerticalAbs": true,
    "SVGPathSegLinetoVerticalRel": true,
    "SVGPathSegList": true,
    "SVGPathSegMovetoAbs": true,
    "SVGPathSegMovetoRel": true,
    "SVGPatternElement": true,
    "SVGPoint": true,
    "SVGPointList": true,
    "SVGPolygonElement": true,
    "SVGPolylineElement": true,
    "SVGPreserveAspectRatio": true,
    "SVGRadialGradientElement": true,
    "SVGRect": true,
    "SVGRectElement": true,
    "SVGRenderingIntent": true,
    "SVGSVGElement": true,
    "SVGScriptElement": true,
    "SVGSetElement": true,
    "SVGStopElement": true,
    "SVGStringList": true,
    "SVGStylable": true,
    "SVGStyleElement": true,
    "SVGSwitchElement": true,
    "SVGSymbolElement": true,
    "SVGTRefElement": true,
    "SVGTSpanElement": true,
    "SVGTests": true,
    "SVGTextContentElement": true,
    "SVGTextElement": true,
    "SVGTextPathElement": true,
    "SVGTextPositioningElement": true,
    "SVGTitleElement": true,
    "SVGTransform": true,
    "SVGTransformList": true,
    "SVGTransformable": true,
    "SVGURIReference": true,
    "SVGUnitTypes": true,
    "SVGUseElement": true,
    "SVGVKernElement": true,
    "SVGViewElement": true,
    "SVGViewSpec": true,
    "SVGZoomAndPan": true,
    "Text": true,
    "TextDecoder": true,
    "TextEncoder": true,
    "TimeEvent": true,
    "top": true,
    "URL": true,
    "WebGLActiveInfo": true,
    "WebGLBuffer": true,
    "WebGLContextEvent": true,
    "WebGLFramebuffer": true,
    "WebGLProgram": true,
    "WebGLRenderbuffer": true,
    "WebGLRenderingContext": true,
    "WebGLShader": true,
    "WebGLShaderPrecisionFormat": true,
    "WebGLTexture": true,
    "WebGLUniformLocation": true,
    "WebSocket": true,
    "window": true,
    "Window": true,
    "Worker": true,
    "XDomainRequest": true,
    "XMLHttpRequest": true,
    "XMLSerializer": true,
    "XPathEvaluator": true,
    "XPathException": true,
    "XPathExpression": true,
    "XPathNamespace": true,
    "XPathNSResolver": true,
    "XPathResult": true,
    "alert": true,
    "confirm": true,
    "console": true,
    "Debug": true,
    "opera": true,
    "prompt": true
};

// List of jiva specific global variables
var jivaGlobals = {
    "angular": true,
    "_": true,
    "$": true,
    "requirejs": true,
    "document": true,
    "define": true,
    "window": true,
    "host": true,
    "describe": true,
    "xdescribe": true,
    "it": true,
    "xit": true,
    "expect": true,
    "beforeEach": true,
    "afterEach": true,
    "spyOn": true,
    "inject": true,
    "url": true,
    "jasmine": true,
    "sinon": true,
    "Globalize": true,
    "$PANELS": true,
    "$COMMON": true,
    "jQuery": true,
    "tinyMCE": true,
    "tinymce": true,
    "JSBuild": true,
    "baseSrc": true,
    "JSTimeStamp": true,
    "$JVAR": true,
    "$JLABEL": true,
    "$JIVA": true,
    "$UTILS": true,
    "$LOOKUP": true,
    "module": true,
    "modules": true,
    "moduleMap": true,
    "modulesShim": true,
    "modulesRequire": true,
    "modulesBootstrap": true,
    "baseNguiSrc": true,
    "HH_HELP_CONTEXT": true,
    "JSDebug": true,
    "Highcharts": true,
    "requireConfig": true,
    "testConfig": true,
    "moment": true,
    "require": true,
    "navigator": true,
    "screen": true,
    "alert": true,
    "subscriptions": true,
    "confirm": true // List of jiva specific global variables
};

_.extend(jivaGlobals, ecmaIdentifiers);

module.exports = jivaGlobals;