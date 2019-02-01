import AbortablePromise from "./abortablePromise";

export default function Interceptor() {
  const interceptor = {
    register(interceptor) {
      this.interceptors.push(interceptor);
      return () => this.unregister(interceptor);
    },

    unregister(interceptor) {
      const index = this.interceptors.indexOf(interceptor);
      if (index >= 0) {
        this.interceptors.splice(index, 1);
      }
    },

    clear() {
      this.interceptors = [];
    },

    interceptRequest(abortController, fRequest) {
      let promise = AbortablePromise.resolve(abortController, fRequest);

      this.interceptors.forEach(({ request, requestError } = {}) => {
        if (typeof request === "function") {
          promise = promise.then(req =>
            request(req)
          );
        }
        if (typeof requestError === "function") {
          promise = promise.catch(requestError);
        }
      });

      return promise;
    },

    interceptResponse(abortController, response) {
      let promise = AbortablePromise.resolve(abortController, response);
      const reversedInterceptors = this.interceptors.slice().reverse();

      reversedInterceptors.forEach(({ response, responseError }) => {
        if (typeof response === "function") {
          promise = promise.then(response);
        }
        if (typeof responseError === "function") {
          promise = promise.catch(responseError);
        }
      });
      return promise
    },
  }

  interceptor.interceptors = []

  return interceptor
}
