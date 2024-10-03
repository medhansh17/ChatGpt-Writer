const Button = ({
  label,
  action,
  image,
  buttonClass,
  ImgClass,
}: {
  label: string;
  action: () => void;
  image: string;
  buttonClass: string;
  ImgClass: string;
}) => {
  return (
    <button onClick={action} className={buttonClass}>
      <img src={image} className={ImgClass} />
      <p>{label}</p>
    </button>
  );
};

export default Button;
