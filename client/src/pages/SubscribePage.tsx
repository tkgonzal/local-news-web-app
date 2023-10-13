import React from 'react';
import "./SubscribePage.css";

const SubscribePage: React.FC = () => {


    return (
        <div className="subscribe">
            <h1 className="subscribe--header">subscribe for daily newsletter</h1>
            <p className="subscribe--subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error totam nostrum odit adipisci suscipit expedita dolorum tempora ullam natus culpa. Temporibus dolor nam neque maiores deleniti labore dolore officia officiis.</p>
            <form>
                <div>
                    <label htmlFor="type">Check all that apply:</label>
                    <input type="checkbox" />
                </div>
                <div>
                    <label htmlFor="frequency">Frequency</label>
                </div>
                <div>
                    <input type="email" />
                    <input type="text" />
                    <button type="submit">subscribe</button>
                </div>
            </form>
        </div>
    );
}

export default SubscribePage;