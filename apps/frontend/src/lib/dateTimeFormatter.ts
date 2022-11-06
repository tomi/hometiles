import { Iso8601Timestamp } from "../components/RssReaderTile/RssFeedReader";

const dateTimeFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: false,
});

export const formatDateTime = (date?: Date | Iso8601Timestamp) => {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);

  return dateTimeFormatter.format(date);
};
