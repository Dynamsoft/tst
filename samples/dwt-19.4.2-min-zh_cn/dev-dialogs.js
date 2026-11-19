/*
 * DEVELOPMENT ONLY — loaded by index.html when the URL contains ?dev=1.
 *
 * Calls the localized callbacks from dynamsoft.webtwain.zh-cn.js directly with
 * arguments shaped like the ones min.js passes, so the install / upgrade /
 * permission / license dialogs can be reviewed without uninstalling the
 * Dynamic Web TWAIN Service or breaking the license. Nothing here reflects the
 * real service or license state. Do not ship this file.
 */
(function () {
  'use strict';

  var D = Dynamsoft;
  var P = D.DWT.EnumDWT_PlatformType;
  var dir = D.DWT.ServiceInstallerLocation;
  var name = 'Dynamic Web TWAIN';
  var ssl = location.protocol === 'https:';
  var url = {
    msi: dir + 'DynamicWebTWAINServiceSetup.msi',
    pkg: dir + 'DynamicWebTWAINServiceSetup.pkg',
    deb: dir + 'DynamicWebTWAINServiceSetup.deb',
    rpm: dir + 'DynamicWebTWAINServiceSetup.rpm'
  };

  var cases = [
    ['Windows 未安装服务', function () {
      D.OnWebTwainNotFoundOnWindowsCallback(name, url.msi, true, false, false, ssl, '');
    }],
    ['macOS 未安装服务', function () {
      D.OnWebTwainNotFoundOnMacCallback(name, url.pkg, true, false, false, ssl, '');
    }],
    ['Linux 未安装服务', function () {
      D.OnWebTwainNotFoundOnLinuxCallback(name, url.deb, url.rpm, true, false, false, ssl, '', P.enumLinux);
    }],
    ['Windows 服务需升级', function () {
      D.OnWebTwainNeedUpgradeCallback(name, { 'default': url.msi }, true, P.enumWindow, false, false, ssl, '', '19.0', '19.4');
    }],
    ['本地网络权限：待授权', function () {
      D.OnBrowserLNADenied('', false, true);
    }],
    ['本地网络权限：已拒绝', function () {
      D.OnBrowserLNADenied('', false, false);
    }],
    ['安装对话框内的权限提示', function () {
      D.OnWebTwainNotFoundOnWindowsCallback(name, url.msi, true, false, false, ssl, '');
      D.OnBrowserLNADenied('', true, true);
    }],
    ['本地网络权限（截图版）', function () {
      D.OnBrowserLNADeniedV2_FF('', false);
    }],
    ['许可证服务器连接失败', function () {
      D.OnLTSLicenseError('【模拟】Failed to connect to the license server. Please check your Internet connection.', -2440);
    }],
    ['许可证缓存警告', function () {
      D.OnLTSConnectionWarning();
    }],
    ['试用密钥即将过期', function () {
      D.OnLicenseExpiredWarning('2026-12-31', 3, true);
    }],
    ['试用密钥已过期', function () {
      D.OnLicenseExpiredWarning('2026-11-01', 0, true);
    }],
    ['许可证错误', function () {
      D.OnLicenseError('【模拟】The license is invalid. [Request a trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dwt).', -2800);
    }],
    ['HTTP / CORS 错误', function () {
      D.OnHTTPCorsError('【模拟】Mixed content: this page cannot reach the local service over HTTP.');
    }],
    ['CORS 配置错误', function () {
      D.OnCorsConfigError('【模拟】Cross-origin request blocked.');
    }],
    ['移动端不支持', function () {
      D.OnMobileNotSupportCallback();
    }]
  ];

  var panel = document.createElement('fieldset');
  panel.id = 'devDialogs';
  panel.style.cssText = 'margin:0 20px 20px;padding:10px 14px;border:2px dashed #c00;background:#fff8f8';
  panel.innerHTML = '<legend style="color:#c00;font-weight:bold">开发调试：对话框模拟（非真实状态，仅供 ?dev=1 使用）</legend>';
  cases.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = c[0];
    b.style.margin = '4px';
    b.onclick = function () {
      D.DWT.CloseDialog();
      c[1]();
    };
    panel.appendChild(b);
  });
  document.body.appendChild(panel);
})();
