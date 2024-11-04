import { FaCheckCircle } from 'react-icons/fa';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Welcome() { 
  const navigate = useNavigate();

  const handleBeginClick = () => {
    navigate('/seller-register');
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <Box className="bg-white rounded-md shadow-lg p-10 w-full max-w-4xl">
        <Typography variant="h4" className="text-center font-bold mb-6">
          Welcome! Here is what to expect
        </Typography>

        <Box className="flex justify-between mt-10">
          {/* Left Section */}
          <Box className="space-y-8 w-2/3">
            {/* Step 1 */}
            <Box className="flex space-x-4 items-start">
              <Typography variant="h5" className="text-blue-500 font-bold">
                1
              </Typography>
              <Box>
                <Typography variant="h6" className="font-semibold">
                  Provide your Information and Documents
                </Typography>
                <Typography className="text-gray-600">
                  We need to collect relevant personal and business information to comply with identification and verification measures. We may require additional information or documents later.
                </Typography>
              </Box>
            </Box>

            {/* Step 2 */}
            <Box className="flex space-x-4 items-start">
              <Typography variant="h5" className="text-blue-500 font-bold">
                2
              </Typography>
              <Box>
                <Typography variant="h6" className="font-semibold">
                  We will verify your submission
                </Typography>
                <Typography className="text-gray-600">
                  You may be asked to meet with an Amazon Associate to verify your submission. This helps keep Amazon a trusted shopping destination.
                </Typography>
              </Box>
            </Box>

            {/* Step 3 */}
            <Box className="flex space-x-4 items-start">
              <Typography variant="h5" className="text-blue-500 font-bold">
                3
              </Typography>
              <Box>
                <Typography variant="h6" className="font-semibold">
                  Get verified and start selling!
                </Typography>
                <Typography className="text-gray-600">
                  After we receive all of the required information, it will be verified as soon as possible.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Section */}
          <Box className="space-y-6 w-1/3 border-l border-gray-300 pl-8">
            <Typography variant="h6" className="font-semibold">
              What you will need:
            </Typography>

            <Box className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" />
              <Typography className="text-gray-600">
                Valid government issued ID or passport
              </Typography>
            </Box>
            <Box className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" />
              <Typography className="text-gray-600">
                Recent bank account or credit card statement
              </Typography>
            </Box>
            <Box className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" />
              <Typography className="text-gray-600">
                Chargeable credit or debit card
              </Typography>
            </Box>
            <Box className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" />
              <Typography className="text-gray-600">
                Mobile phone
              </Typography>
            </Box>
          </Box>
        </Box>

        <div className="flex justify-center mt-10">
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#118394', width: '80%' }} 
            size="large" 
            onClick={handleBeginClick}
          >
            Begin
          </Button>
        </div>
      </Box>
    </div>
  );
};
