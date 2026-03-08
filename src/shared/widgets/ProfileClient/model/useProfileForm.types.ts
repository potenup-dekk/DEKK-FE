import type { Gender } from "@/entities/user";
import type { ProfileFormErrors, ProfileFormValue } from "./profileFormHelpers";

interface ProfileFormUser {
  height?: number | null;
  weight?: number | null;
  gender?: Gender | null;
}

interface UseProfileFormParams {
  refetch: () => Promise<void>;
  onUnauthorized: () => void;
}

interface UseProfileFormResult {
  form: ProfileFormValue;
  formErrors: ProfileFormErrors;
  isSubmitting: boolean;
  submitError: string | null;
  isReady: boolean;
  setFormFromUser: (nextUser: ProfileFormUser) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export type { ProfileFormUser, UseProfileFormParams, UseProfileFormResult };
