interface PrefetchReplaceRouter {
  replace: (href: string) => void;
  prefetch?: (href: string) => void;
}

const prefetchAndReplace = (router: PrefetchReplaceRouter, href: string) => {
  router.prefetch?.(href);
  router.replace(href);
};

export default prefetchAndReplace;
