import { sql } from 'drizzle-orm';
import {
  pgTable,
  integer,
  timestamp,
  uuid as pgUuid,
  varchar,
  index,
  unique
} from 'drizzle-orm/pg-core';

const uuid = pgUuid;

export const apiCalls = pgTable(
  'api_calls',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    type: varchar('type', { length: 20 }).notNull(),
    count: integer('count').default(0),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
  },
  (table) => ({
    typeIndex: index('api_calls_type_idx').on(table.type),
    typeUnique: unique('api_calls_type_unique').on(table.type)
  }),
  // Removed invalid fourth argument
);

export const apiCallTypes = pgTable(
  'api_call_types',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    type: varchar('type', { length: 20 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
  },
  (table) => ({
    typeUnique: unique('api_call_types_type_unique').on(table.type)
  })
);

export const apiStats = pgTable(
  'api_stats',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    stateCalls: integer('state_calls').default(0),
    lgaCalls: integer('lga_calls').default(0),
    puCalls: integer('pu_calls').default(0),
    wardCalls: integer('ward_calls').default(0),
    lastUpdated: timestamp('last_updated', { withTimezone: true }).defaultNow()
  },
  undefined
  // Removed invalid fourth argument
);

export const schema = {
  apiCalls,
  apiCallTypes,
  apiStats
};
