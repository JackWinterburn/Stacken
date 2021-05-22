import DarkModeSwitch from '../DarkModeSwitch'
import { useState, useEffect } from 'react'
import {
    Container,
    Heading,
    FormLabel,
    Input,
    Divider,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Flex,
    Spinner
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { getUUID } from "../Main/getUUID"
import { getEntity } from "../../api/getEntity"
import { putEntity } from "../../api/putEntity"
import { UserCreatedValue } from "../../types"

function Settings() {
    const [userInfo, setUserInfo] = useState<UserCreatedValue>()
    const [inputState, setInputState] = useState({
        Name: "",
        Email: "",
        ProfilePictureURL: ""
    })
    const [ifInfoHasChanged, setIfInfoHasChanged] = useState(false)

    useEffect(() => {
        if(getUUID()){
            getEntity("user", getUUID()).then(
                (resp) => {
                    setUserInfo(resp)
                    setInputState({
                        Name: resp.Name,
                        Email: resp.Email,
                        ProfilePictureURL: resp.ProfilePictureURL
                    })
                })
        }
    }, [])

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIfInfoHasChanged(true)
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(userInfo !== undefined) {
            try {
                await putEntity("user", {...userInfo,
                                        Email: inputState.Email,
                                        Name: inputState.Name,
                                        ProfilePictureURL: inputState.ProfilePictureURL})
            } catch(e) {}
        }
    }

    return (
        <Container mt={10}>
            <Flex direction="column">
            <Tag size="sm" mb="5" borderRadius="full">
            <Breadcrumb textAlign="left">
                <BreadcrumbItem>
                <Link className="bdcm-link" to="/">
                    Home
                </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                <Link className="bdcm-link" to="#">
                    Settings
                </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            </Tag>
            </Flex>

            <Heading>Settings <SettingsIcon/></Heading>

            {userInfo === undefined ?
            <Spinner />
            :
            <form onSubmit={onSubmit}>
            <FormLabel mt={4}>Name</FormLabel>
            <Input defaultValue={inputState.Name} mb={2} onChange={onChange} name="Name" />

            <FormLabel>Email</FormLabel>
            <Input defaultValue={inputState.Email} mb={2} onChange={onChange} name="Email" />

            <FormLabel>Profile Picture URL</FormLabel>
            <Input defaultValue={inputState.ProfilePictureURL} mb={2} onChange={onChange} name="ProfilePictureURL" />

            <Button mt={3} variant="outline" colorScheme="green" w="100%" type="submit" isDisabled={!ifInfoHasChanged}>Save</Button>
            </form>
            }

            <Divider mt={3} mb={3}/>

            <FormLabel mt={2}>Dark Mode</FormLabel>
            <DarkModeSwitch />
        </Container>
    )
}

export default Settings
