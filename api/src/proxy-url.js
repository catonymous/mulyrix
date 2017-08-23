export default function proxyUrl(url) {
    return `/api/proxy/${encodeURIComponent(url)}`
}
