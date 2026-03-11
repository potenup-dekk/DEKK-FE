import { setupWorker } from "msw/browser";
import handlers from "@/shared/mocks/handlers";

let workerStartPromise: Promise<ServiceWorkerRegistration | undefined> | null =
  null;

const worker = setupWorker(...handlers);

const startMocking = () => {
  if (!workerStartPromise) {
    workerStartPromise = worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }

  return workerStartPromise;
};

export default startMocking;
