import * as vscode from "vscode";
import { Token } from "./types/user";
import { handleUserToken } from "./utils/user";
import { refreshResult, replaceToken } from "./commands";
import { fetchTodaysLunch } from "./apis/fetchTodaysLunch";

// Bottom menu in vscode
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right
);

export async function activate(context: vscode.ExtensionContext) {
  const token: Token = await handleUserToken();
  const lunch = await fetchTodaysLunch(token);

  statusBar.text = lunch || "!ناهار نداریم";
  statusBar.show();

  // functions.remindReserveLunch();

  // Commands
  let refreshApi = vscode.commands.registerCommand(
    "basalam-tahdig.refresh_api",
    refreshResult.bind({}, statusBar, token)
  );

  const changeApiKey = vscode.commands.registerCommand(
    "basalam-tahdig.change_api",
    replaceToken
  );

  context.subscriptions.push(refreshApi, changeApiKey);
}

// export function deactivate() {}
