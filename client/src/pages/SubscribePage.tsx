import React, { useState } from "react";
import "./SubscribePage.css";

type FormData = {
  isCheckedAll: boolean;
  checkboxOptions: {
    local: boolean;
    crime: boolean;
    breakingNews: boolean;
    sports: boolean;
  };
  frequency: string;
  email: string;
  phoneNumber: string;
};

const SubscribePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    isCheckedAll: false,
    checkboxOptions: {
      local: false,
      crime: false,
      breakingNews: false,
      sports: false,
    },
    frequency: "",
    email: "",
    phoneNumber: "",
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "selectAll") {
      setFormData((prevData) => ({
        ...prevData,
        isCheckedAll: checked,
        checkboxOptions: Object.keys(prevData.checkboxOptions).reduce(
          (options, key) => {
            options[key] = checked;
            return options;
          },
          {}
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        checkboxOptions: {
          ...prevData.checkboxOptions,
          [name]: checked,
        },
        isCheckedAll: Object.values(prevData.checkboxOptions).every(
          (option) => option
        ),
      }));
    }
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, frequency: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, phoneNumber: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <div className="subscribe">
      <h1 className="subscribe--header">Subscribe for Daily Newsletter</h1>
      <p className="subscribe--subtext">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error totam
        nostrum odit adipisci suscipit expedita dolorum tempora ullam natus
        culpa. Temporibus dolor nam neque maiores deleniti labore dolore officia
        officiis.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Check all that apply:</label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="local"
              checked={formData.checkboxOptions.local}
              onChange={handleCheckboxChange}
            />
            Local
          </label>
          <label>
            <input
              type="checkbox"
              name="crime"
              checked={formData.checkboxOptions.crime}
              onChange={handleCheckboxChange}
            />
            Crime
          </label>
          <label>
            <input
              type="checkbox"
              name="breakingNews"
              checked={formData.checkboxOptions.breakingNews}
              onChange={handleCheckboxChange}
            />
            Breaking News
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.checkboxOptions.sports}
              onChange={handleCheckboxChange}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="selectAll"
              checked={formData.isCheckedAll}
              onChange={handleCheckboxChange}
            />
            All
          </label>
        </div>
        <div>
          <label htmlFor="frequency">Frequency:</label>
          <select value={formData.frequency} onChange={handleFrequencyChange}>
            <option value="">Select Frequency</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Mobile Number"
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  );
};

export default SubscribePage;
