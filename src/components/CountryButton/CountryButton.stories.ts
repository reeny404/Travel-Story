import type { Meta, StoryObj } from "@storybook/react";
import CountryButton from "./CountryButton";

const meta: Meta<typeof CountryButton> = {
  title: "Buttons/CountryButton",
  component: CountryButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
      description: "버튼의 크기",
      defaultValue: "md",
    },
    imgSize: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
      description: "이미지 크기",
      defaultValue: "md",
    },
    imgPath: {
      control: "text",
      description: "이미지 경로",
      defaultValue: "/path/to/default-image.jpg",
    },
    alt: {
      control: "text",
      description: "이미지 대체 텍스트",
      defaultValue: "Country Image",
    },
    countryName: {
      control: "text",
      description: "국가 이름",
      defaultValue: "Italy",
    },
    desc: {
      control: "text",
      description: "설명 텍스트",
      defaultValue:
        "A beautiful country in Europe known for its rich history, culture, and cuisine.",
    },
    isCountry: {
      control: "boolean",
      description: "국가+도시를 나타낼 때 true로 설정",
      defaultValue: false,
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
    imgSize: "sm",
    imgPath: "/sampleImg.jpg",
    alt: "Small Country Image",
    countryName: "France",
    isCountry: false,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    imgSize: "md",
    imgPath: "/sampleImg.jpg",
    alt: "Medium Country Image",
    countryName: "France",
    desc: "France, a country in Western Europe, is known for its medieval cities, alpine villages, and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre, and monuments like the Eiffel Tower.",
    isCountry: false,
  },
};

export const MediumWithIsCountry: Story = {
  args: {
    size: "md",
    imgSize: "md",
    imgPath: "/sampleImg.jpg",
    alt: "Medium Country Image",
    countryName: "네덜란드",
    desc: "그로닝겐, 델프트, 레이던, 로테르담, 브레다, 도르드레흐트",
    isCountry: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    imgSize: "lg",
    imgPath: "/sampleImg.jpg",
    alt: "Large Country Image",
    countryName: "France",
    desc: "France, a country in Western Europe, is known for its medieval cities, alpine villages, and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre, and monuments like the Eiffel Tower.",
    isCountry: false,
  },
};
