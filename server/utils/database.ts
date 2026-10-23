import schemaSql from '~/server/db/migrations/schema.sql'
import { db } from 'hub:db'

export async function initializeDatabase() {
  return Boolean(db && schemaSql)
}
