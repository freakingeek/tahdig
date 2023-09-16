import { homedir } from "os";
import { join } from "path";

export const CONFIG_FILE_PATH = join(homedir(), ".tahdig.cfg");
