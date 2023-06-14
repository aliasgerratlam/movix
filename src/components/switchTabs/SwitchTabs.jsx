import React, { useState } from 'react';
import './SwitchTabs.scss';

const SwitchTabs = ({data, onTabChange}) => {
    const [selectedTabs, setSelectedTabs] = useState(0);
    const [left, setleft] = useState(0);

    const activeTabs = (data, index) => {
        // console.log(data, index);
        setleft(index * 100);
        setTimeout(() => {
            setSelectedTabs(index);
        }, 300);
        onTabChange(data, index);
        console.log('data', data)
    }

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((data, index) => (
                    <span 
                        key={index}
                        className={`tabItem ${selectedTabs === index ? "active" : ""}`}
                        onClick={() => activeTabs(data, index)}
                    >{data}</span>
                ))}
                <span className="movingBg" style={{left}}></span>
            </div>

        </div>
    )
}

export default SwitchTabs