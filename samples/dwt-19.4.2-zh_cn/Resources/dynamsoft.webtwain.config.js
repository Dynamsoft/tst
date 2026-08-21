//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on Dynamic Web TWAIN: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2026, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 19.4.2
//
/// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { DWT: {} };

///
Dynamsoft.DWT.AutoLoad = true;
///
Dynamsoft.DWT.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '100%', Height: '100%' }];

/////////////////////////////////////////////////////////////////////////////////////
//  WARNING:  The productKey in this file is protected by copyright law            //
//  and international treaty provisions. Unauthorized reproduction or              //
//  distribution of this  productKey, or any portion of it, may result in severe   //
//  criminal and civil penalties, and will be prosecuted to the maximum            //
//  extent possible under the law.  Further, you may not reverse engineer,         //
//  decompile, disassemble, or modify the productKey .                             //
/////////////////////////////////////////////////////////////////////////////////////
/// If you need to use multiple keys on the same server, you can combine keys and write like this 
/// Dynamsoft.DWT.ProductKey = 'key1;key2;key3';
/// To get a free trial, please visit https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&utm_source=installer.
Dynamsoft.DWT.ProductKey = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLTEwMzk4OTAwMyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbS8iLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMCIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NsdHMuZHluYW1zb2Z0LmNvbS8iLCJjaGVja0NvZGUiOjk0NTQ3NzkxMX0=';
///
Dynamsoft.DWT.ResourcesPath = 'Resources';

///
Dynamsoft.DWT.IfAddMD5InUploadHeader = false;

///
Dynamsoft.DWT.ServiceInstallerLocation = 'https://demo.dynamsoft.com/DWT/Resources/dist/19.4.2/';

///
///true will make our processing icons align with the initiated div container, otherwise align with the whole page instead
Dynamsoft.DWT.IfConfineMaskWithinTheViewer = false;
Dynamsoft.DWT.CustomizableDisplayInfo = {

    errorMessages: {

        // launch
        ERR_MODULE_NOT_INSTALLED: '错误：未安装 Dynamic Web TWAIN 模块。',
        ERR_BROWSER_NOT_SUPPORT: '错误：当前浏览器不受支持。',
        ERR_CreateID_MustNotInContainers: '错误：检测到用于创建 Dynamic Web TWAIN 对象的 ID 重复，请检查并修改。',
		ERR_CreateID_NotContainer: '错误：用于创建新 DWT 对象的 DIV 的 ID 无效。',
        ERR_DWT_NOT_DOWNLOADED: '错误：下载 Dynamic Web TWAIN 模块失败。',

        // image view
        limitReachedForZoomIn: "错误：已达到放大的最大限制",
        limitReachedForZoomOut: "错误：已达到缩小的最大限制",

        // image editor
        insufficientParas: '错误：参数不足。',
        invalidAngle: '错误：您输入的角度无效。',
        invalidHeightOrWidth: "错误：您输入的高度或宽度无效。",
        imageNotChanged: "错误：当前图像未发生更改。"

    },

    // launch
    generalMessages: {
        checkingDWTVersion: '正在检查 WebTwain 版本...',
        updatingDService: 'Dynamsoft 服务正在更新...',
        downloadingDWTModule: '正在下载 Dynamic Web TWAIN 模块。',
        refreshNeeded: '请刷新您的浏览器。',
        downloadNeeded: '请下载并安装 Dynamic Web TWAIN。',
        DWTmoduleLoaded: 'Dynamic Web TWAIN 模块已加载。'
    },

    customProgressText: {

        // html5 event
        upload: '正在上传...',
        download: '正在下载...',
        load: '正在加载...',
        decode: '正在处理...',
        decodeTIFF: '正在处理 TIFF...',
        decodePDF: '正在处理 PDF...',
        encode: '正在处理...',
        encodeTIFF: '正在处理 TIFF...',
        encodePDF: '正在处理 PDF...',

        transfer: '正在传输...',
        // image control
        canvasLoading: '正在加载...'
    },

    // image editor
    buttons: {
        titles: {
            'previous': '上一张图像',
            'next': '下一张图像',
            'print': '打印图像',
            'scan': '获取新图像',
            'load': '加载本地图像',
            'rotateleft': '向左旋转',
            'rotate': '旋转',
            'rotateright': '向右旋转',
            'deskew': '纠偏',
            'crop': '裁剪选定区域',
            'cut': '剪切选定区域',
            'changeimagesize': '更改图像大小',
            'flip': '翻转图像',
            'mirror': '镜像图像',
            'zoomin': '放大',
            'originalsize': '显示原始大小',
            'zoomout': '缩小',
            'stretch': '拉伸模式',
            'fit': '适应窗口',
            'fitw': '水平适应',
            'fith': '垂直适应',
            'hand': '抓手模式',
            'rectselect': '选择模式',
            'zoom': '点击放大',
            'restore': '恢复原始图像',
            'save': '保存更改',
            'close': '关闭编辑器',
            'removeall': '删除所有图像',
            'removeselected': '删除所有选中的图像'
        }
    },

    dialogText: {
        dlgRotateAnyAngle: ['角度：', '插值方式：', '保持大小', '  确定  ', '取消'],
        dlgChangeImageSize: ['新高度：', '新宽度：', '插值方式：', '  确定  ', '取消'],
        saveChangedImage: ['您已更改图像，是否保留更改？', '  是  ', '  否  '],
        selectSource: ['选择数据源：', '选择', '取消', '没有可用的数据源！']
    }
};


/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.
// Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });

