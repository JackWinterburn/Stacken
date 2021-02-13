import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function DarkModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <IconButton
                size="sm"
                aria-label="Toggle Dark Switch"
                icon={
                    colorMode === "dark" ? (
                        <MoonIcon mx="10px" />
                    ) : (
                        <SunIcon mx="10px" />
                    )
                }
                onClick={() => {
                    toggleColorMode();
                }}
            />
        </>
    );
}

export default DarkModeSwitch;
