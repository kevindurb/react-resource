import {
  Connection,
  Collection,
  Element,
  doRead,
  doCreate,
  doUpdate,
  doDelete,
} from './';

describe('getting a collection from an api', () => {
  const result = [
    { name: 'kevin' },
    { name: 'autumn' },
    { name: 'trey' },
  ];
  const fetch = jest.fn(() => Promise.resolve(result));
  const baseUrl = 'http://api.example.com/api';
  let connection;
  let collection;

  it('should be able to make a connection', () => {
    connection = Connection.of(baseUrl, fetch);
  });

  it('should be able to make a collection', () => {
    collection = Collection.of(
      'people',
      connection,
    );
  });

  it('should be able to read the collection', async () => {
    const readResult = await doRead(collection);

    expect(fetch).toBeCalledWith({
      method: 'GET',
      url: `${baseUrl}/people`,
    });
    expect(readResult).toEqual(result)
  });
});

describe('getting an element from an api', () => {
  const result = { name: 'kevin' };
  const fetch = jest.fn(() => Promise.resolve(result));
  const baseUrl = 'http://api.example.com/api';
  let connection;
  let element;

  it('should be able to make a connection', () => {
    connection = Connection.of(baseUrl, fetch);
  });

  it('should be able to make an element', () => {
    element = Element.of(
      'people',
      connection,
    );
  });

  it('should be able to read the element', async () => {
    const readResult = await doRead(element, 1);

    expect(fetch).toBeCalledWith({
      method: 'GET',
      url: `${baseUrl}/people/1`,
    });
    expect(readResult).toEqual(result)
  });
});

describe('creating an element', () => {
  const result = { name: 'kevin' };
  const fetch = jest.fn(() => Promise.resolve(result));
  const baseUrl = 'http://api.example.com/api';
  let connection;
  let collection;

  it('should be able to make a connection', () => {
    connection = Connection.of(baseUrl, fetch);
  });

  it('should be able to make a collection', () => {
    collection = Collection.of(
      'people',
      connection,
    );
  });

  it('should be able to read the collection', async () => {
    const readResult = await doCreate(collection, result);

    expect(fetch).toBeCalledWith({
      method: 'POST',
      url: `${baseUrl}/people`,
      body: JSON.stringify(result),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    expect(readResult).toEqual(result)
  });
});

describe('updating an element', () => {
  const result = { name: 'kevin' };
  const fetch = jest.fn(() => Promise.resolve(result));
  const baseUrl = 'http://api.example.com/api';
  let connection;
  let element;

  it('should be able to make a connection', () => {
    connection = Connection.of(baseUrl, fetch);
  });

  it('should be able to make an element', () => {
    element = Element.of(
      'people',
      connection,
    );
  });

  it('should be able to update the element', async () => {
    const readResult = await doUpdate(element, result, 1);

    expect(fetch).toBeCalledWith({
      method: 'PUT',
      url: `${baseUrl}/people/1`,
      body: JSON.stringify(result),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    expect(readResult).toEqual(result)
  });
});

describe('deleting an element', () => {
  const fetch = jest.fn(() => Promise.resolve());
  const baseUrl = 'http://api.example.com/api';
  let connection;
  let element;

  it('should be able to make a connection', () => {
    connection = Connection.of(baseUrl, fetch);
  });

  it('should be able to make an element', () => {
    element = Element.of(
      'people',
      connection,
    );
  });

  it('should be able to update the element', async () => {
    await doDelete(element, 1);

    expect(fetch).toBeCalledWith({
      method: 'DELETE',
      url: `${baseUrl}/people/1`,
    });
  });
});
