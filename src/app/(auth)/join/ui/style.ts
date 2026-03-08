import { tv } from "tailwind-variants";

const joinPageStyle = tv({
  slots: {
    form: "flex flex-col items-center gap-4 max-w-md h-screen m-auto",
    logoWrap: "mt-25",
    submitArea: "mt-auto mb-11 w-full text-center",
    skipButton: "text-[#525252] text-xs text-center mt-3",
  },
});

const genderFieldStyle = tv({
  slots: {
    root: "flex flex-col items-start text-black w-full",
    row: "flex justify-between items-center w-full",
    options: "flex gap-6 my-1",
    optionLabel: "flex items-center gap-2",
    optionText: "text-xs",
    helperRow: "flex justify-between text-sm self-end",
    errorText: "text-red-500 text-xs",
    normalText: "text-gray-500",
  },
});

export { genderFieldStyle, joinPageStyle };
