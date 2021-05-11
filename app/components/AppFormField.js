import React from "react";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
function AppFormField(props) {
  return (
    <>
      <AppTextInput
        autoCapitalize="characters"
        autoComplete={false}
        icon="bank"
        placeholder="Stock Name"
        onChangeText={handleChange("stockName")}
        onBlur={() => setFieldTouched("stockName")}
      />
      <ErrorMessage visible={touched.stockName} error={errors.stockName} />
    </>
  );
}

export default AppFormField;
