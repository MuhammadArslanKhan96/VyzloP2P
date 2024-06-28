import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
interface CountryOption {
  label: string;
  value: string;
}
function CountrySelector({ countryMethod }: any) {
  const [value, setValue] = useState<CountryOption | null>(null);
  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        label: country.label,
        value: country.value,
      }));
  }, []);

  const changeHandler = (selectedOption: CountryOption | null) => {
    setValue(selectedOption);
    countryMethod(selectedOption);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
}

export default CountrySelector;
