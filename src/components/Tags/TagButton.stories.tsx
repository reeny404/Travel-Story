import type { Meta, StoryObj } from "@storybook/react";
import TagButton from "./TagButton";

const meta: Meta<typeof TagButton> = {
  title: "Buttons/TagButton",
  component: TagButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: {
        type: "select",
        options: ["primary"],
      },
      description: "버튼의 색상",
      defaultValue: "primary",
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg"],
      },
      description: "버튼의 크기",
      defaultValue: "sm",
    },
    isChecked: {
      control: "boolean",
      description: "버튼 활성화 여부",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "버튼의 컨텐츠",
      defaultValue: "button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Xs: Story = {
  args: {
    intent: "primary",
    size: "xs",
    isChecked: false,
    children: "힐링",
  },
};

export const Small: Story = {
  args: {
    intent: "primary",
    size: "sm",
    isChecked: false,
    children: "여행",
  },
};

export const Medium: Story = {
  args: {
    intent: "primary",
    size: "md",
    isChecked: false,
    children: "휴식",
  },
};

export const Large: Story = {
  args: {
    intent: "primary",
    size: "lg",
    isChecked: false,
    children: (
      <>
        <img src="/testImg/logo2.png" alt="logo" width={16} height={16} />
        버튼 체크
      </>
    ),
  },
};

export const Checked: Story = {
  args: {
    intent: "primary",
    size: "sm",
    isChecked: true,
    children: "선택됨",
  },
};
