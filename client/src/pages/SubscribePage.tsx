import React, { useState } from "react"

import "./SubscribePage.css"

type FormData = {
  isCheckedAll: boolean
  checkboxOptions: {
    local: boolean
    crime: boolean
    breakingNews: boolean
    sports: boolean
    government: boolean
    education: boolean
  }
  frequency: string
  email: string
  phoneNumber: string
}

const SubscribePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    isCheckedAll: false,
    checkboxOptions: {
      local: false,
      crime: false,
      breakingNews: false,
      sports: false,
      government: false,
      education: false
    },
    frequency: "",
    email: "",
    phoneNumber: "",
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    if (name === "selectAll") {
      setFormData((prevData) => ({
        ...prevData,
        isCheckedAll: checked,
        checkboxOptions: {
          local: checked,
          crime: checked,
          breakingNews: checked,
          sports: checked,
          government: checked,
          education: checked
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        checkboxOptions: {
          ...prevData.checkboxOptions,
          [name]: checked,
        },
        isCheckedAll: Object.values({
          ...prevData.checkboxOptions,
          [name]: checked,
        }).every(
          (option) => option
        ),
      }))
    }
  }

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, frequency: event.target.value })
  }


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value })
  }


  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, phoneNumber: event.target.value })
  }


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // console.log(formData)
  }


  return (
    <div className="subscribe">
      <h1 className="subscribe--header">Subscribe for Stay Updated</h1>
      <p className="subscribe--subtext">
        Subscribe to stay up to date on the more of the latest articles from 
        all over the valley!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="subscribe--checkbox-container">
          <div className="subscribe--label-container">
            <label htmlFor="type" className="subscribe--checkbox-label">
              Check all that apply:
            </label>
          </div>
          <div className="subscribe--checkbox-box">
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="local"
                checked={formData.checkboxOptions.local}
                onChange={handleCheckboxChange}
              />
              Local
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="crime"
                checked={formData.checkboxOptions.crime}
                onChange={handleCheckboxChange}
              />
              Crime
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="breakingNews"
                checked={formData.checkboxOptions.breakingNews}
                onChange={handleCheckboxChange}
              />
              Breaking News
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="sports"
                checked={formData.checkboxOptions.sports}
                onChange={handleCheckboxChange}
              />
              Sports
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="government"
                checked={formData.checkboxOptions.government}
                onChange={handleCheckboxChange}
              />
              Government
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="education"
                checked={formData.checkboxOptions.education}
                onChange={handleCheckboxChange}
              />
              Education
            </label>
            <label className="subscribe--checkbox-option">
              <input
                type="checkbox"
                name="selectAll"
                checked={formData.isCheckedAll}
                onChange={handleCheckboxChange}
              />
              All
            </label>
          </div>
        </div>
        <div className="subscribe--frequency-container">
          <label htmlFor="frequency" className="subscribe--frequency-label">
            Frequency:
          </label>
          <select
            value={formData.frequency}
            onChange={handleFrequencyChange}
            className="subscribe--frequency-option"
          >
            <option value="" defaultValue={""}>
              Select Frequency
            </option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="subscribe--email-container">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            className="subscribe--input-field"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Mobile Number"
            className="subscribe--input-field"
          />
          <button type="submit" className="subscribe--form-button">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscribePage;
