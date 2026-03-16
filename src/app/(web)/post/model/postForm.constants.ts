import type { SecondaryCategoryGroup } from "./postForm.types";

const SECONDARY_CATEGORY_GROUPS: SecondaryCategoryGroup[] = [
  {
    id: "top",
    label: "상의",
    secondaryOptions: ["반팔", "긴팔", "셔츠", "니트", "후드"],
  },
  {
    id: "bottom",
    label: "하의",
    secondaryOptions: ["데님", "슬랙스", "쇼츠", "조거", "스커트"],
  },
  {
    id: "outer",
    label: "아우터",
    secondaryOptions: ["자켓", "코트", "패딩", "가디건", "바람막이"],
  },
  {
    id: "shoes",
    label: "신발",
    secondaryOptions: ["스니커즈", "로퍼", "부츠", "샌들", "러닝화"],
  },
];

const TAG_MIN_LENGTH = 2;
const TAG_MAX_LENGTH = 8;

export { SECONDARY_CATEGORY_GROUPS, TAG_MAX_LENGTH, TAG_MIN_LENGTH };
