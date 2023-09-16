import { promises as fs } from "fs";
import type { Configs } from "../types/config";
import { CONFIG_FILE_PATH } from "../constants";

/**
 * This function checks if a configuration file exists in the user's home directory.
 * @async
 */

export async function isConfigFileExist() {
  return !!(await fs.stat(CONFIG_FILE_PATH).catch(() => false));
}

/**
 * Reads and parses a configuration file at the specified path.
 * @async
 */

export async function readConfigFile(): Promise<Configs> {
  const configs = await fs.readFile(CONFIG_FILE_PATH, { encoding: "utf-8" });

  return JSON.parse(configs);
}

/**
 * Creates a configuration file at the specified path with the provided configurations.
 * @param {Configs} configs - The configurations to be written to the file.
 * @async
 */

export async function createConfigFile(configs: Configs) {
  await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(configs));
}

/**
 * Deletes the configuration file at the specified path.
 * @async
 */

export async function deleteConfigFile() {
  await fs.unlink(CONFIG_FILE_PATH);
}
