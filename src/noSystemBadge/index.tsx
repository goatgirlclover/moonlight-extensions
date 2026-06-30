import { ExtensionWebExports } from "@moonlight-mod/types";

// https://github.com/Vendicated/Vencord/blob/main/src/plugins/noSystemBadge.discordDesktop/index.ts
export const patches: ExtensionWebExports["patches"] = [
  {
    find: ",setSystemTrayApplications",
    replace: [
      {
        match: /setBadge\(\i\).+?},/,
        replacement: "setBadge(){},"
      },
      {
        match: /setSystemTrayIcon\(\i\).+?},/,
        replacement: "setSystemTrayIcon(){},"
      }
    ]
  }
];
