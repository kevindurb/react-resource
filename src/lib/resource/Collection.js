import { assertType } from './utils';
import { Resource } from './Resource';
import { Connection } from './Connection';

export class Collection extends Resource {
  static of = (...args) =>
    new Collection(...args);

  constructor(name, connection) {
    assertType(String, name);
    assertType(Connection, connection);

    super();

    this.name = name;
    this.connection = connection;
  }
}
