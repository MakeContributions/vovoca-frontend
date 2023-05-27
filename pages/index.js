import React, { useEffect } from "react";
import Head from "next/head";
import About from "../components/homepage/About/About";
import Footer from "../components/homepage/Footer/Footer";
import Guest from "../components/homepage/Guest/Guest";
import Header from "../components/homepage/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { getAllMusic } from "../actions/musicActions";

const HomePage = () => {
    const links = [
        { sizes: "57x57", href: "/apple-icon-57x57.png" },
        { sizes: "60x60", href: "/apple-icon-60x60.png" },
        { sizes: "72x72", href: "/apple-icon-72x72.png" },
        { sizes: "76x76", href: "/apple-icon-76x76.png" },
        { sizes: "114x114", href: "/apple-icon-114x114.png" },
        { sizes: "120x120", href: "/apple-icon-120x120.png" },
        { sizes: "144x144", href: "/apple-icon-144x144.png" },
        { sizes: "152x152", href: "/apple-icon-152x152.png" },
        { sizes: "180x180", href: "/apple-icon-180x180.png" },
        { sizes: "192x192", href: "/android-icon-192x192.png" },
        { sizes: "32x32", href: "/favicon-32x32.png" },
        { sizes: "96x96", href: "/favicon-96x96.png" },
        { sizes: "16x16", href: "/favicon-16x16.png" },
    ];

    const linkEls = links.map((link, id) => (
        <link
            key={id}
            rel="apple-touch-icon"
            sizes={link.sizes}
            href={link.href}
            type="image/png"
        />
    ));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMusic());
    }, []);
    return (
        <div>
            <Head>
                {linkEls}
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="/ms-icon-144x144.png"
                />
                <meta name="theme-color" content="#ffffff" />
                <title>VOVOCA | Home</title>
            </Head>
            <Header />
            <About />
            <Guest />
            <Footer />
        </div>
    );
};

export default HomePage;
