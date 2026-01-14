"use client";
import React, { useEffect, useState, use } from 'react';
import ViewDetails from '@/src/components/view-details/ViewDetails';

const ServiceDetailsPage = ({ params }) => {
    const { id } = use(params); 
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || id === 'undefined') return;

        fetch(`/api/services/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then(data => {
                setService(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [id]);

    if (error) return <div className="py-20 font-bold tracking-widest text-center text-red-500">ERROR: {error}</div>;

    return <ViewDetails service={service} />;
};

export default ServiceDetailsPage;