import { handleUserToken } from "./utils/user";
import { StatusBarItem, commands } from "vscode";
import { getTodayLunch, removeConfigFile } from "./functions";

export async function refreshLunchApi(
  statusBar: StatusBarItem,
  apiKey: ApiKey
) {
  try {
    statusBar.text = "...در حال دریافت اطلاعات";
    const lunch = await getTodayLunch(apiKey);

    statusBar.text = lunch || "!ناهار نداریم";
  } catch (error) {
    statusBar.text = "خطا در دریافت اطلاعات";
  }
}

export async function changeApiKey() {
  await removeConfigFile();
  await handleUserToken();

  commands.executeCommand("workbench.action.reloadWindow");
}
