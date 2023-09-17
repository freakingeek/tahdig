import * as vscode from "vscode";
import { Token } from "./types/user";
import { handleUserToken } from "./utils/user";
import { setReserveReminder } from "./utils/reminder";
import { fetchTodaysLunch } from "./apis/fetchTodaysLunch";
import { refreshResult, replaceToken } from "./commands/index";

// Bottom menu in vscode
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right
);

export async function activate(context: vscode.ExtensionContext) {
  const token: Token = await handleUserToken();
  const lunch = await fetchTodaysLunch(token);

  statusBar.text = lunch || "!ناهار نداریم";
  statusBar.show();

  // Set reserve reminder
  setReserveReminder();

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
