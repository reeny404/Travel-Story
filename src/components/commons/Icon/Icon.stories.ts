import { ICON } from "@/constants/icon";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Icon from "./Icon";

const meta = {
  title: "Buttons/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    alt: {
      control: "text",
      description: "이미지의 alt 속성",
      defaultValue: "icon",
    },
    icon: {
      control: "text",
      description: "이미지의 경로",
      defaultValue: "",
    },
    onClick: { action: "clicked", description: "버튼 클릭 이벤트" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: "icon",
    size: 16,
    icon: ICON.list.black,
  },
};
