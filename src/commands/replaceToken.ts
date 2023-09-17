import { commands } from "vscode";
import { handleUserToken } from "../utils/user";
import { deleteConfigFile } from "../utils/config";

async function replaceToken() {
  await deleteConfigFile();
  await handleUserToken();

  commands.executeCommand("workbench.action.reloadWindow");
}

export default replaceToken;
