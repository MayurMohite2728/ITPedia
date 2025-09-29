export const getProductSummaryGoldenLibrary = async () => {
  // const API_BASE_URL = "http://localhost:8084/api/api/v1/reports/products";
  try {
    const response = await fetch(
      `/api/v1/reports/products/summary/library/details`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product summary status:", error);
    throw error;
  }
};

export const getProductSummaryStatus = async () => {
  try {
    const response = await fetch(`/api/v1/reports/products/summary/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product summary status:", error);
    throw error;
  }
};

export const getProductSummaryRiskCount = async () => {
  try {
    const response = await fetch(`/api/v1/reports/products/summary/risk`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product summary status:", error);
    throw error;
  }
};

export const getlifeCycle = async () => {
  try {
    const response = await fetch(`/api/v1/reports/products/summary/lifecycle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product summary status:", error);
    throw error;
  }
};

export const syncAllProduct = async () => {
  try {
    const response = await fetch(
      `https://localhost:8085/itportitepediaservice/api/api/v1/repo-itpedia/products/sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product summary status:", error);
    throw error;
  }
};
