export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7000" : "/api"

// export  const BASE_URL = "http://localhost:5000"

export const statesAndUTsEnum = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
];

export async function verifyAddress(address) {
    const { name, mobileNumber, pincode, line1, line2, landmark, city, state } = address;
    const mobileRegex = /^[6-9][0-9]{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    if (!name || name.length < 3) {
        throw new Error("Enter a valid name");
    }

    if (!mobileRegex.test(mobileNumber)) {
        throw new Error("Enter a valid number");
    }

    if (!pincodeRegex.test(pincode)) {
        throw new Error("Enter a valid pincode");
    }

    if (!statesAndUTsEnum.includes(state)) {
        throw new Error("Enter a valid Indian State");
    }

    if (!line1) {
        throw new Error("Line 1 (address) is required");
    }

    if (!line2) {
        throw new Error("Line 2 (address) is required");
    }

    if (!city) {
        throw new Error("City is required");
    }

    if (landmark && landmark.length < 3) {
        throw new Error("Landmark should be at least 3 characters long");
    }

}

export function formatDate(isoString) {
    const date = new Date(isoString);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}


