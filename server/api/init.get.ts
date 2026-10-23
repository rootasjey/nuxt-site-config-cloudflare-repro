export default defineEventHandler(async () => ({ ok: await initializeDatabase() }))
