import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withContext, getContext } from "recompose";

export const AsyncData = withContext(
  { asyncContext: PropTypes.object },
  ({ request, error, success }) => ({
    asyncContext: {
      request: error || success ? null : request,
      error,
      success,
      fallback: request || error || success ? null : true
    }
  })
)(({ children }) => <Fragment>{children}</Fragment>);

export const OnFallback = getContext({ asyncContext: PropTypes.object })(
  ({ asyncContext: { fallback }, children }) => (
    <Fragment>{fallback ? children : null}</Fragment>
  )
);
export const OnRequest = getContext({ asyncContext: PropTypes.object })(
  ({ asyncContext: { request }, children }) => (
    <Fragment>{request ? children : null}</Fragment>
  )
);
export const OnError = getContext({ asyncContext: PropTypes.object })(
  ({ asyncContext: { error }, children }) => (
    <Fragment>{error ? children : null}</Fragment>
  )
);
export const OnSuccess = getContext({ asyncContext: PropTypes.object })(
  ({ asyncContext: { success }, children }) => (
    <Fragment>{success ? children : null}</Fragment>
  )
);

export default {
  AsyncData,
  OnFallback,
  OnRequest,
  OnError,
  OnSuccess
};
