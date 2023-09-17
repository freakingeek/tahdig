import { Token } from "../types/user";
import { StatusBarItem } from "vscode";
import { fetchTodaysLunch } from "../apis/fetchTodaysLunch";

async function refreshResult(statusBar: StatusBarItem, token: Token) {
  try {
    statusBar.text = "...در حال دریافت اطلاعات";
    const lunch = await fetchTodaysLunch(token);

    statusBar.text = lunch || "!ناهار نداریم";
  } catch (error) {
    statusBar.text = "خطا در دریافت اطلاعات";
  }
}

export default refreshResult;
