import { axiosInstance, ID } from './axiosInstance.ts';

export interface IPortfolio {
  name: string;
  shortInfo: string;
  slogan: string;
  contacts: [
    {
      name: string;
      value: string;
    },
  ];
  credits: string[];
}

export interface IPresentation {
  id: number;
  link: string;
  title: string;
  event: string;
  presentationDate: string;
  description: string;
  portfolioId: number;
  image: string;
}

export interface IPublication {
  id: number;
  title: string;
  publisher: string;
  publicationDate: string;
  description: string;
  portfolioId: number;
}

export interface IWorkExperience {
  id: number;
  description: string;
  year: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  portfolioId: number;
}

export interface IConference {
  Date: string;
  name: string;
  image: string;
  id: number;
}

class Api {
  public async getPortfolio(id: ID): Promise<IPortfolio> {
    return (await axiosInstance.get<IPortfolio>(`${id}`)).data;
  }

  public async getPresentations(id: ID): Promise<IPresentation[]> {
    return (await axiosInstance.get<IPresentation[]>(`${id}/presentations`))
      .data;
  }

  public async getPublications(id: ID): Promise<IPublication[]> {
    return (await axiosInstance.get<IPublication[]>(`${id}/publications`)).data;
  }

  public async getWorkExp(id: ID): Promise<IWorkExperience[]> {
    return (await axiosInstance.get<IWorkExperience[]>(`${id}/workExperience`))
      .data;
  }

  public async getConferences(id: ID): Promise<IConference[]> {
    return (await axiosInstance.get<IConference[]>(`${id}/conferences`)).data;
  }
}

export const api = new Api();
