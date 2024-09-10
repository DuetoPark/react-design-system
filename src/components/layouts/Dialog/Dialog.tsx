import React, { PropsWithChildren } from "react";
import * as PrimitiveDialog from "@radix-ui/react-dialog";

import "./_dialog.scss";

import Overlay from "../../atoms/Overlay";
import IconButton from "../../atoms/IconButton";
import Divider from "../../atoms/Divider";

export interface DialogPropsType extends PropsWithChildren {
  /** Dialog 제목 */
  title: string;
  /** Dialog 종류 */
  type?: "notice" | "normal";
}

export const DialogContent: React.FC<DialogPropsType> = ({
  title,
  type = "normal",
  children,
}) => {
  if (type === "notice") {
    return (
      <PrimitiveDialog.Portal>
        <PrimitiveDialog.Overlay>
          <Overlay className="dialog--overlay" />
        </PrimitiveDialog.Overlay>

        <PrimitiveDialog.Content className="dialog--content dialog--content-notice">
          <PrimitiveDialog.Title className="visually-hidden">
            {title}
          </PrimitiveDialog.Title>

          {children}
        </PrimitiveDialog.Content>
      </PrimitiveDialog.Portal>
    );
  }

  return (
    <PrimitiveDialog.Portal>
      <PrimitiveDialog.Overlay>
        <Overlay />
      </PrimitiveDialog.Overlay>

      <PrimitiveDialog.Content className="dialog--content dialog--content-normal">
        <header className="dialog--header">
          <PrimitiveDialog.Title className="dialog--header-title">
            {title}
          </PrimitiveDialog.Title>
          <PrimitiveDialog.Close className="dialog--header-close" asChild>
            <IconButton
              label="모달 닫기"
              icon="Close"
              className="dialog--header-close"
            />
          </PrimitiveDialog.Close>
        </header>

        <Divider />

        <div className="dialog--body">{children}</div>
      </PrimitiveDialog.Content>
    </PrimitiveDialog.Portal>
  );
};

export const Dialog = PrimitiveDialog.Root;
export const DialogTrigger = PrimitiveDialog.Trigger;
export const DialogClose = PrimitiveDialog.Close;
export const DialogTitle = PrimitiveDialog.Title;
