export type PostStep = 0 | 1 | 2 | 3;

export interface SecondaryCategoryGroup {
  id: string;
  label: string;
  secondaryOptions: string[];
}

export interface TagValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  normalizedTag: string;
}

export interface PostProductItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
