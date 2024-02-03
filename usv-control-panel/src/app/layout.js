import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import MapComponent from '../../components/map.js';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <head>
              <title>Polygon Demo</title> 
              <script src="https://maps-sdk.trimblemaps.com/addon/trimblemaps-draw-1.0.2.js"></script>
              <link rel="stylesheet" href="https://maps-sdk.trimblemaps.com/v3/trimblemaps-3.12.0.css" />
              <link href="https://maps-sdk.trimblemaps.com/addon/trimblemaps-draw-1.0.2.css" rel="stylesheet" />
          </head> 
          <body>
              {children}
          </body>
      </html>
  );
}

