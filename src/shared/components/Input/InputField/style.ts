import { tv } from "tailwind-variants";
import clsx from "clsx";

export const inputFieldStyle = tv({
  slots: {
    root: clsx("flex flex-col items-start text-black w-full"),
    label: clsx("text-xs"),
    input: clsx(
      "border rounded-sm px-3 py-1.5 my-1 w-full outline-none",
    ),
    bottom: clsx("flex justify-between text-sm self-end min-h-4"),
    message: clsx("text-xs"),
    count: clsx("text-gray-500 text-xs"),
  },

  variants: {
    state: {
      default: {
        input: "border-primary",
        message: "text-black",
      },
      error: {
        input: "border-red-500",
        message: "text-red-500",
      },
    },

    disabled: {
      true: {
        input: "opacity-50 cursor-not-allowed",
      },
      false: {},
    },

    size: {
      md: {
        input: "text-base",
      },
      sm: {
        input: "text-xs",
      },
    },
  },

  defaultVariants: {
    state: "default",
    disabled: false,
    size: "sm",
  },
});
