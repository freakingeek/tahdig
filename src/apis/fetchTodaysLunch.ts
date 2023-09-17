import axios from "axios";
import { Token } from "../types/user";
import { BASALAMIHA_BASE_DOMAIN } from "../constants";

export async function fetchTodaysLunch(token: Token) {
  try {
    const res = await axios.get(
      `${BASALAMIHA_BASE_DOMAIN}/api/v1/lunch/today`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data?.food;
  } catch (error) {
    console.error("[getTodayLunch]", error);

    return "مشکلی پیش آمده";
  }
}
