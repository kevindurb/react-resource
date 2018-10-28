import path from 'path';
import { assertType } from './utils';
import { Resource } from './Resource';
import { Connection } from './Connection';

export class Element extends Resource {
  static of = (...args) =>
    new Element(...args);

  constructor(name, connection) {
    assertType(String, name);
    assertType(Connection, connection);

    super();

    this.name = name;
    this.connection = connection;
  }
}
