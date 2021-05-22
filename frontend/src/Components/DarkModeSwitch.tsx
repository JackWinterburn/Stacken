import { useColorMode, Switch } from "@chakra-ui/react";

function DarkModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
        <Switch
            aria-label="Toggle Dark Switch"
            isChecked={colorMode === "dark" ? true : false}
            onChange={() => toggleColorMode()}
        />
        </>
    );
}

export default DarkModeSwitch;
