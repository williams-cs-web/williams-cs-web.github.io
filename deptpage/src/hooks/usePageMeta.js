import { useEffect } from "react";

const DEFAULT_TITLE = "Computer Science - Williams College";
const DEFAULT_DESCRIPTION = "The Computer Science department at Williams College: courses, majors, research opportunities, colloquium talks, and student life.";

// Sets this route's <title> and meta description, restoring the site-wide
// defaults on unmount so navigating between routes never leaves a stale
// title/description behind for the next page to inherit.
export const usePageMeta = ({ title, description, noindex } = {}) => {
  useEffect(() => {
    document.title = title ? `${title} | Computer Science | Williams College` : DEFAULT_TITLE;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", description || DEFAULT_DESCRIPTION);

    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement("meta");
        robotsTag.setAttribute("name", "robots");
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute("content", "noindex");
    } else if (robotsTag) {
      robotsTag.remove();
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (descriptionTag) descriptionTag.setAttribute("content", DEFAULT_DESCRIPTION);
      if (noindex) document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [title, description, noindex]);
};
