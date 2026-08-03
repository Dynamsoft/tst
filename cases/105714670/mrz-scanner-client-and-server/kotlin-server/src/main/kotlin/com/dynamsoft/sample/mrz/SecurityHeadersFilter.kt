package com.dynamsoft.sample.mrz

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Required headers for SharedArrayBuffer (used by the DCV WASM engine in the browser).
 * Equivalent to the Flask backend's `@app.after_request` hook.
 */
@Component
class SecurityHeadersFilter : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        response.setHeader("Cross-Origin-Opener-Policy", "same-origin")
        response.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        filterChain.doFilter(request, response)
    }
}
