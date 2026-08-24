/*! 202607280900 - 20260410 - 20260205134629
* Dynamsoft JavaScript Library
* Product: Dynamic Web TWAIN
* Web Site: https://www.dynamsoft.com
*
* Copyright 2026, Dynamsoft Corporation
* Author: Dynamsoft Support Team
* Version: 19.4.2
*/

//Dynamsoft.On{actionName} It is a callback function called by Web-TWAIN product. The contents of this function are the default templates of the WebTWAIN. Users can modify the fucntions, but be aware that the function name itself cannot be modified
//Dynamsoft._{functionName} It is a private function used by Dynamsoft.On{actionName}. Users can modify and delete according to their needs.
(function () {
  "use strict";
  var promptDlgWidth = 620,
  ERR_LNADenied = '对本地扫描服务的访问已被阻止。',
  ERR_LNANotAllowed = '请授予对本地扫描服务的访问权限。';

  if(Dynamsoft.navInfoSync.bMobile) {
    if(screen.width<620) {
      promptDlgWidth = screen.width - 10;
    }
  }
  function isChrome145plus() {
    if (Dynamsoft.navInfoSync.bChrome || Dynamsoft.navInfoSync.bEdge) {
      var ver = parseInt(Dynamsoft.navInfoSync.strBrowserVersion);
      if (ver >= 145) {return true;}
    }
    return false;
  }
  
  function queryLNAPermission() {

    if(Dynamsoft.navInfoSync.bFirefox || Dynamsoft.navInfoSync.bSafari || Dynamsoft.navInfoSync.bIE) {

    } else {
      try{
        return Dynamsoft.Lib.queryLNAPermission(); 
      }catch(_){
      }
    }

    return Dynamsoft.Lib.Promise.resolve({
      state: 'other'
    });
  }

  //----------------------start Install Dialog---------------------------

  var bLNAPermission = false;
  if(navigator.permissions && navigator.permissions.query) {
    queryLNAPermission().then(function(_) {bLNAPermission = true;})['catch'](function(){});
  }
  function isExistLNAPermission() {
    return bLNAPermission;
  }

  //Web TWAIN Service is not detected dialogs
  //Windows
  Dynamsoft.OnWebTwainNotFoundOnWindowsCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft,
      objUrl = {
        'default': InstallerUrl
      };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumWindow, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //Linux
  Dynamsoft.OnWebTwainNotFoundOnLinuxCallback = function (ProductName, strDebUrl, strRpmUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion, iPlatform) {
    var _this = Dynamsoft,
      objUrl = {
        'default': strDebUrl,
        'deb': strDebUrl,
        'rpm': strRpmUrl
      };
    if (!iPlatform) iPlatform = Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux;
    _this._show_install_dialog(ProductName, objUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //MacOS
  Dynamsoft.OnWebTwainNotFoundOnMacCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft,
      objUrl = {
        'default': InstallerUrl
      };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumMac, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //Web TWAIN Service is not supported dialogs
  //Mobile Browsers
  Dynamsoft.OnMobileNotSupportCallback = function () {
    var ObjString = [];

    if (Dynamsoft.DWT) {

      ObjString.push('<div class="ds-dwt-ui-dlg-android" style="padding-bottom:30px">');
      ObjString.push('服务模式不支持您的操作系统，请联系网站管理员。');
      ObjString.push('</div>');

      Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
        width: 335,
        headerStyle: 1,
        backgroundStyle: 1
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }

  };

  //Error Message - HTTPS is required to allow CORS to function. This error appears when HTTP is detected. (See: https://www.dynamsoft.com/web-twain/docs/faq/http-insecure-websites-in-chromium-browser.html?ver=latest)
  Dynamsoft.OnHTTPCorsError = function (msg) {

    var ObjString = [
      "<div>", msg, "</div>",
      '<div style="margin-top:10px">要解决此问题，请将您的网站更新为 HTTPS，或参考 <br /><a target="_blank" href="https://www.dynamsoft.com/web-twain/docs/faq/http-insecure-websites-in-chromium-browser.html?ver=latest">此文章</a> 了解其他解决方法。</div>'
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth,
      headerStyle: 2
    });
  };

  function getLNA_FAQ_URL(bPromptPermisstion) {

		var params = ["https://dynamsoft.github.io/Dynamic-Web-TWAIN/local-network-access.html"];
    params.push('?permission=');
    params.push(bPromptPermisstion ? "prompt" : 'denied');
    params.push('&browser=');
    if(Dynamsoft.navInfoSync.bChrome) {
      params.push('chrome');
    } else if(Dynamsoft.navInfoSync.bEdge) {
      params.push('edge');
    } else if(Dynamsoft.navInfoSync.bFirefox) {
      params.push('firefox');
    }
    params.push('&browserversion=' + Dynamsoft.navInfoSync.strBrowserVersion);

    return params.join('');
  }

  Dynamsoft._show_install_dialog = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, bNeedUpgrade, serviceVer, expectedVer) {
    var _this = Dynamsoft,
      ObjString, title, subTitle, browserActionNeeded,
      EnumPlatform = Dynamsoft.DWT.EnumDWT_PlatformType,
      bUnix = (iPlatform == EnumPlatform.enumLinux || iPlatform == EnumPlatform.enumEmbed ||
        iPlatform == EnumPlatform.enumChromeOS || iPlatform == EnumPlatform.enumHarmonyOS),
      imagesInBase64 = {
        icn_download: 'data:image/png;base64,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',
        icn_install: 'data:image/png;base64,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',
        icn_scan: 'data:image/png;base64,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'
      };

    // npm file mode
    if (bNeedUpgrade) {
      if(parseFloat(serviceVer) < parseFloat(expectedVer))
        title = '升级您的附件影像扫描助手'; //'Please follow the steps below to upgrade your local document scanning service.';
      else
        title = '更新您的附件影像扫描助手';
    }
    else
      title = '附件影像扫描助手';
    // subTitle = '请按照以下步骤在浏览器中启用扫描功能';
    subTitle = '';
    ObjString = [
      '<div class="dynamsoft-dwt-dlg-title">',
      title,
      "</div>",
      '<div class="dynamsoft-dwt-dlg-subtitle" style="display: none;">',
      subTitle,
      "</div>",
      '<div class="dynamsoft-dwt-dlg-title-error" style="display:none"></div>'
    ];

    if (_this.DWT) {

      var bFirefox = Dynamsoft.navInfoSync.bFirefox;
      if (bUnix || bFirefox) {
        browserActionNeeded = '重启';
      } else {
        browserActionNeeded = '刷新';
      }
      ObjString.push('<div class="dynamsoft-dwt-installdlg-iconholder"> ');

      var left = "134px";
      if(bFirefox) left = "135px";
      ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left:'+left+'"></div>');
      left = "328px";
      if(bFirefox) left = "329px";
      ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left:'+left+'"></div>');

      var marginRight = '133px';

      ObjString.push('<img style="margin: 0px ' + marginRight + ' 0px 0px" src="' + imagesInBase64.icn_download + '" alt="下载" />');
      ObjString.push('<img style="margin: 2px ' + marginRight + ' 2px 0px" src="' + imagesInBase64.icn_install + '" alt="安装" />');
      ObjString.push('<img src="' + imagesInBase64.icn_scan + '" alt="扫描" />');
      ObjString.push('<div><span class="dynamsoft-dwt-installdlg-text" style="right: 165px">下载</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="right: -1px">安装</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="left: 166px">扫描</span>');
      ObjString.push('</div>');
      ObjString.push('</div>');

      if (bHTML5 && bUnix) {
        ObjString.push('<div style="margin:10px 0 0 60px;">');
        ObjString.push('<div id="dwt-install-url-div">');

        var arm64 = Dynamsoft.navInfo.bArm64,
          mips64 = Dynamsoft.navInfo.bMips64,
          chromeOS = Dynamsoft.navInfoSync.bChromeOS,
          harmonyOS = Dynamsoft.navInfoSync.bHarmonyOS;

        if (arm64 || mips64 || chromeOS || harmonyOS) { } else {
          ObjString.push('<div><input id="dwt-install-url-deb" name="dwt-install-url" type="radio" onclick="Dynamsoft._dwt_change_install_url(\'' + objInstallerUrl.deb + '\')" checked="checked" /><label for="dwt-install-url-deb">64 位 .deb（适用于Debian、统信桌面版和银河麒麟等）</label></div>');
          ObjString.push('<div><input id="dwt-install-url-rpm" name="dwt-install-url" type="radio" onclick="Dynamsoft._dwt_change_install_url(\'' + objInstallerUrl.rpm + '\')" /><label for="dwt-install-url-rpm">64 位 .rpm（适用于 Fedora 和 CentOS 等）</label></div>');
        }
        ObjString.push('</div></div>');
      }

      ObjString.push('<div class="ds-download-div"><a id="dwt-btn-install" href="');
      ObjString.push(objInstallerUrl['default']);
      ObjString.push('"');
      if (bHTML5) {
        ObjString.push(' html5="1"');
      } else {
        ObjString.push(' html5="0"');
      }

      ObjString.push(' onclick="Dynamsoft._dcp_dwt_onclickDownloadButton()">下载</a></div>');
      if (bHTML5) {
        if (bIE) {
          ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left; padding-left: 80px">');
          ObjString.push('如果安装附件影像扫描助手后仍然看到此对话框，请<br />');
          ObjString.push('1. 将网站添加到受信任站点区域。<br />');
          ObjString.push('IE | 工具 | Internet 选项 | 安全 | 受信任的站点。<br />');
          ObjString.push('2. 刷新您的浏览器。');
          ObjString.push('</div>');

        } else {

          ObjString.push('<div class="dynamsoft-dwt-dlg-tail ds-dwt-textLeft" style="padding: 0px 70px 20px 70px;background:#FFFFFF">');

          ObjString.push('<div class="dynamsoft-dwt-dlg-tail-guide">');
          ObjString.push('如果安装服务后仍然看到此对话框，请参考 <a target="_blank" href="' + getLNA_FAQ_URL(true) + '">指南</a> 了解详细信息。');
          ObjString.push('</div>');

          if (bUnix) {
            ObjString.push('<div class="dynamsoft-dwt-dlg-red">');
            ObjString.push('如果仍然无法连接，请<strong>' + browserActionNeeded + '</strong>您的浏览器。 ');
            ObjString.push('</div>');
          }

          ObjString.push('</div>');
        }

      } else {
        ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left; padding-left: 80px">');
        ObjString.push('安装完成后，请<br />');
        ObjString.push('1. 重启浏览器<br />');
        ObjString.push('2. 在浏览器信息栏上单击右键，允许 "DynamicWebTWAIN" 加载项运行。');
        ObjString.push('</div>');
      }
      
      _this.DWT.ShowMessage(ObjString.join(''), {
        width: promptDlgWidth,
        headerStyle: 1
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }

    if (Dynamsoft.DWT && Dynamsoft.DWT.OnWebTwainNotFound) {
      Dynamsoft.DWT.OnWebTwainNotFound();
    }
  };

  Dynamsoft._dwt_change_install_url = function (url) {
    var install = document.getElementById('dwt-btn-install');
    if (install)
      install.href = url;
  };

  var reconnectTime = 0;
  Dynamsoft._dcp_dwt_onclickDownloadButton = function() {
    var install = document.getElementById('dwt-install-url-div');
    if (install) {
      install.style.display = 'none';
    }

    var divSubTitle = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-subtitle');
    if (divSubTitle) {
      divSubTitle.style('display','');
    }

    var divTitle = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-title');
    if (divTitle) {
      divTitle.html('安装附件影像扫描助手');
    }

    var el = document.getElementById('dwt-btn-install');
    if (el) {
      if (el.getAttribute("html5") == "1") {
        var pel = el.parentNode,
        newDiv = document.createElement('div'), newButton = document.createElement('Button');
        newDiv.id = 'dwt-btn-install-div-tips';
        newDiv.style.textAlign = "center";
        newDiv.style.paddingBottom = '15px';
        newDiv.style.font='600 16px/25px "Open Sans", sans-serif';
        newDiv.innerHTML = '安装完成后，请点击下方按钮以验证服务是否正在运行。';
        newDiv.setAttribute("html5", "1");
        pel.removeChild(el);
        pel.appendChild(newDiv);
        newButton.textContent = "我已安装";
        newButton.onclick = function(){
          Dynamsoft._dcp_dwt_onclickInstallButton();
        }
        newButton.className = "dynamsoft-dwt-installdlg-button";
        pel.appendChild(newButton);
      } else {
        var pel = el.parentNode;
        pel.removeChild(el);
      }
    }
    return true;
  };
  Dynamsoft._dcp_dwt_onclickInstallButton = function () {
    var install = document.getElementById('dwt-install-url-div');
    if (install)
      install.style.display = 'none';

    var divTitle = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-title');
    if (divTitle) {
      divTitle.style('display','');
    }
    var divTitleErr = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-title-error');
    if (divTitleErr) {
      divTitleErr.style('display','none');
    }

    var divSubTitle = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-subtitle');
    if (divSubTitle) {
      divSubTitle.style('display','none');
    }

    var btnVerify = Dynamsoft.Lib.one('.dynamsoft-dwt-installdlg-button');
    if (btnVerify) {
      btnVerify.style('display','none');
    }

    var el = document.getElementById('dwt-btn-install-div-tips');
    if (el) {
      setTimeout(function () {
        if (el.getAttribute("html5") == "1") {
          var pel = el.parentNode;
          el.style.font='22px / 31px "Open Sans", sans-serif';
          el.style.margin = "20px";
          el.innerHTML = '正在连接服务...';
          reconnectTime = new Date();
          setTimeout(Dynamsoft._dwt_Reconnect, 10);
        } else {
          var pel = el.parentNode;
          pel.removeChild(el);
        }
      }, 10);
    }
    return true;
  };

  Dynamsoft._dwt_Reconnect = function () {
    var _this = Dynamsoft;
    if (((new Date() - reconnectTime) / 1000) > 10) {
     var el = document.getElementById('dwt-btn-install-div-tips');
     if (el) {
      el.style.font='600 16px/25px "Open Sans", sans-serif';
      el.style.margin = "0px";
      el.innerHTML = '请确保安装已完成且服务正在运行。';
     }

     var btnVerify = Dynamsoft.Lib.one('.dynamsoft-dwt-installdlg-button');
      if (btnVerify) {
        btnVerify.html('重试连接');
        btnVerify.style('display','');
        btnVerify.style('width','200px');
      }

      var divTitle = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-title');
      if (divTitle) {
        divTitle.style('display','none');
      }
      var divTitleErr = Dynamsoft.Lib.one('.dynamsoft-dwt-dlg-title-error');
      if (divTitleErr) {
        divTitleErr.html("无法连接到服务。");
        divTitleErr.style('display','');
      }

      return;
    }
    if (_this.DWT) {

      var _timeSpan = 500;
      if (navigator.userAgent.indexOf("Safari") > -1) {
        _timeSpan = 2000;
      }

      _this.DWT.CheckConnectToTheService(function () {
        Dynamsoft.DWT.CloseDialog();
        
		Dynamsoft.DWT.ConnectToTheService();
      }, function () {
        if (Dynamsoft.DWT.NeedCheckWebTwainBySocket()) {
          Dynamsoft.DWT.CheckWebTwainBySocket(function () {
            Dynamsoft.OnHTTPCorsError();
          }, function () {
            setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
          }, function () {
            setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
          });
          return;
        }
        setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  //------------------------end Install Dilaog---------------------------

  //----------------------start Upgrade Dialog---------------------------
  Dynamsoft.OnWebTwainNeedUpgradeCallback = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, serviceVer, expectedVer) {
    Dynamsoft._show_install_dialog(ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, true, true, serviceVer, expectedVer);
  };
  //----------------------end Upgrade Dialog---------------------------

  //----------------------start DLS License -----------------------
  Dynamsoft.OnLTSLicenseError = function (message, code) {

    var addMessage = '',
      ObjString;

    if (code == -2440 || // NetworkError
      code == -2441 || // Timedout
      code == -2443 || // CorsError
      code == -2446 || // LtsJsLoadError
      message.indexOf('Internet connection') > -1 ||
      message.indexOf('Storage') > -1) {

      var purchaseUrl = 'https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&deploymenttype=js';
      addMessage = '<div>您可以在<a href="' + purchaseUrl + '" target="_blank" class="dynamsoft-major-color">此处</a>注册免费的 30 天试用。请务必选择 Dynamic Web TWAIN 产品。</div>';
    }

    ObjString = [
      message,
      addMessage
    ];

    Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
      width: promptDlgWidth,
      headerStyle: 2
    });
  };

  Dynamsoft.OnLTSConnectionWarning = function () {

    var ObjString = [
      '警告：由于 Dynamic Web TWAIN 无法连接到许可证跟踪服务器，因此显示此对话框。 ',
      '系统正在使用缓存的授权信息，您可以继续正常使用本软件。 ',
      '请尽快连接到网络。 ',
      Dynamsoft.DWT.isPublicLicense() ? '<a class="dynamsoft-major-color" href="https://www.dynamsoft.com/company/contact/">联系 Dynamsoft</a> ' : '联系网站管理员 ',
      '以获取更多信息。'
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth,
      caption: '警告',
      headerStyle: 2
    });
  };

  Dynamsoft.OnLTSPublicLicenseWarning = function (message) {

    Dynamsoft.DWT.ShowMessage(message, {
      width: promptDlgWidth,
      caption: '警告',
      headerStyle: 2
    });
  };

  //--------------------end DLS License-------------------------------

  //----------------------start Product Key -----------------------

  Dynamsoft.OnLicenseExpiredWarning = function (strExpiredDate, remain, trial) {

    var ObjString, strCaption,
      a_online_store = '<a target="_blank" href="https://www.dynamsoft.com/store/dynamic-web-twain/#DynamicWebTWAIN"> 在线商店</a>',
      a_new_key_href = 'https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&utm_source=in-product';

    if (remain > 5 || !trial) {

    } else {

      if (remain > 0) { // 1~5

        var strDays;

        if (remain <= 1) {
          strDays = '1 天';
        } else {
          strDays = parseInt(remain) + ' 天';
        }

        strCaption = '警告';
        ObjString = [
          '<div style="padding:0 0 10px 0">请注意，您的试用密钥将在 ', strDays, ' 后过期。请按以下两个简单步骤延长试用期：</div>',
          '<div style="margin:0 0 0 10px">1. <a target="_blank" href="', a_new_key_href, '">申请新的试用密钥</a>，并按照说明设置新密钥</div>',
          '<div style="margin:0 0 0 10px">2. 刷新扫描页面后重试</div>',
          '<div style="padding:0">如果您已准备好购买正式许可证，请访问', a_online_store, '。</div>'
        ].join('');

      } else {

        // Trial remain<=0 Expired
        ObjString = [
          '<div style="padding:0">很抱歉，您的 Dynamic Web TWAIN 产品密钥已于 ', strExpiredDate, ' 过期。您可以通过', a_online_store, '购买正式许可证。</div>',
          '<div style="padding:0">您也可以通过 <a target="_blank" href="', a_new_key_href, '"> 此页面</a> 申请新的产品密钥。</div>'
        ].join('');

      }
      
      if (ObjString) {
        Dynamsoft.DWT.ShowMessage(ObjString, {
          width: promptDlgWidth,
          caption: strCaption,
          headerStyle: 2
        });
      }
    } 

  };

  Dynamsoft.OnLicenseError = Dynamsoft.OnLicenseError || function (message, errorCode) {

    Dynamsoft.DWT.ShowMessage(Dynamsoft.ProcessLicenseErrorContent(message), {
      width: promptDlgWidth,
      headerStyle: 2
    });

  };
  
  Dynamsoft.OnCorsConfigError = function (msg) {

    var ObjString = [
      msg, " 请联系管理员配置 'Access-Control-Allow-Origin'。",
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth,
      headerStyle: 2
    });
  };

  Dynamsoft.OnBrowserLNADeniedV2_FF = function(msg, bReturnToInstallDialog) {

    var pic = "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";
    var pic1 = "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";
    var ObjString = [];

    ObjString.push('<div style="color:#606060;font-size:14px;padding:0;">请授予对本地扫描服务的访问权限。</div>');
    ObjString.push('<div style="color:#606060;font-size:14px;padding:0;">1. 点击“允许”以授予访问权限。</div>');

    ObjString.push('<div><img src="data:image/webp;base64,');
    ObjString.push(pic1);
    ObjString.push('" /></div>');

    ObjString.push('<div style="color:#606060;font-size:14px;padding:5px 0 0 0;">2. 如果访问已被阻止，请清除该设置并重新加载页面。</div>');

    ObjString.push('<div><img src="data:image/webp;base64,');
    ObjString.push(pic);
    ObjString.push('" /></div>');

    ObjString.push('<div style="color:#606060;font-size:14px;padding:0;">有关更多详细信息，请参考 <a target="_blank" href="https://www.dynamsoft.com/web-twain/docs/faq/chromium-142-local-network-access-issue.html">此文章</a>。</div>');

    var existDialog = document.querySelector('.ds-dwt-ui-dlg-wrap');
    if (existDialog && bReturnToInstallDialog) {
        var oldDialogContent = existDialog.firstChild;

        var newDiv = document.createElement('div');
        var newString = ['<div class="dynamsoft-dialog"><div class="dynamsoft-dwt-ltsdlg-header"><span style="color: rgb(255, 255, 255); line-height: 35px; margin-left: 15px;">错误</span><div class="dynamsoft-dialog-close dynamsoft-dialog-hide-lna"></div></div><div class="dynamsoft-dwt-ltsdlg-body" style="padding: 25px 30px 20px;">', ObjString.join(''), '</div></div>'].join('');

        newDiv.innerHTML = newString;
        existDialog.appendChild(newDiv);
        oldDialogContent.style.display = 'none';

        document.querySelector('.dynamsoft-dialog-hide-lna').addEventListener('click', function() {
            newDiv.remove();
            oldDialogContent.style.display = '';

            var dlg = document.querySelector('.ds-dwt-ui-dlg');
            dlg.style.position = 'fixed';
            dlg.style.top = '50%';
            dlg.style.transform = 'translate(-50%, -50%)';
        });
    } else {

        Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
            width: promptDlgWidth,
            headerStyle: 2,
            closeButton: false
        });
    }

    var dlg = document.querySelector('.ds-dwt-ui-dlg');
    if(dlg) {
      dlg.style.position = 'absolute';
      dlg.style.top = '15%';
      dlg.style.transform = 'translate(-50%, -10%)';
    }

    var dlgBody = document.querySelector('.dynamsoft-dwt-ltsdlg-body');
    if(dlgBody) {
      dlgBody.style.padding = '15px 30px';
    }

  }

  Dynamsoft.OnBrowserLNADenied = function(msg, bReturnToInstallDialog, bPromptPermisstion)  {

		var strCaption, ObjString, strLNA_FAQ_URL = getLNA_FAQ_URL(bPromptPermisstion);

    if(bPromptPermisstion) {
      // Infomation
      if(Dynamsoft.navInfoSync.bFirefox) {
        strCaption = '需要操作';
      } else {
        strCaption = '需要授权';
      }

      ObjString = [
        '<div style="color:#323234;font:17px/34px">', ERR_LNANotAllowed, '</div>',
        Dynamsoft.navInfoSync.bChrome || Dynamsoft.navInfoSync.bEdge ? '<div style="color:#323234;font:17px/34px">点击“允许”以授予访问权限。</div>' : '',
        '<div style="color:#323234;font-size:17px;padding:12px 0;">有关更多详细信息，请参考 <a target="_blank" href="',
        strLNA_FAQ_URL,
        ,'">此文章</a>。</div>',
      ].join('');
    } else {
      // Error
      strCaption = '访问被拒绝';
      ObjString = [
        '<div style="color:#323234;font:17px/34px">', ERR_LNADenied, '</div>',
        Dynamsoft.navInfoSync.bChrome || Dynamsoft.navInfoSync.bEdge  ? '<div style="color:#323234;font:17px/34px">请更新您的网站设置以授予访问权限。</div>' : '',
        '<div style="color:#323234;font-size:17px;padding:12px 0;">有关更多详细信息，请参考 <a target="_blank" href="',
        strLNA_FAQ_URL,
        ,'">此文章</a>。</div>',
      ].join('');
    }

    var existDialog = document.querySelector('.ds-dwt-ui-dlg-wrap');
    if(existDialog && bReturnToInstallDialog) {
      var oldDialogContent = existDialog.firstChild,
          newDialogWrapper = [
        '<div class="dynamsoft-dialog"><div class="dynamsoft-dwt-ltsdlg-header"><span style="color: rgb(255, 255, 255); line-height: 35px; margin-left: 15px;">',
        strCaption,
        '</span><div class="dynamsoft-dialog-close dynamsoft-dialog-hide-lna"></div></div><div class="dynamsoft-dwt-ltsdlg-body" style="padding: 25px 40px 20px;">',
        ObjString,
        ,'</div></div>'
      ].join('');

      var newDiv = document.createElement('div');
      Dynamsoft.Lib.setHtml(newDiv, newDialogWrapper);
			existDialog.appendChild(newDiv);
      oldDialogContent.style.display = 'none';

      document.querySelector('.dynamsoft-dialog-hide-lna').addEventListener('click', function(){
        newDiv.remove();
        oldDialogContent.style.display = '';
      });
    } else {

      Dynamsoft.DWT.ShowMessage(ObjString, {
        caption: strCaption,
        width: promptDlgWidth,
        headerStyle: 2,
        closeButton: false
      });
    }

  }

  Dynamsoft.ProcessLicenseErrorContent = function (content) {
    var el = [],
      _content = content;
    if (typeof(_content) != 'string') {
      if (undefined === _content)
        return '';
      if (_content instanceof Error || 'message' in _content)
        _content = _content.message;
      else
        _content = '' + _content;
    }

    var posLeftBracket = _content.indexOf("[");
    var posRightBracket = _content.indexOf("]", posLeftBracket);
    var posLeftParentheses = _content.indexOf("(", posRightBracket);
    var posRightParentheses = _content.indexOf(")", posLeftParentheses);
    if (-1 == posLeftBracket || -1 == posRightBracket || -1 == posLeftParentheses || -1 == posRightParentheses) {
      return _content;
    }

    if (posLeftBracket > 0) {
      el.push(_content.substring(0, posLeftBracket));
    }

    var linkText = _content.substring(posLeftBracket + 1, posRightBracket);
    var linkAddr = _content.substring(posLeftParentheses + 1, posRightParentheses);

    el.push(['<a href="', linkAddr, '" target="_blank" class="dynamsoft-major-color">', linkText, '</a>'].join(''));
    el.push(_content.substring(posRightParentheses + 1));

    return el.join('');
  }
  //--------------------end Product Key-------------------------------

})();