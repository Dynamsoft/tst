# Dynamic Web TWAIN 19.4.2 – `dynamsoft.webtwain.min.js` + 简体中文

This sample loads the all-in-one `dynamsoft.webtwain.min.js` from npm package
[`dwt@19.4.2`](https://www.npmjs.com/package/dwt/v/19.4.2) via jsDelivr. The Simplified Chinese UI is added by one extra
file, `dynamsoft.webtwain.zh-cn.js`. You do not need the `config.js` / `initiate.js` / `install.js` set used by
[`../dwt-19.4.2-zh_cn`](../dwt-19.4.2-zh_cn/).

| File | Purpose |
| --- | --- |
| `index.html` | Demo page: viewer, scanner list, built-in source dialog, scan, import, image editor, clear. Holds the license/resource config and the initialization code. |
| `dynamsoft.webtwain.zh-cn.js` | Localization only. Copied from the Chinese sample with two bug fixes (see below). |
| `dev-dialogs.js` | **Development only.** Simulates the install, upgrade, permission and license dialogs. Loaded only when the URL contains `?dev=1`. |

## Run locally

```bash
# from the repository root
python -m http.server 8765
```

Open <http://localhost:8765/samples/dwt-19.4.2-min-zh_cn/>. Add `?dev=1` to show the dialog simulation panel.

Use `localhost`, not `127.0.0.1`. The shared test license only allows `dynamsoft.github.io`, `localhost` and a few
other hosts, so a page opened on `127.0.0.1` shows an "AppDomain mismatch" license error.

Published copy: <https://dynamsoft.github.io/tst/samples/dwt-19.4.2-min-zh_cn/>

Scanning needs the Dynamic Web TWAIN Service on the client machine. If it is missing, the Chinese install dialog
appears and links to the 19.4.2 installer.

## Configuration (in `index.html`, separate from the localization)

```js
Dynamsoft.DWT.ProductKey = '<license>';  // repository test key; replace with your own
Dynamsoft.DWT.ResourcesPath = 'https://cdn.jsdelivr.net/npm/dwt@19.4.2/dist';                    // dist/src/*.css|js
Dynamsoft.DWT.ServiceInstallerLocation = 'https://demo.dynamsoft.com/DWT/Resources/dist/19.4.2/'; // .msi/.pkg/.deb/.rpm
Dynamsoft.DWT.AutoLoad = false;
Dynamsoft.DWT.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '100%', Height: '100%' }];
```

- **License:** the page uses the shared test key from the repository [README](../../README.md). Get your own trial key at
  <https://www.dynamsoft.com/customer/license/trialLicense?product=dwt>.
- **Installers:** they are not loaded from jsDelivr because jsDelivr returns HTTP 403 for package files this large
  (`dist/dist/*.msi` is about 54 MB). `ServiceInstallerLocation` uses the same pinned 19.4.2 location as the original
  sample. Its `.msi`, `.pkg`, `.deb`, `.rpm`, `-arm64.deb` and `-mips64el.deb` files all returned 200. If you
  self-host, copy `node_modules/dwt/dist/dist/` and point `ServiceInstallerLocation` at it.
- **Initialization:** `AutoLoad` is `false`, and `Dynamsoft.DWT.Load()` runs once behind a guard. `OnWebTwainReady` fires
  after the first load and again when the install dialog's 「我已安装」 button reconnects. The ready handler only
  binds events the first time it sees a `WebTwain` object.

## Reusing the localization in another min.js application

Load the files in this order:

```html
<script src="https://cdn.jsdelivr.net/npm/dwt@19.4.2/dist/dynamsoft.webtwain.min.js"></script>
<script src="dynamsoft.webtwain.zh-cn.js"></script>
<script>
  // your own ProductKey / ResourcesPath / ServiceInstallerLocation / Containers ...
  Dynamsoft.DWT.Load();
</script>
```

- Load it **after** `min.js`. `min.js` defines English versions of the same callbacks, and this file overwrites them.
  If `min.js` is not loaded yet, the file throws `请先加载 dynamsoft.webtwain.min.js。`.
- Load it **before** `Dynamsoft.DWT.Load()`. `min.js` merges `CustomizableDisplayInfo` once, during the first load.
- The file never sets `ProductKey`, `ResourcesPath`, `ServiceInstallerLocation`, `AutoLoad` or `Containers`, so you can
  set them before or after it.
- Callbacks are looked up on the global `Dynamsoft` object each time they are needed. If your app has its own handler
  (for example `Dynamsoft.OnWebTwainNotFoundOnWindowsCallback`), assign it after this file.
- Bundlers: `dynamsoft.webtwain.min.mjs` also sets `globalThis.Dynamsoft`, so `import Dynamsoft from 'dwt';` followed by
  `import './dynamsoft.webtwain.zh-cn.js';` should work. This was not tested.
- The text and dialogs come from 19.4.2 `install.js`, and they call private helpers such as `Dynamsoft._show_install_dialog`
  and `Dynamsoft.Lib.one`. Regenerate the file from that version's `install.js` when you upgrade DWT.

## Where `dynamsoft.webtwain.zh-cn.js` comes from

The file is a short header plus a load-order guard, followed by two blocks copied from
`../dwt-19.4.2-zh_cn/Resources/` (CRLF line endings kept). Apart from the fixes listed below, they are unchanged:

1. `dynamsoft.webtwain.config.js` lines 41–133: the `Dynamsoft.DWT.CustomizableDisplayInfo` assignment (viewer, image
   editor, progress, source-selection and error text).
2. `dynamsoft.webtwain.install.js`, whole file (lines 1–717). This covers the Windows/macOS/Linux install dialogs,
   upgrade, download → 「我已安装」 → reconnect/retry, local-network-access prompts (including the two WebP permission
   screenshots), CORS/HTTPS errors, the mobile notice and the license/LTS dialogs. It also includes the three Base64 PNG icons.

## Fixes applied to the source

Both bugs are also in the original Chinese sample and in the English `install.js` inside `min.js`.

1. **Upgrade title was always 「更新…」.** `OnWebTwainNeedUpgradeCallback` passed `..., strIEVersion, true, true, serviceVer, expectedVer`.
   The extra `true` shifted the arguments, so `_show_install_dialog` compared `parseFloat(true)` (`NaN`) and never showed
   「升级您的附件影像扫描助手」. One `true` is removed. The title is now 「升级…」 when the installed service version is lower
   than the expected one, and 「更新…」 otherwise (including when `min.js` passes no versions).
2. **English 「Error」 header on some dialogs.** `ShowMessage` falls back to the caption `"Error"`, which is hard-coded in
   `min.js`, and `CustomizableDisplayInfo` has no setting for it. `caption: '错误'` is now passed by `OnLicenseError`,
   `OnLTSLicenseError`, `OnHTTPCorsError`, `OnCorsConfigError`, standalone `OnBrowserLNADeniedV2_FF`, and the expired branch
   of `OnLicenseExpiredWarning` (where `strCaption` was undefined).
   `OnLicenseError` was assigned as `Dynamsoft.OnLicenseError || …`. Because `min.js` already defines an English handler,
   the Chinese one never took effect, so it is now assigned unconditionally. To use your own license-error handler,
   assign it after this file.

## Remaining source issues (not changed)

These are also in the English `install.js` inside `min.js`.

1. `_dwt_Reconnect` polls every 2 s instead of 0.5 s in Chromium browsers because their user-agent contains "Safari".
2. The two permission screenshots show English browser UI (Firefox), because they are pictures from the original file.
3. The npm-only `Dynamsoft._show_online_download_dialog` in `min.js` stays English because the Chinese source does not
   have it. `min.js` 19.4.2 never calls it: the only occurrence is its own definition.

## Validation (2026-11-19, Windows, Edge 157, Dynamic Web TWAIN Service installed and running)

Real service and scanner:

- `min.js` from jsDelivr matches the npm tarball (sha256 `fd52995d…7cd0`) and loads with SRI. `zh-cn.js`, `dist/src/`
  CSS/JS and the license server all returned 200. There were no page errors; the only console messages were Edge Tracking
  Prevention warnings for the CDN.
- `node --check` passes on `dynamsoft.webtwain.zh-cn.js`. Apart from the two fixes, the copied blocks match the source. All five
  embedded images decode: three 60×60 PNG icons and two WebP screenshots, 550×209 and 550×191.
- The service connected and found the scanners. A scan from the TWAIN2 FreeImage virtual source worked, and so did
  「清除全部图像」. In the built-in source dialog (「选择数据源：/选择/取消」), choosing a source synced the dropdown.
- The image editor showed all 28 toolbar tooltips in Chinese, and the rotate dialog showed 「角度/插值方式/保持大小/确定/取消」.
- Isolation test: loading `zh-cn.js` after setting sentinel values left `ProductKey`, `ResourcesPath`,
  `ServiceInstallerLocation`, `AutoLoad`, `Containers` and the other `min.js` defaults unchanged. Loading `zh-cn.js`
  without `min.js` throws the guard error.

Simulated with `?dev=1` (callbacks called directly; no real missing service, permission or license state):

- **Install dialogs:** Windows, macOS and Linux (deb/rpm radio switches the link) all render both icons. The download
  links point to the 19.4.2 `.msi`/`.pkg`/`.deb`/`.rpm`.
- **Install flow:** clicking 「下载」 switches to 「安装附件影像扫描助手」 and shows 「我已安装」. The test harness blocked
  the 54 MB download itself. Clicking 「我已安装」 shows 「正在连接服务...」. Against the real running service, the real
  `CheckConnectToTheService` succeeded and the dialog closed without creating a second `WebTwain` object.
- **Retry:** with `CheckConnectToTheService` temporarily forced to fail by the test harness, 「无法连接到服务。」 and
  「重试连接」 appeared after 10 s. With the real check restored, 「重试连接」 reconnected and closed the dialog.
- **Other dialogs:** upgrade, local-network-access prompt and denied (standalone and inside the install dialog, where
  closing returns to the install dialog), the screenshot version, LTS error, cached-license warning, trial expiring and
  expired, license error, HTTP/CORS errors and the mobile notice.
- **After the fixes:** the upgrade dialog with service `19.0` / expected `19.4` shows 「升级您的附件影像扫描助手」. With
  equal versions or no versions it shows 「更新…」. The license, LTS, HTTP/CORS, CORS-config, expired-trial and
  screenshot-permission dialogs show the header 「错误」. The trial-expiring warning keeps 「警告」.

Not tested: a genuinely missing or outdated service, a real browser local-network-access prompt or denial (the page was
served from `localhost`), macOS/Linux hosts, Firefox/Safari, IE/ActiveX paths, mobile devices, a real expired or invalid
license, and bundler (ESM) integration.
