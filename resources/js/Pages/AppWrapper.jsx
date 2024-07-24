// AppWrapper.jsx
import React from 'react';
import { InertiaApp } from '@inertiajs/inertia-react';
import Layout from './components/Layout';

const AppWrapper = ({ initialPage, resolveComponent }) => {
    return (
        <Layout>
            <InertiaApp initialPage={initialPage} resolveComponent={resolveComponent} />
        </Layout>
    );
};

export default AppWrapper;
