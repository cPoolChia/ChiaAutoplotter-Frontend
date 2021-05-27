export const formatDiskSize = (bytes: number, type: string): string => {
  switch (type) {
    case "KB":
      return (bytes / 1024).toFixed(3) + " KB";
    case "MB":
      return (bytes / 1024 ** 2).toFixed(3) + " MB";
    case "GB":
      return (bytes / 1024 ** 3).toFixed(3) + " GB";
    default:
      return "0";
  }
};

export const getTakenDiskSizePercentage = (
  total: number,
  taken: number
): number => {
  return (taken / total) * 100;
};
