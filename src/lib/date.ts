import { format, formatDistanceToNow, differenceInMonths } from "date-fns";

function formatDate(createAt: any) {
  const now = new Date();
  const createdAtDate = new Date(createAt);

  const monthsDifference = differenceInMonths(now, createdAtDate);

  if (monthsDifference < 1) {
    return `${formatDistanceToNow(createdAtDate)} ago`;
  } else {
    return format(createdAtDate, "dd/MM/yyyy");
  }
}
export default formatDate;
