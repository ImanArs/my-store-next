export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates", error);
    return null;
  }
};
