import { Meta, StoryObj } from "@storybook/react";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./Dialog";
import Button from "../../atoms/Button";
import Divider from "../../atoms/Divider";

const meta: Meta<typeof DialogContent> = {
  title: "layouts/Dialog",
  component: Dialog,
  argTypes: {
    title: {
      control: { type: "text" },
    },
    type: {
      control: { type: "radio" },
      options: ["notice", "normal"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  args: {
    title: "Normal 모달",
    type: "normal",
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger>
        <Button>Normal 모달 트리거</Button>
      </DialogTrigger>

      <DialogContent title={args.title} type={args.type}>
        <p>예시 모달은 간단하게 만들어어보앗어용</p>

        <footer
          style={{ display: "flex", columnGap: "4px", marginTop: "24px" }}
        >
          <DialogClose style={{ flexGrow: 1 }} asChild>
            <Button variant="outlined">취소</Button>
          </DialogClose>

          <DialogClose style={{ flexGrow: 1 }} asChild>
            <Button>확인</Button>
          </DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  ),
};

export const Notice: Story = {
  args: {
    title: "Notice 모달",
    type: "notice",
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger>
        <Button>Notice 모달 트리거</Button>
      </DialogTrigger>

      <DialogContent title={args.title} type={args.type}>
        <div style={{ padding: "48px", textAlign: "center" }}>
          <p>예시 모달은 간단하게 만들어어보앗어용</p>
        </div>

        <Divider />

        <footer
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <DialogClose asChild>
            <Button variant="text" style={{ width: "100%" }}>
              닫기
            </Button>
          </DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  ),
};
