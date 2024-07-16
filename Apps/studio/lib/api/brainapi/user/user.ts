import { AxiosInstance } from "axios";
import { UUID } from "crypto";

import { UserStats } from "types/braintypes/User";

export enum CompanySize {
  One = "1-10",
  Two = "10-25",
  Three = "25-50",
  Four = "50-100",
  Five = "100-500",
  Six = "500-1000",
  Seven = "1000-5000",
  Eight = "+5000",
}

export enum UsagePurpose {
  Business = "Business",
  NGO = "NGO",
  Personal = "Personal",
  Student = "Student",
  Teacher = "Teacher",
}

export type UserIdentityUpdatableProperties = {
  username: string;
  company?: string;
  onboarded: boolean;
  company_size?: CompanySize;
  usage_purpose?: UsagePurpose;
};

export type UserIdentity = {
  id: UUID;
  onboarded: boolean;
  username: string;
};

export const updateUserIdentity = async (
  userUpdatableProperties: UserIdentityUpdatableProperties,
  axiosInstance: AxiosInstance
): Promise<UserIdentity> =>
  axiosInstance.put(`/user/identity`, userUpdatableProperties);

export const getUserIdentity = async (
  axiosInstance: AxiosInstance
): Promise<UserIdentity> => {
  const { data } = await axiosInstance.get<UserIdentity>(`/user/identity`);

  return data;
};

export const getUser = async (
  axiosInstance: AxiosInstance
): Promise<UserStats> => (await axiosInstance.get<UserStats>("/user")).data;

export const deleteUserData = async (
  axiosInstance: AxiosInstance
): Promise<void> => {
  await axiosInstance.delete(`/user_data`);
};

export const getUserCredits = async (
  axiosInstance: AxiosInstance
): Promise<number> => (await axiosInstance.get<number>("/user/credits")).data;

// import { AxiosInstance } from "axios";
// import { v4 as uuidv4 } from 'uuid';

// import { UserStats } from "types/braintypes/User";

// export enum CompanySize {
//   One = "1-10",
//   Two = "10-25",
//   Three = "25-50",
//   Four = "50-100",
//   Five = "100-500",
//   Six = "500-1000",
//   Seven = "1000-5000",
//   Eight = "+5000",
// }

// export enum UsagePurpose {
//   Business = "Business",
//   NGO = "NGO",
//   Personal = "Personal",
//   Student = "Student",
//   Teacher = "Teacher",
// }

// export type UserIdentityUpdatableProperties = {
//   username: string;
//   company?: string;
//   onboarded: boolean;
//   company_size?: CompanySize;
//   usage_purpose?: UsagePurpose;
// };

// export type UserIdentity = {
//   id: UUID;
//   onboarded: boolean;
//   username: string;
// };

// // Default user for testing
// const defaultUser: UserIdentity = {
//   id: uuidv4(),
//   onboarded: true,
//   username: "default_user",
// };

// const defaultUserStats: UserStats = {
//   id: defaultUser.id,
//   username: defaultUser.username,
//   company: "Default Company",
//   company_size: CompanySize.One,
//   usage_purpose: UsagePurpose.Personal,
//   credits: 100,
//   // Add other properties from UserStats as needed
// };

// export const updateUserIdentity = async (
//   userUpdatableProperties: UserIdentityUpdatableProperties,
//   axiosInstance: AxiosInstance
// ): Promise<UserIdentity> => {
//   if (process.env.NODE_ENV === 'development') {
//     return { ...defaultUser, ...userUpdatableProperties };
//   }
//   return axiosInstance.put(`/user/identity`, userUpdatableProperties);
// };

// export const getUserIdentity = async (
//   axiosInstance: AxiosInstance
// ): Promise<UserIdentity> => {
//   if (process.env.NODE_ENV === 'development') {
//     return defaultUser;
//   }
//   const { data } = await axiosInstance.get<UserIdentity>(`/user/identity`);
//   return data;
// };

// export const getUser = async (
//   axiosInstance: AxiosInstance
// ): Promise<UserStats> => {
//   if (process.env.NODE_ENV === 'development') {
//     return defaultUserStats;
//   }
//   return (await axiosInstance.get<UserStats>("/user")).data;
// };

// export const deleteUserData = async (
//   axiosInstance: AxiosInstance
// ): Promise<void> => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log("Default user data deletion simulated.");
//     return;
//   }
//   await axiosInstance.delete(`/user_data`);
// };

// export const getUserCredits = async (
//   axiosInstance: AxiosInstance
// ): Promise<number> => {
//   if (process.env.NODE_ENV === 'development') {
//     return defaultUserStats.credits;
//   }
//   return (await axiosInstance.get<number>("/user/credits")).data;
// };
