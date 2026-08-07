package com.dynamsoft.sample.mrz

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Cross-origin isolation headers for the browser-side DCV WASM engine, currently
 * DISABLED. Unlike the document-scanner-client-mrz-server sample, web-client/vite.config.ts
 * here has no matching COOP/COEP block (commented out or otherwise) to keep in step —
 * this sample loads the MRZ Scanner engine from its default (non-self-hosted) location,
 * so there is no CORP-header concern to opt into `SharedArrayBuffer` for.
 *
 * Uncomment to opt into `SharedArrayBuffer`, which lets the engine use its
 * multi-threaded build: faster capture, most noticeably on mobile. The cost is
 * that COEP `require-corp` blocks every subresource without a CORP header —
 * CDN scripts included — so doing so would require self-hosting the engine
 * resources first, as document-scanner-client-mrz-server does.
 */
@Component
class SecurityHeadersFilter : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        // response.setHeader("Cross-Origin-Opener-Policy", "same-origin")
        // response.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        filterChain.doFilter(request, response)
    }
}
