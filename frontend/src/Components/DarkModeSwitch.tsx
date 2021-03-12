import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function DarkModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
        <IconButton
            aria-label="Toggle Dark Switch"
            size="xs"
            icon={
            colorMode === "dark" ? <MoonIcon mx="10px" /> : <SunIcon mx="10px" />
            }
            onClick={() => toggleColorMode()}
        />
        </>
    );
}

export default DarkModeSwitch;
