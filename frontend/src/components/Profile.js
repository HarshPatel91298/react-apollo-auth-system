import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

export default function Profile() {
    const [profileData, setProfileData] = useState('');
    const navigate = useNavigate();

    const QUERY = gql`
    query GetProfile {
       getProfile {
            email
            error
        }
    }
    `;

    const { data, loading, error } = useQuery(QUERY);

    useEffect(() => {
        if (data) {
            if (data.getProfile.error) {
                navigate('/login');
            } else {
                setProfileData(data.getProfile);
            }
        }
    }, [data, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log("Error", error);
        return <p>Error</p>;
    }

   

    return (
        <div className="bg-gray-100 min-h-screen py-6 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-gray-600 block mb-1">Email:</label>
                    <span className="text-gray-800">{profileData.email}</span>
                </div>
                {/* Add more profile details here */}
            </div>
        </div>
    </div>
    );
}
