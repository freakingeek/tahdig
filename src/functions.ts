import { window, env, Uri } from "vscode";

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