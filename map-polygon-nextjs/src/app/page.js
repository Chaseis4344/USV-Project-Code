import Head from 'next/head';
import React from 'react';

export default function Home() {
    return (
        <>
            <Head>
                <title>Home Page</title>
                <link rel="stylesheet" href="https://maps-sdk.trimblemaps.com/v3/trimblemaps-3.12.0.css" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1>Welcome to the Home Page</h1>
                {/* Your additional content goes here */}
            </main>
        </>
    );
}
