import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { logger } from "./logger.js";

let client: Pool | null = null;

const connect = async (): Promise<void> => {
  logger.info("[DB] Connecting...");

  client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  });

  try {
    await client.query("SELECT 1+1");
    // await client.connect();
    logger.info("[DB] Connected!");
  } catch (error) {
    logger.error("[DB] Failed to connect", error);
    throw error;
  }
};

export const query = async <TResult extends QueryResultRow = any>(
  sql: string,
  params?: any[],
  log = process.env.LOG,
): Promise<QueryResult<TResult>> => {
  if (client) {
    try {
      if (log) {
        logger.debug(`${sql} ${JSON.stringify(params)}`);
      }
      return await client.query<TResult>(sql, params);
    } catch (error) {
      logger.error("Query failed", error);
      throw new Error("Database Error");
    }
  }
  throw new Error("Database client is not connected");
};

const disconnect = async (): Promise<void> => {
  if (client) {
    logger.info("Disconnecting from DB");
    try {
      await client.end();
      logger.info("Disconnected from DB");
    } catch (error) {
      logger.error("Failed to disconnect from DB", error);
      throw error;
    }
  } else {
    logger.warn("Not connected to DB");
  }
};

export default { connect, disconnect };
