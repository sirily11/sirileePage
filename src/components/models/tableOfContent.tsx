import React, { ReactElement } from "react";
import { RawDraftContentState, RawDraftContentBlock } from "draft-js";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Color } from "./post";
import { isBrightColor } from "../utils/utils";

/**
 * Draft js table of content element
 */
export class ContentElement {
  id: number;
  children: ContentElement[];
  content?: string;
  level: number;

  constructor(
    level: number,
    children: ContentElement[],
    id: number,
    content?: string
  ) {
    this.children = children;
    this.content = content;
    this.level = level;
    this.id = id;
  }

  /**
   * Add child to current element tree.
   *
   * if element's level > last child's level, add to child's children.
   * Otherwise, add to this children
   *
   * @param element Content element
   */
  addChild(element: ContentElement) {
    if (this.children.length > 0) {
      let lastElement = this.children[this.children.length - 1];
      if (lastElement.level < element.level) {
        lastElement.addChild(element);
        return;
      }
    }
    this.children.push(element);
  }

  /**
   * Return root element and construct a tree
   */
  static constructElementTree(content: RawDraftContentState): ContentElement {
    let c: ContentElement[] = [];
    let id = 1;

    for (let element of content.blocks) {
      if (element.type.includes("header")) {
        let level = ContentElement.getHeaderValue(element);
        if (c.length > 0) {
          let lastElement = c[c.length - 1];
          if (lastElement.level < level) {
            lastElement.addChild(
              new ContentElement(level, [], id, element.text)
            );
            continue;
          }
        }
        c.push(new ContentElement(level, [], id, element.text));
      }
      id += 1;
    }

    let root = new ContentElement(0, c, 0, "root");
    return root;
  }

  /**
   * Return header value. For example, header-one will output 1
   */
  static getHeaderValue(block: RawDraftContentBlock): number {
    switch (block.type) {
      case "header-two":
        return 2;
      case "header-three":
        return 3;

      case "header-four":
        return 4;

      case "header-five":
        return 5;

      case "header-six":
        return 6;

      default:
        return 1;
    }
  }

  render(color: Color[]): ReactElement {
    const isBright = color.length === 0 ? false : isBrightColor(color[0]);

    const content: ReactElement = (
      <TreeItem
        nodeId={`${this.id}`}
        label={
          <h4 style={{ color: isBright ? "black" : "white" }}>
            {this.content}
          </h4>
        }
      >
        {this.children.map(c => c.render(color))}
      </TreeItem>
    );

    if (this.id === 0) {
      return (
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {this.children.map(c => c.render(color))}
        </TreeView>
      );
    }
    return content;
  }
}
