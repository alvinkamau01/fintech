"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useToast,
  ScaleFade,
  Divider,
  Icon,
  useDisclosure,
  chakra,
  keyframes,
} from "@chakra-ui/react"
import { signIn, signInWithGoogle } from "../../authFunctions"
import { useHistory } from "react-router-dom"
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa"
import { motion } from "framer-motion"
import signInImage from "assets/img/signInImage.png"

// Create a motion-enabled div
const MotionBox = chakra(motion.div)

// Define keyframes for the floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

// Define keyframes for the shine effect
const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [animateForm, setAnimateForm] = useState(false)

  const history = useHistory()
  const toast = useToast()
  const { isOpen, onOpen } = useDisclosure()

  // Color mode values
  const titleColor = useColorModeValue("teal.400", "teal.200")
  const textColor = useColorModeValue("gray.600", "gray.200")
  const bgColor = useColorModeValue("white", "gray.800")
  const inputBgColor = useColorModeValue("gray.50", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const buttonBgGradient = useColorModeValue("linear(to-r, teal.400, teal.500)", "linear(to-r, teal.300, teal.400)")
  const hoverButtonBgGradient = useColorModeValue(
    "linear(to-r, teal.500, teal.600)",
    "linear(to-r, teal.400, teal.500)",
  )
  const googleButtonBg = useColorModeValue("white", "gray.700")
  const googleButtonColor = useColorModeValue("gray.800", "white")
  const googleButtonBorder = useColorModeValue("gray.200", "gray.600")

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateForm(true)
      onOpen()
    }, 300)
    return () => clearTimeout(timer)
  }, [onOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await signIn(email, password)
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
      } else {
    toast({
      title: "Success!",
      description: "You've successfully signed in.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
    history.push("/admin")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast({
          title: "Error",
          description: "Google sign-In failed Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
      } else {
    toast({
      title: "Success!",
      description: "You've successfully signed in with Google.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
    history.push("/admin")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
    setLoading(false)
  }
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <Flex position="relative" minH="100vh" overflow="hidden">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg={useColorModeValue(
          "linear-gradient(120deg, rgba(249,249,249,1) 0%, rgba(240,255,255,1) 100%)",
          "linear-gradient(120deg, rgba(26,32,44,1) 0%, rgba(45,55,72,1) 100%)",
        )}
        zIndex="-1"
      />

      <Flex
        h={{ sm: "initial", md: "100vh" }}
        w="100%"
        maxW="1200px"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: 4, md: 8 }}
      >
        {/* Form Section */}
        <ScaleFade in={animateForm} initialScale={0.9}>
          <Flex
            direction="column"
            w={{ base: "100%", md: "460px" }}
            background={bgColor}
            borderRadius="2xl"
            p={{ base: 8, md: 12 }}
            boxShadow="xl"
            mx={{ base: 10, md: 0 }}
            position={{ base: "static", md: "relative" }}
            zIndex="1"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: "-10px",
              left: "-10px",
              right: "-10px",
              height: "10px",
              bgGradient: "linear(to-r, teal.400, blue.500)",
              borderRadius: "full",
              filter: "blur(10px)",
              opacity: 0.3,
            }}
          >
            {/* Decorative elements */}
            <Box
              position="absolute"
              top="0"
              right="0"
              width="150px"
              height="150px"
              bg="teal.50"
              borderBottomLeftRadius="full"
              opacity="0.4"
              zIndex="-1"
            />

            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="120px"
              height="120px"
              bg="blue.50"
              borderTopRightRadius="full"
              opacity="0.4"
              zIndex="-1"
            />

            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                textAlign="center"
                mb="6"
                bgGradient="linear(to-r, teal.400, teal.600)"
                bgClip="text"
              >
                Welcome Back
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                fontSize="sm"
                mb="6"
                w="100%"
                h="50"
                onClick={handleGoogleSignIn}
                isLoading={loading}
                leftIcon={<FaGoogle />}
                bg={googleButtonBg}
                color={googleButtonColor}
                border="1px"
                borderColor={googleButtonBorder}
                _hover={{
                  boxShadow: "md",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease",
                }}
                transition="all 0.2s ease"
              >
                SIGN IN WITH GOOGLE
              </Button>
            </MotionBox>

            <Flex align="center" mb="6">
              <Divider flex="1" borderColor={borderColor} />
              <Text fontSize="sm" color={textColor} fontWeight="medium" mx="4">
                or continue with
              </Text>
              <Divider flex="1" borderColor={borderColor} />
            </Flex>

            <MotionBox
              as="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <FormControl mb="4">
                <FormLabel fontSize="sm" fontWeight="medium" color={textColor} display="flex" alignItems="center">
                  <Icon as={FaEnvelope} mr="2" color={titleColor} />
                  Email
                </FormLabel>
                <InputGroup>
                  <Input
                    fontSize="md"
                    borderRadius="lg"
                    type="email"
                    placeholder="Your email address"
                    size="lg"
                    bg={inputBgColor}
                    borderColor={borderColor}
                    _hover={{ borderColor: "teal.300" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px teal.400",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>

              <FormControl mb="6">
                <FormLabel fontSize="sm" fontWeight="medium" color={textColor} display="flex" alignItems="center">
                  <Icon as={FaLock} mr="2" color={titleColor} />
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    fontSize="md"
                    borderRadius="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    size="lg"
                    bg={inputBgColor}
                    borderColor={borderColor}
                    _hover={{ borderColor: "teal.300" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px teal.400",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement height="full">
                    <Button
                      variant="ghost"
                      onClick={togglePassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <Icon as={showPassword ? FaEyeSlash : FaEye} color={textColor} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex justify="flex-end" mt="2">
                  <Link
                    href="#"
                    fontSize="sm"
                    color={titleColor}
                    fontWeight="medium"
                    _hover={{ textDecoration: "none", color: "teal.600" }}
                  >
                    Forgot password?
                  </Link>
                </Flex>
              </FormControl>

              <Button
                type="submit"
                bgGradient={buttonBgGradient}
                _hover={{
                  bgGradient: hoverButtonBgGradient,
                  boxShadow: "lg",
                  transform: "translateY(-2px)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                fontSize="md"
                color="white"
                fontWeight="bold"
                w="100%"
                h="50"
                mb="6"
                borderRadius="lg"
                isLoading={loading}
                loadingText="Signing In"
                rightIcon={<FaArrowRight />}
                transition="all 0.2s ease"
                position="relative"
                overflow="hidden"
                _after={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "200%",
                  height: "100%",
                  backgroundImage: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: `${shine} 2s infinite linear`,
                }}
              >
                SIGN IN
              </Button>
            </MotionBox>
          </Flex>
        </ScaleFade>

        {/* Image Section on the right */}
        <Box display={{ base: "none", md: "block" }} w="50%" h="100vh" position="relative" overflow="hidden">
          <Box
            bgColor={titleColor}
            bgSize="cover"
            bgPosition="center"
            w="100%"
            h="100%"
            right="2%"
            position="absolute"
            boxShadow="-10px 0 30px -5px rgba(0, 0, 0, 0.1)"
            _after={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)",
              zIndex: 1,
            }}
          />

          <MotionBox
            position="absolute"
            top="15%"
            left="10%"
            zIndex="2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            animation={`${float} 6s ease-in-out infinite`}
          >
            <Box
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(20px)"
              borderRadius="full"
              p="6"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <Text color="white" fontWeight="bold" fontSize="xl" textShadow="0 2px 4px rgba(0,0,0,0.3)">
                Welcome to Everpress
              </Text>
            </Box>
          </MotionBox>

          <MotionBox
            position="absolute"
            top="40%"
            left="10%"
            zIndex="2"
            maxW="450px"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Text
              fontSize={{ md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
              lineHeight="1.2"
              mb="4"
            >
              Manage Your Content With Ease
            </Text>
            <Text fontSize={{ md: "lg" }} color="whiteAlpha.900" textShadow="0 2px 4px rgba(0,0,0,0.2)" mb="6">
              Sign in to access your dashboard and take control of your digital presence
            </Text>

            <Flex gap="4" flexWrap="wrap">
              <Box
                bg="rgba(255, 255, 255, 0.15)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                p="3"
                display="flex"
                alignItems="center"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                border="1px solid rgba(255, 255, 255, 0.1)"
              >
                <Box bg="teal.400" borderRadius="full" p="2" mr="3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Text color="white" fontWeight="medium">
                  Easy Content Management
                </Text>
              </Box>

              <Box
                bg="rgba(255, 255, 255, 0.15)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                p="3"
                display="flex"
                alignItems="center"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                border="1px solid rgba(255, 255, 255, 0.1)"
              >
                <Box bg="teal.400" borderRadius="full" p="2" mr="3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Text color="white" fontWeight="medium">
                  Real-time Analytics
                </Text>
              </Box>
            </Flex>
          </MotionBox>

          {/* Decorative elements */}
          <Box position="absolute" top="5%" right="5%" zIndex="2" opacity="0.7">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="2" fill="white" />
              <circle cx="30" cy="10" r="2" fill="white" />
              <circle cx="50" cy="10" r="2" fill="white" />
              <circle cx="70" cy="10" r="2" fill="white" />
              <circle cx="90" cy="10" r="2" fill="white" />
              <circle cx="110" cy="10" r="2" fill="white" />

              <circle cx="10" cy="30" r="2" fill="white" />
              <circle cx="30" cy="30" r="2" fill="white" />
              <circle cx="50" cy="30" r="2" fill="white" />
              <circle cx="70" cy="30" r="2" fill="white" />
              <circle cx="90" cy="30" r="2" fill="white" />
              <circle cx="110" cy="30" r="2" fill="white" />

              <circle cx="10" cy="50" r="2" fill="white" />
              <circle cx="30" cy="50" r="2" fill="white" />
              <circle cx="50" cy="50" r="2" fill="white" />
              <circle cx="70" cy="50" r="2" fill="white" />
              <circle cx="90" cy="50" r="2" fill="white" />
              <circle cx="110" cy="50" r="2" fill="white" />

              <circle cx="10" cy="70" r="2" fill="white" />
              <circle cx="30" cy="70" r="2" fill="white" />
              <circle cx="50" cy="70" r="2" fill="white" />
              <circle cx="70" cy="70" r="2" fill="white" />
              <circle cx="90" cy="70" r="2" fill="white" />
              <circle cx="110" cy="70" r="2" fill="white" />

              <circle cx="10" cy="90" r="2" fill="white" />
              <circle cx="30" cy="90" r="2" fill="white" />
              <circle cx="50" cy="90" r="2" fill="white" />
              <circle cx="70" cy="90" r="2" fill="white" />
              <circle cx="90" cy="90" r="2" fill="white" />
              <circle cx="110" cy="90" r="2" fill="white" />

              <circle cx="10" cy="110" r="2" fill="white" />
              <circle cx="30" cy="110" r="2" fill="white" />
              <circle cx="50" cy="110" r="2" fill="white" />
              <circle cx="70" cy="110" r="2" fill="white" />
              <circle cx="90" cy="110" r="2" fill="white" />
              <circle cx="110" cy="110" r="2" fill="white" />
            </svg>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SignIn
