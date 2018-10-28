import { assertType } from './utils';

export class Connection {
  static of = (...args) =>
    new Connection(...args);

  constructor(baseUrl, fetch = global.fetch) {
    assertType(String, baseUrl);
    assertType(Function, fetch);

    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }
}
