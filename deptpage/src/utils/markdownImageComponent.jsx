import { withBase } from "./withBase.js";

// Article markdown hardcodes image paths as site-root-absolute
// (e.g. "/images/misc/foo.png"), same as the JSON data files. react-markdown
// renders those verbatim, so pass this as `components={{ img: ... }}` to
// rewrite them relative to Vite's BASE_URL.
export const markdownImageComponent = {
  img: ({ src, ...props }) => (
    <img src={typeof src === "string" && src.startsWith("/") ? withBase(src) : src} {...props} />
  ),
};
