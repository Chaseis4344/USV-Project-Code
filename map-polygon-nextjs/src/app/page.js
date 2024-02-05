import React from 'react';
import TrimbleMapComponent from '../../components/map';
import Image from 'next/image';
export default function Home() {
    return (
        <div className="bg-[#19315D] flex-col">
            <header>
                <nav className='bg-slate-900 flex jus'>
                    <a href="https://measutronics.com" target="_blank" > <Image src="/measu.png" width={90} height ={45}></Image> </a>
                    <a className="text-[#F47839] text-[30px] p-10" href="#"> <i class="fas fa-home"></i> </a>
                    <a className="p-10 text-[30px] text-white inline-block no-underline" href="#"> <i class="fas fa-map-marker"></i> </a>
                    <a className="p-10 text-[30px] text-white inline-block no-underline" href="#"> <i class="fas fa-plus-circle"></i> </a>
                    <a className="p-10 text-[30px] text-white inline-block no-underline" href="#"> <i class="fas fa-save" aria-hidden="true"></i> </a>
                    <a className="p-10 text-[30px] text-white inline-block no-underline" href="#"><i class="fas fa-download"></i></a>
                </nav>
            </header>
            <main className="flex h-screen w-screen flex-col items-center justify-center p-24">
            
            
            <TrimbleMapComponent />
                
            </main>
            <footer className='-mx-3 p-5 flex items-center justify-center'> 
           
                <table className ="border border-collapse color-white w-[70%] my-[30px] jusify-center top-[10px] left-[30px] left">
                  <thead>
                      <tr>
                          <th className="border-2 border-solid border-[#4DB7E6] text-center p-8">Waypoint</th>
                          <th className="border-2 border-solid border-[#4DB7E6] text-center p-8">Latitude</th>
                          <th className="border-2 border-solid border-[#4DB7E6] text-center p-8">Longitude</th>
                          <th className="border-2 border-solid border-[#4DB7E6] text-center p-8">Angle</th>
                          <th className="border-2 border-solid border-[#4DB7E6] text-center p-8">Distance (m)</th>
                      </tr>
                  </thead>
                  <tbody className='text-center border border-solid border-[#4DB7E6]'>
                      <tr className='border-inherit'>
                          <td className='border border-inherit'>Home</td>
                          <td className='border border-inherit'>28.1508362</td>
                          <td className='border border-inherit'>-81.8512841</td>
                          <td className='border border-inherit'>0</td>
                          <td className='border border-inherit'>0</td>
                      </tr>
                      <tr className='border-inherit'>
                          <td  className='border-inherit border ' > ... </td>
                          <td  className='border-inherit border ' > ...</td>
                          <td  className='border-inherit border ' >... </td>
                          <td  className='border-inherit border ' >... </td>
                          <td  className='border-inherit border ' >... </td>
                      </tr>
                      <tr className='border-inherit'>
                          <td className='border-inherit border'>... </td>
                          <td className='border-inherit border'>... </td>
                          <td className='border-inherit border'>... </td>
                          <td className='border-inherit border'>... </td>
                          <td className='border-inherit border'>... </td>
                      </tr>
                      <tr className='border-inherit'>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                      </tr>
                      <tr className='border-inherit'>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                          <td  className='border-inherit border'>...</td>
                      </tr>
                  </tbody>
                </table>
            </footer>
        </div>
    );
}
