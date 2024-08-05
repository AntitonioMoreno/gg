import React, { useState, useEffect } from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import { Introduction } from './Introduction';
import { Objectives } from './Objectives';
import { Services } from './Services';
import UserLoggedNavbar from '../components/navbars/UserLoggedNavbar';

export const GgInformation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const sections = [
        { id: 'section1', content: <Introduction /> },
        { id: 'section2', content: <Objectives /> },
        { id: 'section3', content: <Services /> }
    ];

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/accounts/Authentication', {
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } 
            } catch (error) {
                console.error('Error checking auth', error);
            }
        };

        checkAuth();
    }, []);

    const showSection = (index) => {
        if (index >= sections.length) {
            setCurrentIndex(0);
        } else if (index < 0) {
            setCurrentIndex(sections.length - 1);
        } else {
            setCurrentIndex(index);
        }
    };

    const nextSection = () => {
        showSection(currentIndex + 1);
    };
/*
    const prevSection = () => {
        showSection(currentIndex - 1);
    };
*/
    const offset = -currentIndex * 100;

    return (
        <section className='gginformationmain-container'>
            { isAuthenticated ? <UserLoggedNavbar/> : <MainNabvar/>}
            <section className='sb-section'>
                <div className='search-bar'>
                    <i class='bx bx-search'></i>
                    <input type='text'></input>
                    <i class='bx bx-x'></i>
                </div>
            </section>
            <section className='title-section'>
                <h1>Referencias</h1>
            </section>
            <section className='videos-section'>
                <div className='video-container'>
                    <video width={"360"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
                <div className='video-container'>
                    <video width={"360"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
                <div className='video-container'>
                    <video width={"360"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
            </section>

            <section className="carousel-container">
                <div className="carousel" style={{ transform: `translateX(${offset}%)` }}>
                    {sections.map((section, index) => (
                        <div key={section.id} className="carousel-item">
                            {section.content}
                        </div>
                    ))}
                </div>
                <div className='next-item' onClick={nextSection}>
                    <i class='bx bx-chevron-right'></i>
                </div>
            </section>
        </section>
    )
}