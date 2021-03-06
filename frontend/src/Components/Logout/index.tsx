import { useState, useEffect } from 'react'
import { Redirect, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signout } from "../../actions"
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text
} from "@chakra-ui/react"

function Logout() {
    const history = useHistory()
    const [redirect, setRedirect] = useState({
        to: "",
        go: false
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()

    function logout() {
        // force all personalised cookies to expire (and be deleted) by setting them to a past date
        document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
        document.cookie = "UUID=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
        dispatch(signout())
        setRedirect({to: "/login", go: true})
    }

    useEffect(() => {
        onOpen() // open the modal dialogue as soon as the user lands on the page
    })

    return (
        redirect.go ? <Redirect to={"/login"}/> :
        <div>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out?</ModalHeader>
          <ModalBody>
              <Text>You are about to log out.</Text>
              <Text>Are you sure you want to continue?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => logout()}>Yes, log me out</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
    )
}

export default Logout
