import _ from "lodash";

export const getPaginationRange = (totalPages: number, page: number) => {
  let siblings = 1;
  let totalPageNumInArr = 7 + siblings;
  if (totalPageNumInArr >= totalPages) {
    return _.range(1, totalPages + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPages);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPages];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPages - rightItemCount + 1, totalPages + 1);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPages];
  }
};
