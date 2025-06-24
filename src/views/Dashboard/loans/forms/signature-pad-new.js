import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Tooltip,
  Select,
} from "@chakra-ui/react";

function SignaturePad({ onSave, initialSignature }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const ctx = useRef(null);
  const [error, setError] = useState('');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    updateContext();
    // Clear canvas on mount
    ctx.current.clearRect(0, 0, canvas.width, canvas.height);
  }, [penColor, penSize]);

  useEffect(() => {
    if (initialSignature && canvasRef.current) {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        setIsLoading(false);
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);

  const updateContext = () => {
    if (ctx.current) {
      ctx.current.strokeStyle = penColor;
      ctx.current.lineWidth = penSize;
      ctx.current.lineCap = "round";
    }
  };

  const startDrawing = (e) => {
    if (e.cancelable) e.preventDefault();
    isDrawing.current = true;
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (e.cancelable) e.preventDefault();
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
  };

  const stopDrawing = (e) => {
    if (e.cancelable) e.preventDefault();
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
    setError('');
    onSave(null);
  };

  const save = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let isEmpty = true;

    // Check if the canvas is empty by checking alpha channel
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      setError('Please provide a signature before saving');
      return;
    }

    try {
      const signature = canvas.toDataURL();
      onSave(signature);
      setError('');
    } catch (err) {
      setError('Failed to save signature. Please try again.');
      console.error('Signature save error:', err);
    }
  };

  const handlePenColorChange = (e) => {
    setPenColor(e.target.value);
  };

  const handlePenSizeChange = (e) => {
    setPenSize(parseInt(e.target.value));
  };

  return (
    <VStack spacing={4} align="stretch">
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Text fontSize="sm" color={textColor}>
        Please sign below using your mouse or touch screen
      </Text>

      <Box
        border="2px"
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        position="relative"
        opacity={isLoading ? 0.7 : 1}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{ touchAction: "none", width: "100%", height: "200px" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <Text
          position="absolute"
          bottom={2}
          right={2}
          fontSize="xs"
          color="gray.500"
          pointerEvents="none"
        >
          Sign here
        </Text>
      </Box>

      <HStack spacing={4} justify="space-between">
        <HStack spacing={4}>
          <Tooltip label="Pen Color">
            <Box>
              <input
                type="color"
                value={penColor}
                onChange={handlePenColorChange}
                style={{ width: '36px', height: '36px', padding: '2px' }}
              />
            </Box>
          </Tooltip>
          
          <Tooltip label="Pen Size">
            <Select
              value={penSize}
              onChange={handlePenSizeChange}
              width="100px"
              size="sm"
            >
              <option value={1}>Thin</option>
              <option value={2}>Medium</option>
              <option value={3}>Thick</option>
            </Select>
          </Tooltip>
        </HStack>

        <HStack spacing={4}>
          <Button
            size="sm"
            onClick={clear}
            variant="outline"
            colorScheme="red"
          >
            Clear
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={save}
          >
            Save Signature
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
}

export default SignaturePad;
