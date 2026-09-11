/**
 * 01. Isomorphic Strings
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  if (s.length !== t.length) return false;

  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    if (
      (mapST.has(charS) && mapST.get(charS) !== charT) ||
      (mapTS.has(charT) && mapTS.get(charT) !== charS)
    ) {
      return false;
    }

    mapST.set(charS, charT);
    mapTS.set(charT, charS);
  }

  return true;
};

/**
 * 02. Word Pattern
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(" ");
  if (pattern.length !== words.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (
      (charToWord.has(char) && charToWord.get(char) !== word) ||
      (wordToChar.has(word) && wordToChar.get(word) !== char)
    ) {
      return false;
    }

    charToWord.set(char, word);
    wordToChar.set(word, char);
  }

  return true;
};

/**
 * 03. Find the Difference
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let charCodeXor = 0;

  for (let i = 0; i < s.length; i++) {
    charCodeXor ^= s.charCodeAt(i);
  }
  for (let i = 0; i < t.length; i++) {
    charCodeXor ^= t.charCodeAt(i);
  }

  return String.fromCharCode(charCodeXor);
};

/**
 * 04. Reverse Linked List
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  return prev;
};

/**
 * 05. Middle of the Linked List
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

/**
 * 06. Product of Array Except Self
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const result = new Array(n);

  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] = result[i] * suffix;
    suffix *= nums[i];
  }

  return result;
};

/**
 * 07. Remove Nth Node From End of List
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
};

/**
 * 08. Find First and Last Position of Element in Sorted Array
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const findBound = (findFirst) => {
    let left = 0;
    let right = nums.length - 1;
    let bound = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        bound = mid;
        if (findFirst) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return bound;
  };

  return [findBound(true), findBound(false)];
};

/**
 * 09. Permutation in String
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 > len2) return false;

  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);

  for (let i = 0; i < len1; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }

  for (let i = 0; i < len2 - len1; i++) {
    if (matches === 26) return true;

    const rightIndex = s2.charCodeAt(i + len1) - 97;
    const leftIndex = s2.charCodeAt(i) - 97;

    count2[rightIndex]++;
    if (count2[rightIndex] === count1[rightIndex]) {
      matches++;
    } else if (count2[rightIndex] === count1[rightIndex] + 1) {
      matches--;
    }

    count2[leftIndex]--;
    if (count2[leftIndex] === count1[leftIndex]) {
      matches++;
    } else if (count2[leftIndex] === count1[leftIndex] - 1) {
      matches--;
    }
  }

  return matches === 26;
};

/**
 * 10. Find All Anagrams in a String
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const result = [];
  const sLen = s.length;
  const pLen = p.length;

  if (sLen < pLen) return result;

  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);

  for (let i = 0; i < pLen; i++) {
    pCount[p.charCodeAt(i) - 97]++;
    sCount[s.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (pCount[i] === sCount[i]) matches++;
  }

  for (let i = 0; i < sLen - pLen; i++) {
    if (matches === 26) {
      result.push(i);
    }

    const rightIndex = s.charCodeAt(i + pLen) - 97;
    const leftIndex = s.charCodeAt(i) - 97;

    sCount[rightIndex]++;
    if (sCount[rightIndex] === pCount[rightIndex]) {
      matches++;
    } else if (sCount[rightIndex] === pCount[rightIndex] + 1) {
      matches--;
    }

    sCount[leftIndex]--;
    if (sCount[leftIndex] === pCount[leftIndex]) {
      matches++;
    } else if (sCount[leftIndex] === pCount[leftIndex] - 1) {
      matches--;
    }
  }

  if (matches === 26) {
    result.push(sLen - pLen);
  }

  return result;
};
