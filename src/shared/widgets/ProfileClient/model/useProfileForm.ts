import { useMemo, useState } from "react";
import {
  type ProfileFormErrors,
  type ProfileFormValue,
} from "./profileFormHelpers";
import type {
  UseProfileFormParams,
  UseProfileFormResult,
} from "./useProfileForm.types";
import {
  createChangeHandler,
  createFormFromUserSetter,
  createSubmitHandler,
} from "./useProfileForm.handlers";

const INITIAL_FORM: ProfileFormValue = {
  height: "",
  weight: "",
  gender: "",
};

const INITIAL_FORM_ERRORS: ProfileFormErrors = {};

const useProfileForm = ({
  refetch,
  onUnauthorized,
}: UseProfileFormParams): UseProfileFormResult => {
  const [form, setForm] = useState<ProfileFormValue>(INITIAL_FORM);
  const [formErrors, setFormErrors] =
    useState<ProfileFormErrors>(INITIAL_FORM_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isReady = useMemo(
    () => !!form.height.trim() && !!form.weight.trim() && !!form.gender.trim(),
    [form.gender, form.height, form.weight],
  );

  const setFormFromUser = createFormFromUserSetter(setForm);
  const handleChange = createChangeHandler(
    setForm,
    setFormErrors,
    setSubmitError,
  );
  const handleSubmit = createSubmitHandler(
    form,
    refetch,
    onUnauthorized,
    isSubmitting,
    setSubmitError,
    setFormErrors,
    setIsSubmitting,
  );

  return {
    form,
    formErrors,
    isSubmitting,
    submitError,
    isReady,
    setFormFromUser,
    handleChange,
    handleSubmit,
  };
};

export default useProfileForm;
