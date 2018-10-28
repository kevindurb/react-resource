import { assertType } from './utils';
import { Resource } from './Resource';
import { getUrlFromResource } from './utils';

const typeMethodMap = {
  create: 'POST',
  read: 'GET',
  update: 'PUT',
  delete: 'DELETE',
};

const makeRequest = (type, resource, data, id) => {
  const request =  {
    method: typeMethodMap[type],
    url: getUrlFromResource(resource, id),
  };

  if (data) {
    let body;

    try {
      body = JSON.stringify(data);
    } catch (e) {
      console.error('Error stringifing body');
      throw e;
    }

    return {
      ...request,
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
  }

  return request;
};

export const doCreate = (resource, data) => {
  assertType(Resource, resource);
  const request = makeRequest('create', resource, data);
  return resource.connection.fetch(request);
};

export const doRead = (resource, id) => {
  assertType(Resource, resource);
  const request = makeRequest('read', resource, null, id);
  return resource.connection.fetch(request);
};

export const doUpdate = (resource, data, id) => {
  assertType(Resource, resource);
  const request = makeRequest('update', resource, data, id);
  return resource.connection.fetch(request);
};

export const doDelete = (resource, id) => {
  assertType(Resource, resource);
  const request = makeRequest('delete', resource, null, id);
  return resource.connection.fetch(request);
};
