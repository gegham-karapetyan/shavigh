export function subsequenceOf<T>(
  arr: T[],
  subArr: T[]
): { matched: boolean; startIndex: number; endIndex: number } {
  let j = 0; // Pointer for `subArr`
  let startIndex = -1; // To track the starting index of the match

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === subArr[j]) {
      if (j === 0) {
        startIndex = i; // Record the starting index when the first match occurs
      }
      j++; // Move `subArr` pointer if there's a match
      if (j === subArr.length) {
        // If all elements of `subArr` are matched
        return { matched: true, startIndex, endIndex: i };
      }
    } else if (j > 0) {
      // If a mismatch occurs after starting to match `subArr`, reset
      j = 0;
      startIndex = -1;
    }
  }

  return { matched: false, startIndex: -1, endIndex: -1 }; // No match found
}
