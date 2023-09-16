import {
  isConfigFileExist,
  readConfigFile,
  createConfigFile,
} from "../utils/config";
import { window } from "vscode";
import { BASALAMIHA_BASE_DOMAIN } from "../constants";

/**
 * Handles the retrieval of a user's Tahdig token. If a configuration file exists,
 * the token is obtained from it. Otherwise, the user is prompted to enter their token.
 * @async
 */

export async function handleUserToken() {
  if (await isConfigFileExist()) {
    return getTokenFromTheConfigFile();
  }

  const token = await getTokenFromTheUser();
  createConfigFile({ token });

  return token;
}

/**
 * Prompts the user to enter their Tahdig token.
 * @async
 */

export async function getTokenFromTheUser() {
  return await window.showInputBox({
    prompt: "Please enter your Tahdig token here",
    placeHolder: `You can get your Tahdig token from ${BASALAMIHA_BASE_DOMAIN}/setting/tokens`,
    value: "",
    ignoreFocusOut: true,
  });
}

/**
 * Retrieves the user's Tahdig token from the configuration file.
 * @async
 */

export async function getTokenFromTheConfigFile() {
  const configs = await readConfigFile();

  return configs.token;
}
