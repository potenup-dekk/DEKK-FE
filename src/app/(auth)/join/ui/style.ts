import { tv } from "tailwind-variants";

const joinPageStyle = tv({
  slots: {
    form: "flex flex-col justify-between items-center gap-4 w-full h-full p-4",
    submitArea: "flex w-full text-center gap-2",
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
