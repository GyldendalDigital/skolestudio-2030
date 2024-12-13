import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import skolestudioLogo from "../skolestudio.svg";
import redapticLogo from "../redaptic.svg";
import { useNavigate } from "@tanstack/react-router";

export const RButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
        aria-label="Redaptic"
      onClick={() =>
        navigate({
          to: "/redaptic",
        })
      }
    >
      <img src={redapticLogo} alt="" />
    </StyledButton>
  );
};
export const SButton = () => {
  const navigate = useNavigate();
  return (
    <StyledButton
        aria-label="Skolestudio"
        onClick={() =>
        navigate({
          to: "/skolestudio",
        })
      }
    >
      <img src={skolestudioLogo} alt="" />
    </StyledButton>
  );
};

const StyledButton = styled(IconButton)`
  background: white;
  position: fixed;
  padding: 4px;
  bottom: 64px;
  left: -2px;
  width: 40px;
  height: 40px;
  z-index: 9998;
  border-radius: 9999px;
  box-shadow:
    rgba(0, 0, 0, 0.5) 0 0 2px 0,
    inset rgb(0 0 0) 0 0 4px 0;
  overflow: hidden;
`;
