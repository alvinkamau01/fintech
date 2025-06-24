import React, { useRef, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

function SignaturePad({ onSave }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const ctx = useRef(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.strokeStyle = useColorModeValue("black", "white");
    ctx.current.lineWidth = 2;
    ctx.current.lineCap = "round";
  }, []);

  const startDrawing = (e) => {
    isDrawing.current = true;
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const getCoordinates = (e) => {
    if (e.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
  };

  const clear = () => {
    const canvas = canvasRef.current;
    ctx.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const canvas = canvasRef.current;
    const signature = canvas.toDataURL();
    onSave(signature);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
        Please sign below using your mouse or touch screen
      </Text>
      <Box
        border="2px"
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        position="relative"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{ touchAction: "none" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </Box>
      <Box display="flex" gap={4}>
        <Button variant="outline" onClick={clear} flex={1}>
          Clear
        </Button>
        <Button colorScheme="blue" onClick={save} flex={1}>
          Save Signature
        </Button>
      </Box>
    </VStack>
  );
}

export default SignaturePad;
