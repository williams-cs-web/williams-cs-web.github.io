// Warms the browser's image cache for pages the visitor hasn't clicked into
// yet, so the top-menu tabs feel instant instead of popping in images on
// first visit. Runs during idle time (falling back to a short timeout on
// Safari, which has no requestIdleCallback) so it never competes with the
// current page's own images for bandwidth.
export const prefetchImages = (paths) => {
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000))
  schedule(() => {
    paths.forEach((path) => {
      const img = new Image()
      img.src = path
    })
  })
}
