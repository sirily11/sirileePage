import React from "react";
import {
  VideoCameraOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  DatabaseOutlined,
  AlignLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";

export const Banner00DataSource = {
  wrapper: { className: "banner0" },
  textWrapper: { className: "banner0-text-wrapper" },
  title: {
    className: "banner0-title",
    children: "Sirilee Web Page",
  },
  content: {
    className: "banner0-content",
    children: "My Personal Website",
  },
  button: { className: "banner0-button", children: "Learn More", },
};
export const Content00DataSource = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "Skills" }],
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children: <VideoCameraOutlined />,
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Video Filming",
            },
            { name: "content", children: "Multiple videos" },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children: <AppstoreAddOutlined />,
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Multiple projects",
            },
            {
              name: "content",
              children: "Developed multiple projects in the past",
            },
          ],
        },
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children: <SettingOutlined />,
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Different platforms",
            },
            {
              name: "content",
              children: "Experienced in different platforms' development",
            },
          ],
        },
      },
    ],
  },
};

export const Content30DataSource = {
  wrapper: { className: "home-page-wrapper content3-wrapper" },
  page: { className: "home-page content3" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: "I love finding solutions for every possible tasks",
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content",
        children: "Projects list",
      },
    ],
  },
  block: {
    className: "content3-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children: <DatabaseOutlined />,
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Storage Management System",
          },
          content: {
            className: "content3-content",
            children:
              "A Python implemented storage management system which has a mobile app, web app, and managable admin site",
          },
        },
      },
      {
        name: "block1",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children: <AlignLeftOutlined />,
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "NewsFeed" },
          content: {
            className: "content3-content",
            children:
              "An app which find news from internet and parse HTML into Markdown 24x7. Currently, it collected more than 160,000 news in last two years.",
          },
        },
      },
      {
        name: "block2",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children: <EditOutlined />,
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Multi-user editing platform",
          },
          content: {
            className: "content3-content",
            children:
              "A multi-user Collaboration platform which provides a common place for settings used in the document editing. Can be change in real-time across all end users.",
          },
        },
      },
      {
        name: "block3",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children: <AppstoreAddOutlined />,
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Draft JS Flutter Renderer",
          },
          content: {
            className: "content3-content",
            children: "An open sourced Draft JS renderer for Flutter.",
          },
        },
      },
      {
        name: "block4",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children: <AppstoreAddOutlined />,
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Flutter JSON Textform",
          },
          content: {
            className: "content3-content",
            children:
              "An auto form generated framework for Flutter which can auto generate text form",
          },
        },
      },
    ],
  },
};
export const Footer00DataSource = {
  wrapper: { className: "home-page-wrapper footer0-wrapper" },
  OverPack: { className: "home-page footer0", playScale: 0.05 },
  copyright: {
    className: "copyright",
    children: <span></span>,
  },
};
