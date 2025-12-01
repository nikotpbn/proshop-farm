const Message = ({
  variant,
  children,
}: {
  variant: string;
  children: string;
}) => {
  const variants = [
    {
      variant: "danger",
      style: "bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]",
    },
    {
      variant: "success",
      style: "bg-[#d4edda] text-[#155724] border-[#c3e6cb]",
    },
    {
      variant: "info",
      style: "bg-[#d1ecf1] text-[#0c5460] border-[#bee5eb]",
    },
  ];

  const { style } = variants.find((v) => v.variant === variant) || variants[2];

  return <div className={`${style} py-3 px-3 rounded-md`}>{children}</div>;
};

export default Message;
