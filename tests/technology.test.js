import { describe, expect, it } from "vitest";
import { parseTechnologies } from "@/utils/str.js";

describe("技术栈解析", () => {
  it.each([
    ["C++", ["C++"]],
    ["C++/Vue", ["C++", "Vue"]],
    ["C++ + Vue", ["C++", "Vue"]],
    ["Go+Vue", ["Go", "Vue"]],
    [
      " C++ / Vue,Go，Java、Rust;Python；C#|SQL ",
      ["C++", "Vue", "Go", "Java", "Rust", "Python", "C#", "SQL"],
    ],
    ["C++/C++/ Vue /Vue", ["C++", "Vue"]],
    [" /,，、;；| ", []],
    [undefined, []],
    [null, []],
    ["", []],
  ])("解析 %j", (value, expected) => {
    expect(parseTechnologies(value)).toEqual(expected);
  });
});
