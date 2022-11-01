import DALinkLogo from "../../assets/logo-dalink.png";
import DALogo from "../../assets/DAC_Logo_Black.png";
import "./Logo.css";

type Props = {
  height: number;
};

const Logo = (props: Props) => {
  return (
    <div
      className="logo-container"
      // style={{ height: props.height, width: props.width }}
    >
      <img src={DALogo} style={{ height: props.height + 20 }} />
      <img src={DALinkLogo} style={{ height: props.height }} />
    </div>
  );
};

export default Logo;
