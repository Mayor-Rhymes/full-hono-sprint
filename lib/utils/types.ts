

export type User = {

    email: string;
    username: string;
    password: string;
}


export type UserExists = Partial<User>;

export type stockDataType = {
    "Tolerance": number;
    "Nigerian Stocks": number;
    "Foreign Stocks": number;
    "Tech Stocks": number;
    "Emerging Stocks": number;
    "Nigerian Bonds": number;
    "Foreign Bonds": number;
    "Commodities": number;
    "Real Estate": number;
    "T-Bills": number;
    "Alternative": number;
  };
  