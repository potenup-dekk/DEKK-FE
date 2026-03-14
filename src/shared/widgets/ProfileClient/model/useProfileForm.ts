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
  nickname: "",
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
  const [baselineForm, setBaselineForm] =
    useState<ProfileFormValue>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<ProfileFormErrors>(
    INITIAL_FORM_ERRORS,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isReady = useMemo(
    () =>
      !!form.nickname.trim() &&
      !!form.height.trim() &&
      !!form.weight.trim() &&
      !!form.gender.trim(),
    [form.gender, form.height, form.nickname, form.weight],
  );
  const isDirty = useMemo(() => {
    return (
      form.nickname !== baselineForm.nickname ||
      form.height !== baselineForm.height ||
      form.weight !== baselineForm.weight ||
      form.gender !== baselineForm.gender
    );
  }, [baselineForm, form]);
  const setFormFromUser = useMemo(() => {
    return createFormFromUserSetter(setForm, setBaselineForm);
  }, []);
  const handleChange = useMemo(
    () => createChangeHandler(setForm, setFormErrors, setSubmitError),
    [],
  );
  const handleSubmit = useMemo(() =>
    createSubmitHandler(
      form,
      refetch,
      onUnauthorized,
      isSubmitting,
      setSubmitError,
      setFormErrors,
      setIsSubmitting,
    ),
    [form, isSubmitting, onUnauthorized, refetch],
  );

  return {
    form,
    formErrors,
    isSubmitting,
    submitError,
    isReady,
    isDirty,
    setFormFromUser,
    handleChange,
    handleSubmit,
  };
};

export default useProfileForm;
