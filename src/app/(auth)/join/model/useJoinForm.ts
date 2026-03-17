import { useState } from "react";
import { useRouter } from "next/navigation";
import { getValidationErrors, submitOnboarding } from "./joinFormHelpers";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";
import type { JoinFormErrors, JoinFormValue } from "./joinForm.types";

interface UseJoinFormResult {
  form: JoinFormValue;
  errors: JoinFormErrors;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cancelJoin: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const createChangeHandler = (
  setForm: React.Dispatch<React.SetStateAction<JoinFormValue>>,
  setErrors: React.Dispatch<React.SetStateAction<JoinFormErrors>>,
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
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
};

const createSubmitHandler = (
  form: JoinFormValue,
  router: ReturnType<typeof useRouter>,
  isSubmitting: boolean,
  setErrors: React.Dispatch<React.SetStateAction<JoinFormErrors>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = getValidationErrors(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await submitOnboarding(form, router, setErrors);
    } finally {
      setIsSubmitting(false);
    }
  };
};

const createCancelHandler = (router: ReturnType<typeof useRouter>) => {
  return async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    prefetchAndReplace(router, "/login");
  };
};

const useJoinForm = (): UseJoinFormResult => {
  const router = useRouter();

  const [form, setForm] = useState<JoinFormValue>({
    nickname: "",
    height: "",
    weight: "",
    gender: "",
  });
  const [errors, setErrors] = useState<JoinFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    !!form.nickname.trim() &&
    !!form.height.trim() &&
    !!form.weight.trim() &&
    !!form.gender.trim();

  const handleChange = createChangeHandler(setForm, setErrors);
  const handleSubmit = createSubmitHandler(
    form,
    router,
    isSubmitting,
    setErrors,
    setIsSubmitting,
  );
  const cancelJoin = createCancelHandler(router);

  return {
    form,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    cancelJoin,
  };
};

export default useJoinForm;
