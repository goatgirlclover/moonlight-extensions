import React from "@moonlight-mod/wp/react";
import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
// @ts-expect-error no type definitions
import type { IconProps } from "@moonlight-mod/mappings/discord/components/common/index";
export type IconComponent = (props: IconProps & Record<string, any>) => React.ReactNode;
const logger = moonlight.getLogger("messagePopover");

export interface MessagePopoverButtonItem {
  key?: string;
  label: string;
  icon: React.ComponentType<any>;
  message: any;
  channel: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onContextMenu?: React.MouseEventHandler<HTMLButtonElement>;
}

export type MessagePopoverButtonFactory = (message: any) => MessagePopoverButtonItem | null;
export type MessagePopoverButtonData = {
  render: MessagePopoverButtonFactory;
  icon: IconComponent;
};

export const MessagePopoverButtonMap = new Map<string, MessagePopoverButtonData>();

export function addMessagePopoverButton(identifier: string, render: MessagePopoverButtonFactory, icon: IconComponent) {
  MessagePopoverButtonMap.set(identifier, { render, icon });
}

export function removeMessagePopoverButton(identifier: string) {
  MessagePopoverButtonMap.delete(identifier);
}

export function CustomPopoverButtons(props: {
  Component: React.ComponentType<MessagePopoverButtonItem>;
  message: any;
}) {
  const { Component, message } = props;

  const elements = Array.from(MessagePopoverButtonMap.entries()).map(([key, { render }]) => {
    try {
      // FIXME: this should use proper React to ensure hooks work
      const item = render(message);
      if (!item) return null;

      return (
        <ErrorBoundary noop>
          <Component key={key} {...item} />
        </ErrorBoundary>
      );
    } catch (err) {
      logger.error(`[${key}]`, err);
      return null;
    }
  });

  return <>{elements}</>;
}

export function _buildPopoverElements(Component: React.ComponentType<MessagePopoverButtonItem>, message: any) {
  return <CustomPopoverButtons Component={Component} message={message} />;
}
