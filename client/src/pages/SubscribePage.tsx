import React, { useState } from 'react';
import "./SubscribePage.css";

const SubscribePage: React.FC = () => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkboxOptions, setCheckboxOptions] = useState({
        local: false,
        crime: false,
        breakingNews: false,
        sports: false
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        
        if (name === 'selectAll') {
            // If the "Select All" checkbox is clicked, update all checkboxes
            setIsCheckedAll(checked);
            setCheckboxOptions(prevOptions => {
                return Object.keys(prevOptions).reduce((options, key) => {
                    options[key] = checked;
                    return options;
                }, {});
            });
        } else {
            // If an individual checkbox is clicked, update the "Select All" checkbox accordingly
            setCheckboxOptions(prevOptions => ({
                ...prevOptions,
                [name]: checked
            }));
            setIsCheckedAll(Object.values(checkboxOptions).every(option => option));
        }
    };

    return (
        <div className="subscribe">
            <h1 className="subscribe--header">Subscribe for Daily Newsletter</h1>
            <p className="subscribe--subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error totam nostrum odit adipisci suscipit expedita dolorum tempora ullam natus culpa. Temporibus dolor nam neque maiores deleniti labore dolore officia officiis.</p>
            <form>
                <div>
                    <label htmlFor="type">Check all that apply:</label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="local"
                            checked={checkboxOptions.local}
                            onChange={handleCheckboxChange}
                        />
                        Local
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="crime"
                            checked={checkboxOptions.crime}
                            onChange={handleCheckboxChange}
                        />
                        Crime
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="breakingNews"
                            checked={checkboxOptions.breakingNews}
                            onChange={handleCheckboxChange}
                        />
                        Breaking News
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="sports"
                            checked={checkboxOptions.sports}
                            onChange={handleCheckboxChange}
                        />
                        Sports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="selectAll"
                            checked={isCheckedAll}
                            onChange={handleCheckboxChange}
                        />
                        Select All
                    </label>
                </div>
                <div>
                    <label htmlFor="frequency">Frequency</label>
                </div>
                <div>
                    <input type="email" placeholder='Enter your email address'/>
                    <input type="tel" placeholder='Mobile Number'/>
                    <button type="submit">Subscribe</button>
                </div>
            </form>
        </div>
    );
}

export default SubscribePage;
