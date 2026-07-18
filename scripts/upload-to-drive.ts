import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";

const SA_ENV = "GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON";
const SA_FILE_ENV = "GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE";
const DRIVE_FOLDER = process.env.GOOGLE_DRIVE_FOLDER || "RaximPrompts";

function bail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

function ensureRclone() {
  try {
    execSync("rclone version", { stdio: "ignore" });
  } catch {
    bail("rclone not found. Install it first: https://rclone.org/install/");
  }
}

function writeTempConfig(saPath: string) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "raxim-drive-"));
  const confPath = path.join(tmpDir, "rclone.conf");
  const conf = `[gdrive]
type = drive
scope = drive
service_account_file = ${saPath}
`;
  fs.writeFileSync(confPath, conf);
  return confPath;
}

function getServiceAccountPath(): string {
  if (process.env[SA_ENV]) {
    const tmp = path.join(os.tmpdir(), "raxim-gdrive-sa.json");
    fs.writeFileSync(tmp, process.env[SA_ENV]!);
    return tmp;
  }
  if (process.env[SA_FILE_ENV]) {
    if (!fs.existsSync(process.env[SA_FILE_ENV]!)) {
      bail(`Service account file not found: ${process.env[SA_FILE_ENV]}`);
    }
    return process.env[SA_FILE_ENV]!;
  }
  bail(`Set ${SA_ENV} (service account JSON content) or ${SA_FILE_ENV} (path to .json)`);
}

function rclone(cmd: string, confPath: string) {
  const full = `rclone --config "${confPath}" ${cmd}`;
  console.log("$", full);
  execSync(full, { stdio: "inherit" });
}

async function main() {
  ensureRclone();

  const saPath = getServiceAccountPath();
  const confPath = writeTempConfig(saPath);

  const dirs = [
    { local: "public/generated-covers", remote: `${DRIVE_FOLDER}/product-covers` },
    { local: "public/generated-prompt-covers", remote: `${DRIVE_FOLDER}/prompt-covers` },
    { local: "data", remote: `${DRIVE_FOLDER}/data` },
  ];

  for (const { local, remote } of dirs) {
    if (!fs.existsSync(local)) {
      console.log(`Skipping missing dir: ${local}`);
      continue;
    }
    rclone(`sync "${local}" "gdrive:${remote}"`, confPath);
  }

  console.log("Google Drive sync complete.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
