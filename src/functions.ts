import axios from "axios";
import * as path from "path";
import { homedir } from "os";
import { window, env, Uri } from "vscode";
import { existsSync, readFileSync, writeFile, unlink } from "fs";

export async function handleUserApiKey() {
  let apiKey: ApiKey;

  if (hasConfigFile()) {
    const configFile = await getConfigFile();
    apiKey = configFile?.split("= ")[1] || "";
  } else {
    apiKey = await getApiKeyFromUser();

    await generateConfigFile({ apiKey });
  }

  return apiKey;
}

export async function getApiKeyFromUser() {
  return await window.showInputBox({
    prompt: "Enter your tahdig api key",
    placeHolder:
      "Enter your tahdig api key from http://basalamiha.ir/setting/tokens",
    value: "",
    ignoreFocusOut: true,
  });
}

export function hasConfigFile() {
  try {
    const userHome = homedir();
    const configPath = path.join(userHome, ".tahdig.cfg");

    // let hasConfigFile;
    // fs.stat(configPath, (error) => {
    //   if (error?.code === "ENOENT") {
    //     hasConfigFile = false;
    //   } else if (error) {
    //     throw error;
    //   } else {
    //     hasConfigFile = true;
    //   }
    // });

    return !!existsSync(configPath);
  } catch (error) {
    console.error("[has config file] Error:", error);
  }
}

export async function getConfigFile() {
  const userHome = homedir();
  const configPath = path.join(userHome, ".tahdig.cfg");

  return await readFileSync(configPath, { encoding: "utf-8" });
}

export async function removeConfigFile() {
  const userHome = homedir();
  const configPath = path.join(userHome, ".tahdig.cfg");

  await unlink(configPath, (error) => {
    if (error) {
      return console.error("Error:", error);
    }
  });
}

export async function generateConfigFile(config: Config) {
  try {
    const home = await homedir();
    const configPath = path.join(home, ".tahdig.cfg");

    const template = `[settings]\napi_key= ${config.apiKey?.trim()}`;

    await writeFile(configPath, template, (error) => {
      if (error) {
        throw error;
      }
    });

    return;
  } catch (error) {
    console.error("[generateConfigFile] Error:", error);
  }
}

export async function getTodayLunch(apiKey: ApiKey = "") {
  try {
    const res = await axios.get("https://basalamiha.ir/api/v1/lunch/today", {
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
    
    if (res?.shouldOpen) env.openExternal(Uri.parse('https://basalamiha.ir/lunch/reserve'));
  }
}