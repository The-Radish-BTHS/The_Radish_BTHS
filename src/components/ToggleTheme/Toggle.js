import React, { useEffect, useState } from 'react';
import { setTheme } from './themes';

const isBrowser = typeof window !== "undefined"

export default function Toggle() {
    const [togClass, setTogClass] = useState('dark');

    if (isBrowser) {
      var theme = localStorage.getItem('theme');
    }

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])

    return (
      <button onClick={handleOnClick}>
        {
          togClass === "light"
            ? "Darken"
            : "Lighten"
        }
      </button>
    )
}
