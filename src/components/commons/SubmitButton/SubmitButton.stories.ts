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
        options: ["primary", "light", "kakao"],
      },
    },
    variant: {
      description: "버튼의 outline 여부",
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      description: "버튼의 크기",
      control: {
        type: "select",
        options: ["sm", "lg", "lg"],
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

export const Primary: Story = {
  args: {
    theme: "primary",
    size: "lg",
    disabled: false,
    children: "Primary Button",
  },
};

export const Outline: Story = {
  args: {
    theme: "primary",
    variant: "outline",
    size: "lg",
    disabled: false,
    children: "Outline Button",
  },
};

export const Light: Story = {
  args: {
    theme: "light",
    size: "lg",
    disabled: false,
    children: "Light Button",
  },
};

export const Kakao: Story = {
  args: {
    theme: "kakao",
    size: "lg",
    disabled: false,
    children: "Kakao Button",
  },
};

export const Disabled: Story = {
  args: {
    theme: "primary",
    size: "lg",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Small: Story = {
  args: {
    theme: "primary",
    size: "sm",
    variant: "outline",
    disabled: false,
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    theme: "primary",
    size: "lg",
    disabled: false,
    children: "Large Button",
  },
};
