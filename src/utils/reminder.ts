import { window, env, Uri } from "vscode";
import { BASALAMIHA_BASE_DOMAIN } from "../constants";

/**
 * Sets a lunch reservation reminder for the next week if today is Wednesday.
 * @async
 */

export async function setReserveReminder() {
  const isItWednesday = new Date().getDay() === 3;

  if (isItWednesday) {
    const buttons = [
      {
        title: "رزرو",
        shouldOpen: true,
      },
      {
        title: "میخوام گشنه بمونم",
        shouldOpen: false,
      },
    ];

    const message = await window.showWarningMessage(
      "یادت نره برای هفته بعدت ناهار رزرو کنی!",
      ...buttons
    );

    if (message?.shouldOpen) {
      env.openExternal(Uri.parse(`${BASALAMIHA_BASE_DOMAIN}/lunch/reserve`));
    }
  }
}
