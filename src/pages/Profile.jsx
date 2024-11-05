import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Divider, Skeleton, Avatar, Paper } from '@mui/material';
import { MdBusiness, MdPhone, MdLocationOn, MdEmail, MdPerson, MdCalendarToday } from 'react-icons/md';
import { FaPassport, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { authContext } from '../Context/authentication';
import { useTheme } from '@mui/material/styles';


const Profile = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(authContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(
          'https://ahmed-sabry-ffbbe964.koyeb.app/sellers/seller/',
          {
            headers: {
              'Authorization': `${token}`
            }
          }
        );
        setSeller(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setLoading(false);
      }
    };

    if (token) {
      fetchSellerData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  const InfoItem = ({ icon, label, value, arabic }) => (
    <Paper className="flex items-center gap-4 p-4 mb-4 hover:shadow-lg transform hover:scale-102 transition-all duration-300 ease-in-out">
      <div style={{ color: theme.palette.secondary.main }} className="text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-gray-800 font-semibold">
          {value} {arabic && <span className="mr-2 font-arabic text-gray-600">({arabic})</span>}
        </p>
      </div>
    </Paper>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto mt-10">
      <Card elevation={3} className="overflow-visible hover:shadow-xl transition-shadow duration-300">
        {/* Profile Header with Avatar */}
        <div className="p-6 flex items-center gap-6">
          <Avatar
            sx={{ 
              width: 96, 
              height: 96,
              bgcolor: theme.palette.secondary.main 
            }}
            className="border-4 border-white shadow-lg animate-fadeIn"
          >
            {seller.userId.name.charAt(0)}
          </Avatar>
          
          {/* Header Section next to avatar */}
          <div className="animate-slideIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{seller.userId.name}</h2>
            <span style={{ 
              backgroundColor: `${theme.palette.secondary.main}15`,
              color: theme.palette.secondary.main 
            }} className="px-4 py-1.5 rounded-full text-sm font-medium">
              {seller.status} seller
            </span>
          </div>
        </div>

        <Divider className="mb-8" />

        {/* Information Sections */}
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Information */}
            <div className="bg-gray-50 p-6 rounded-lg animate-fadeInUp">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <MdBusiness style={{ color: theme.palette.secondary.main }} />
                Business Information
              </h3>
              <InfoItem 
                icon={<MdBusiness />} 
                label="Business Name" 
                value={seller.businessName}
                arabic={seller.businessNameArabic}
              />
              <InfoItem 
                icon={<MdLocationOn />} 
                label="Address" 
                value={`${seller.addressLine}, ${seller.governorate}, ${seller.country}`}
              />
              <InfoItem 
                icon={<MdPhone />} 
                label="Phone Number" 
                value={seller.phoneNumber}
              />
              <InfoItem 
                icon={<MdEmail />} 
                label="Email" 
                value={seller.userId.email}
              />
            </div>

          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-lg animate-fadeInUp delay-200">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <MdPerson style={{ color: theme.palette.secondary.main }} />
              Personal Information
            </h3>
            <InfoItem 
              icon={<MdPerson />} 
              label="Full Name" 
              value={seller.fullName}
            />
            <InfoItem 
              icon={<MdCalendarToday />} 
              label="Date of Birth" 
              value={new Date(seller.dateOfBirth).toLocaleDateString()}
            />
            <InfoItem 
              icon={<FaPassport />} 
              label="Identity Number" 
              value={seller.nationalIdOrPassport}
            />
            <InfoItem 
              icon={<FaCreditCard />} 
              label="Card Information" 
              value={`**** **** **** ${seller.cardNumber.slice(-4)}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
};

export default Profile;
  