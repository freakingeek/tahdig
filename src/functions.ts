import axios from "axios";
import { unlink } from "fs";
import * as path from "path";
import { homedir } from "os";
import { window, env, Uri } from "vscode";

export async function removeConfigFile() {
  const userHome = homedir();
  const configPath = path.join(userHome, ".tahdig.cfg");

  await unlink(configPath, (error) => {
    if (error) {
      return console.error("Error:", error);
    }
  });
}

export async function getTodayLunch(apiKey: ApiKey = "") {
  try {
    const res = await axios.get("https://basalamiha.com/api/v1/lunch/today", {
      headers: {
        Authorization: `Bearer ${apiKey.replace(/\n/g, "")}`,
      },
    });

    return res.data?.food;
  } catch (error) {
    console.error("[getTodayLunch]", error);

    return "مشکلی پیش آمده";
  }
}

export async function remindReserveLunch() {
  const now = new Date();

  if (now.getDay() === 3) { // if its thursday (panjshanbe)
    const options = [
      {
        title: 'رزرو',
        shouldOpen: true
      }, {
        title: 'میخوام گشنه بمونم',
        shouldOpen: false
      }
    ];

    const res = await window.showWarningMessage('رزرو ناهار هفته بعد یادت نره !', ...options);
    
    if (res?.shouldOpen) env.openExternal(Uri.parse('https://basalamiha.com/lunch/reserve'));
  }
}