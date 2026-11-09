export const parseTechnologies = (value) => [
  ...new Set(
    String(value || "")
      // 单个 + 可分隔技术名称，连续的 ++ 属于 C++ 等名称的一部分。
      .split(/(?<!\+)\+(?!\+)|[,，、;；|/]+/)
      .map((item) => item.trim())
      .filter(Boolean),
  ),
];
