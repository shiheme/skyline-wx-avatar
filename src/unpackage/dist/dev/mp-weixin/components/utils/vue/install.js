"use strict";
const withNoopInstall = (component) => {
  component.install = () => {
  };
  return component;
};
exports.withNoopInstall = withNoopInstall;
