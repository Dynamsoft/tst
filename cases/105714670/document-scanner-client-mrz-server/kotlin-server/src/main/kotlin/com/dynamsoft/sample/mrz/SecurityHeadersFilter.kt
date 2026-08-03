package com.dynamsoft.sample.mrz

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Cross-origin isolation headers for the browser-side DCV WASM engine, currently
 * DISABLED. web-client/vite.config.ts has the same pair commented out, so dev and
 * production behave the same — keep them in step, or the engine picks a different
 * WASM build in each and problems only surface after deployment.
 *
 * Uncomment to opt into `SharedArrayBuffer`, which lets the engine use its
 * multi-threaded build: faster capture, most noticeably on mobile. The cost is
 * that COEP `require-corp` blocks every subresource without a CORP header —
 * CDN scripts included — which is why the engine is self-hosted under
 * web-client/public/dynamsoft/.
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
