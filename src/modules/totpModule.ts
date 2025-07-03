import JSSHA from "jssha";

function dec2hex (s: number) {
  const H = (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  return H;
}
function hex2dec (s: string) {
  const D = Number.parseInt(s, 16);
  return D;
}
function leftpad (s: string, l: number, p: string) {
  let lp = s;
  const { length } = s ?? {}
  if (l + 1 >= length) {
    lp = Array(l + 1 - length).join(p) + s;
  }
  return lp;
}
function base32tohex (s: string) {
  let b = "";
  let h = "";
  const { length: sl } = s ?? {};
  for (let i = 0; i < sl; i++) {
    const V = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(s.charAt(i).toUpperCase());
    b += leftpad(V.toString(2), 5, "0");
  }
  const { length: bl } = b ?? {};
  for (let i = 0; i + 4 <= bl; i += 4) {
    const C = b.slice(i, i + 4);
    h += Number.parseInt(C, 2).toString(16);
  }
  return h;
}
export async function totp ({
  period,
  secret,
}: {
  period?: number;
  secret: string;
}) {
  if (!secret) return "";

  const REFRESH_PERIOD = period ?? 30;
  const TOKEN_SECRET = secret;

  const S = new JSSHA("SHA-1", "HEX");
  S.setHMACKey(base32tohex(TOKEN_SECRET), "HEX");
  const T = new Date().getTime();
  S.update(leftpad(dec2hex(Math.floor(Math.round(T / 1000.0) / REFRESH_PERIOD)), 16, "0"));

  const H = S.getHMAC("HEX");
  const { length } = H ?? {};
  const HP = hex2dec(H.substring(length - 1)) * 2;
  const K = `${hex2dec(H.substring(HP, HP + 8)) & hex2dec("7fffffff")}`;
  const TP = K.slice(-6);

  return TP;
}