import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ColorModeButton } from "./ui/color-mode";
import { HStack } from "@chakra-ui/react";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <HStack
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="64px"
    >
      <HStack height="100%">
        <Logo style={{ height: "60%" }} />
      </HStack>
      <HStack alignItems="center">
        <ConnectButton />
        <ColorModeButton />
      </HStack>
    </HStack>
  );
}
