import { readdirSync, writeFileSync } from "fs";
import { basename, join } from "path";

const srcDir = "public/images/client";
const outFile = "src/data/clients.ts";

const knownUrls = {
  "1922": "https://1922.co.id",
  "acer": "https://www.acer.com",
  "adhi": "https://adhi.co.id",
  "advos": null,
  "amarta-wisesa": "https://amartawisesa.com",
  "antangin": "https://antangin.com",
  "baiturrokhman": "https://baiturrokhmantour.com",
  "bang-bana": "https://bangbana.com",
  "bank-jatim": "https://bankjatim.co.id",
  "bank-mandiri": "https://bankmandiri.co.id",
  "bank-sidoarjo": null,
  "begawan-premium-student-apartment": null,
  "berrys": null,
  "bestdough": "https://bestdougid.com",
  "bluder-kapas": null,
  "bni": "https://bni.co.id",
  "boop": "https://www.boopin.com",
  "bpr-artha-kanjuruhan": null,
  "bri": "https://bri.co.id",
  "bumiputera": "https://bumiputera.com",
  "calon-istri": null,
  "catoel": null,
  "chatten": null,
  "coca-cola": "https://www.coca-cola.co.id",
  "consult": null,
  "cross": null,
  "daihatsu": "https://astra-daihatsu.id",
  "dailbana": null,
  "dana": "https://www.dana.id",
  "dhika-universe": null,
  "dinar-weddover": null,
  "diplomat": null,
  "djarum": "https://www.djarum.com",
  "djoglo": null,
  "dr-dhelay": null,
  "electronic-city": null,
  "ertekn": null,
  "etawa-plus": null,
  "fertisoil": null,
  "fifgroup": "https://www.fifgroup.co.id",
  "first": null,
  "fpg-insurance": null,
  "gellate": null,
  "gita": null,
  "hamur-kurasi": null,
  "hanoman": null,
  "helwa": null,
  "hodai": null,
  "holcim": "https://www.holcim.co.id",
  "honda": "https://www.astra-honda.com",
  "hotel-santika": "https://www.santika.com",
  "in-lite": null,
  "indana": null,
  "indofood": "https://www.indofood.com",
  "indomaret": "https://indomaret.co.id",
  "indosat": "https://ioh.co.id",
  "inspiring-city": null,
  "jamkrindo": "https://jamkrindo.co.id",
  "japfa": "https://www.japfacomfeed.co.id",
  "jatim-park": "https://www.jatimpark.com",
  "jco": "https://www.jcodonuts.com",
  "jiwasraya": "https://www.jiwasraya.co.id",
  "kabupaten-malang": null,
  "kampung-kramat": null,
  "kek": null,
  "kementerian-pertanian": "https://www.pertanian.go.id",
  "kitabeli": null,
  "konas": null,
  "konimex": "https://konimex.com",
  "kota-karismatik-madiun-2": null,
  "kota-karismatik-madiun": null,
  "kota-madiun": null,
  "kpu": "https://www.kpu.go.id",
  "la-tobas-cigar-premium": null,
  "lakoni": null,
  "malang-kucecwara": null,
  "mcc": null,
  "mccpg": null,
  "mie-gacoan": "https://miegacoan.com",
  "mie-jogja": null,
  "mom-sarasa": null,
  "ms-glow": null,
  "naavagreen": null,
  "nastle": null,
  "nelongso": null,
  "nobu": null,
  "nokia": "https://www.nokia.com",
  "odigiro": null,
  "ollino-garden": null,
  "oppo": "https://www.oppo.com/id",
  "ot": null,
  "pegadaian": "https://www.pegadaian.co.id",
  "perbamida": null,
  "pertamina": "https://www.pertamina.com",
  "pia-cap-mangkok": null,
  "pln": "https://www.pln.co.id",
  "pt-bpr-bank-tulungagung": null,
  "pt-central-mega-kencana": null,
  "pt-econusa-kualiva-abadi": null,
  "pt-indo-lakto": null,
  "pt-inti-dragon": null,
  "raja-gula": null,
  "realme": "https://www.realme.com/id",
  "robot": null,
  "rohani": null,
  "rsi-unisma-malang": null,
  "rssa": null,
  "rubylicious": null,
  "ruvodo": null,
  "sampoerna": "https://www.sampoerna.com",
  "satu-titik": null,
  "sidu": null,
  "smartfren": "https://www.smartfren.com",
  "smoore": null,
  "stamford-indonesia-fc": null,
  "teh-gelas": null,
  "tekopi": null,
  "telkomsel": "https://www.telkomsel.com",
  "the-alana": null,
  "tiga-roda": null,
  "tripa": null,
  "universitas-brawijaya": "https://ub.ac.id",
  "uwg": null,
  "vivan": null,
  "wika": "https://www.wika.co.id",
  "wismari": null,
  "xl-axiata": "https://www.xlaxiata.co.id",
  "yamaha": "https://www.yamaha-motor.co.id",
  "you-wang-you": null,
};

function toName(key) {
  return key
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const files = readdirSync(srcDir).filter((f) =>
  /\.(png|webp|svg|jpg|jpeg)$/i.test(f)
);

const entries = [];
for (const f of files) {
  const key = basename(f).replace(/\.(png|webp|svg|jpg|jpeg)$/i, "");
  const name = toName(key);
  const url = knownUrls[key] ?? null;
  const logo = `/images/client/${f}`;

  const isBig = ["mie-gacoan","sampoerna","coca-cola","universitas-brawijaya","daihatsu","realme","yamaha","djarum","pln","holcim","indofood","telkomsel","pertamina","mandiri","bni","bri","indosat","honda","smartfren","ruvodo","antangin","konimex","fertisoil","wismari","rubylicious","indana","xl-axiata","lakoni","the-alana","ms-glow","kitabeli","nastle","bpr-artha-kanjuruhan","pt-indo-lakto","3-second","rsi-unisma-malang"].includes(key);

  const obj = { name };
  if (url) obj.url = url;
  obj.logo = logo;
  if (isBig) obj.big = true;
  if (key === "dailbana") obj.scale = 1.5;
  entries.push(obj);
}

const code = `// Auto-generated by scripts/generate-clients-data.mjs
// Do not edit manually.

export interface Client {
  name: string;
  url?: string;
  logo: string;
  big?: boolean;
  scale?: number;
}

export const clients: Client[] = ${JSON.stringify(entries, null, 2)};
`;

writeFileSync(outFile, code, "utf-8");
console.log(`Generated ${entries.length} clients → ${outFile}`);
