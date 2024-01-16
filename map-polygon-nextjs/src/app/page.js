import React from 'react';
import TrimbleMapComponent from '../../components/map';

export default function Home() {
    return (
        <>
           <header></header>
            <main className="flex h-screen w-screen flex-col items-center justify-center p-24">
            
            <h1>Welcome to the Home Page</h1>
            <TrimbleMapComponent />
                
            </main>
            <footer></footer>
        </>
    );
}
