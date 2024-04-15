import { tv } from "tailwind-variants";

export const title = tv({
	base: "tracking-tight inline font-semibold",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
			black: "from-[#2b4968] to-[#353535]"
		},
		size: {
			sm: "text-3xl lg:text-4xl",
			md: "text-[2.3rem] lg:text-5xl leading-9",
			lg: "text-4xl lg:text-6xl",
			mt: "text-[2.3rem] lg:text-5x1 ",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
				"black",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
			size: [
				"sm",
				"md",
				"lg",
				"mt",
		],
		},
	],
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
	},
  defaultVariants:{
    fullWidth: true
  }
});

export const backgroundColor = tv({
    base: "h-full w-full",
    variants: {
        color: {
            violet: "bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]",
            yellow: "bg-gradient-to-b from-[#FF705B] to-[#FFB457]",
            blue: "bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]",
            cyan: "bg-gradient-to-b from-[#00b7fa] to-[#01cfea]",
            green: "bg-gradient-to-b from-[#6FEE8D] to-[#17c964]",
            pink: "bg-gradient-to-b from-[#FF72E1] to-[#F54C7A]",
            foreground: "bg-gradient-to-b from-[#FFFFFF] to-[#4B4B4B]",
        },
    },
    defaultVariants: {
        color: "violet", // 기본 색상 설정
    },
});