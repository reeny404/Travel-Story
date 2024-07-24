import type { Meta, StoryObj } from "@storybook/react";
import SubmitButton from "./SubmitButton";

const meta = {
  title: "Buttons/SubmitButton",
  component: SubmitButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      description: "버튼의 테마 색상",
      control: {
        type: "select",
        options: ["dark", "light", "social"],
      },
    },
    disabled: {
      description: "버튼 활성화 여부",
      control: "boolean",
    },
    children: {
      description: "버튼의 문구",
      control: "text",
    },
  },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    theme: "dark",
    disabled: false,
    children: "Dark Button",
  },
};

export const Light: Story = {
  args: {
    theme: "light",
    disabled: false,
    children: "Light Button",
  },
};

export const Social: Story = {
  args: {
    theme: "social",
    disabled: false,
    children: "Social Button",
  },
};

export const Disabled: Story = {
  args: {
    theme: "dark",
    disabled: true,
    children: "Disabled Button",
  },
};
