import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

// https://github.com/Vendicated/Vencord/blob/main/src/plugins/noSystemBadge.discordDesktop/index.ts
export const patches: Patch[] = [
  {
    find: 'location:"expanding_buttons"',
    replace: {
      match:
        /(?<=\]\}\)),(.{0,40}togglePopout:.+?\}\))\]\}\):null,(?<=\((\i\.\i),\{label:.+?:null,(\i)\?\(0,\i\.jsxs?\)\(\i\.Fragment.+?message:(\i).+?)/,
      replacement: (_, ReactButton, ButtonComponent, showReactButton, message) =>
        `]}):null,require("messagePopover_messagePopover")._buildPopoverElements(${ButtonComponent},${message}),${showReactButton}?${ReactButton}:null,`
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  messagePopover: {
    entrypoint: true,
     dependencies: [
      { id: "react" },
      { id: "discord/modules/menus/web/Menu" },
      "MESSAGE_POPOUT_MENU_OPENED_DESKTOP,{"
    ]
  }
};
