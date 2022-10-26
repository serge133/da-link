import DALinkLogo from "../assets/logo-dalink.png";

type Props = {
  height?: number;
  width?: number;
};

const Logo = (props: Props) => {
  return (
    <img
      style={{ height: props.height, width: props.width }}
      src={DALinkLogo}
    />
  );
};

export default Logo;
