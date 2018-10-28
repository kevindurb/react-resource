import assert from 'assert';
import path from 'path';
import { URL } from 'url';
import { Resource } from './Resource';
import { Element } from './Element';

export const is = (type, value) => {
  if (value == null) {
    return false;
  }

  if (value instanceof type) {
    return true;
  }

  if (value.constructor === type) {
    return true;
  }

  if (value.constructor.name === type.name) {
    return true;
  }

  return false;
};

export const assertType = (type, value) => (
  assert(
    is(type, value),
    `Value must be of type ${type.name} got ${value.constructor.name}`,
  )
);

export const getUrlFromResource = (resource, id) => {
  assertType(Resource, resource);

  const baseUrl = resource.connection.baseUrl;
  const name = resource.name;
  const url = new URL(baseUrl);
  if (is(Element, resource)) {
    url.pathname = path.join(url.pathname, name, id.toString());
  } else {
    url.pathname = path.join(url.pathname, name);
  }

  return url.toString();
};
