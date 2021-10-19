import * as vscode from "vscode";
import * as commands from "./commands";
import * as functions from "./functions";

// Bottom menu in vscode
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right
);

export async function activate(context: vscode.ExtensionContext) {
  const apiKey: ApiKey = await functions.handleUserApiKey();
  const lunch: string = await functions.getTodayLunch(apiKey);

  statusBar.text = lunch || "!ناهار نداریم";
  statusBar.show();

  // Commands
  let refreshApi = vscode.commands.registerCommand(
    "basalam-tahdig.refresh_api",
    commands.refreshLunchApi.bind({}, statusBar, apiKey)
  );

  const changeApiKey = vscode.commands.registerCommand(
    "basalam-tahdig.change_api",
    commands.changeApiKey
  );

  context.subscriptions.push(refreshApi, changeApiKey);
}

// export function deactivate() {}
