import {
  submitProfile,
  type ProfileFormErrors,
  type ProfileFormValue,
} from "./profileFormHelpers";
import type { ProfileFormUser } from "./useProfileForm.types";

const createFormFromUserSetter = (
  setForm: React.Dispatch<React.SetStateAction<ProfileFormValue>>,
  setBaselineForm: React.Dispatch<React.SetStateAction<ProfileFormValue>>,
) => {
  return (nextUser: ProfileFormUser) => {
    const nextForm: ProfileFormValue = {
      nickname: nextUser.nickname?.trim() ?? "",
      height: nextUser.height == null ? "" : String(nextUser.height),
      weight: nextUser.weight == null ? "" : String(nextUser.weight),
      gender: nextUser.gender ?? "",
    };

    setForm((previousForm) => {
      const isSameForm =
        previousForm.nickname === nextForm.nickname &&
        previousForm.height === nextForm.height &&
        previousForm.weight === nextForm.weight &&
        previousForm.gender === nextForm.gender;

      return isSameForm ? previousForm : nextForm;
    });

    setBaselineForm((previousForm) => {
      const isSameForm =
        previousForm.nickname === nextForm.nickname &&
        previousForm.height === nextForm.height &&
        previousForm.weight === nextForm.weight &&
        previousForm.gender === nextForm.gender;

      return isSameForm ? previousForm : nextForm;
    });
  };
};

const createChangeHandler = (
  setForm: React.Dispatch<React.SetStateAction<ProfileFormValue>>,
  setFormErrors: React.Dispatch<React.SetStateAction<ProfileFormErrors>>,
  setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    if (
      name === "nickname" ||
      name === "height" ||
      name === "weight" ||
      name === "gender"
    ) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      setSubmitError(null);
    }
  };
};

const createSubmitHandler = (
  form: ProfileFormValue,
  refetch: () => Promise<void>,
  onUnauthorized: () => void,
  isSubmitting: boolean,
  setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
  setFormErrors: React.Dispatch<React.SetStateAction<ProfileFormErrors>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitProfile(
        form,
        refetch,
        onUnauthorized,
        setSubmitError,
        setFormErrors,
      );
    } finally {
      setIsSubmitting(false);
    }
  };
};

export { createFormFromUserSetter, createChangeHandler, createSubmitHandler };
