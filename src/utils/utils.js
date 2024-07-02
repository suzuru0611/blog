export const formatDate = (timestamp, format) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  if (format === "YYYY-MM-DD") {
    return `${year}年${month}月${day}日`;
  } else if (format === "MM-DD") {
    return `${month}月${day}日`;
  }

  // 默認返回值
  return `${year}年${month}月${day}日`;
};

export const today = () => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  // 默認返回值
  return `${year}年${month}月${day}日`;
};
